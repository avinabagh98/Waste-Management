import swal from "sweetalert";
import { sendRequest } from "./sendRequest";



const formDataFunc = (commonObj, paramObj) => {
  const formData = { ...commonObj, ...paramObj };
  return formData;
};

//Society and Multi Storied - List
const societyList = async ({ token, natureOfHouse }) => {
  try {
    const response = await sendRequest(
      "post",
      "/household/society/list",
      {
        token: token,
        natureOfHouse: natureOfHouse,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    //Api Response
    if (response !== undefined && response?.data.data.lists?.length > 0) {
      let resArr = response?.data.data.lists;
      let societyNameArr = [];

      resArr.map((item) => {
        societyNameArr.push(item.society_name);
      });

      return societyNameArr;
    } else {
      return ["No Data Found"];
    }
  } catch (error) {
    console.log(error);
  }
};
//Multi Storied and Society - Add
const multiStoriedAddNew = async ({ token, commonObj, paramObj }) => {
  const formData = formDataFunc(commonObj, paramObj);
  try {
    console.log("Multi storied Form Data", formData);//testing
    const response_multistoried = await sendRequest(
      "post",
      "/household/society/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response for Add MultiStoried", response_multistoried);//testing

    if (response_multistoried !== undefined && response_multistoried.data.data.status === "success") {
      swal("Success", "Added Successfully", "success");
      return response_multistoried.data.data.status
    }

  } catch (error) {
    console.log(error);
  }
};


//Market List
const marketList = async ({ token }) => {
  try {
    const responseMarket = await sendRequest(
      "post",
      "/household/market/list",
      { token: token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (responseMarket !== undefined && responseMarket.data.data.lists?.length > 0) {
      let resArr2 = responseMarket?.data.data.lists;
      let marketNameArr = [];

      resArr2.map((item) => {
        marketNameArr.push(item.market);
      });

      return marketNameArr;
    } else {
      return ["No Data Found"];
    }
  } catch (error) {
    console.log(error);
  }
};


//Market Add
const marketAdd = async ({ token, commonObj, paramObj }) => {

  const formDataMarket = formDataFunc(commonObj, paramObj);
  console.log("Market Form Data", formDataMarket);//testing
  try {

    const response_marketAdd = await sendRequest(
      "post",
      "/household/market/add",
      formDataMarket,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response_marketAdd !== undefined && response_marketAdd.data.status === "success") {
      swal("Success", "Added Successfully", "success");
      return response_marketAdd.data.status
    }
    console.log("Response for Add Market", response_marketAdd);//testing

  } catch (error) {
    console.log(error);
  }
};

export { societyList, multiStoriedAddNew, marketList, marketAdd };
