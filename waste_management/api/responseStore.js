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
    if (response) {
      let resArr = response?.data.data.lists;
      let societyNameArr = [{ society_name: "select", key_person: "select" }];

      resArr.map((item) => {
        societyNameArr.push({ society_name: item.society_name, key_person: item.name_of_key_parson });
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
      let marketArr = [{ market_id: "", market_name: "Select" }];

      resArr2.map((item) => {
        marketArr.push({
          market_id: item.id,
          market_name: item.market,
        })
      });

      // localStorage.setItem("allMarkets", JSON.stringify(marketArr));//Production purpose
      return marketArr;

    } else {
      return ["No Data Found"];
    }
  } catch (error) {
    console.log(error);
  }
};


// Add New Market - Add
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


//Sansad Name read
const getSansad = async ({ token, commonObj, paramObj }) => {

  const body_name = formDataFunc(commonObj, paramObj);
  // console.log("Market Form Data", body_name);//testing
  try {

    const response_func = await sendRequest(
      "post",
      "add_your_url",// changes needed
      body_name, // changes needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log("Response for sansad lists", response_func);//testing

    // if (response_marketAdd !== undefined && response_marketAdd.data.status === "success") {
    //   swal("Success", "Added Successfully", "success");
    //   return response_marketAdd.data.status
    // }
    // console.log("Response for Add Market", response_marketAdd);//testing

  } catch (error) {
    console.log(error);
  }
};






//Dummy demo

const func_name = async ({ token, commonObj, paramObj }) => {

  const body_name = formDataFunc(commonObj, paramObj);
  // console.log("Market Form Data", body_name);//testing
  try {

    const response_func = await sendRequest(
      "post",
      "add_your_url",// changes needed
      body_name, // changes needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    // if (response_marketAdd !== undefined && response_marketAdd.data.status === "success") {
    //   swal("Success", "Added Successfully", "success");
    //   return response_marketAdd.data.status
    // }
    // console.log("Response for Add Market", response_marketAdd);//testing

  } catch (error) {
    console.log(error);
  }
};




export { societyList, multiStoriedAddNew, marketList, marketAdd, getSansad };
