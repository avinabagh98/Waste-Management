import swal from "sweetalert";
import { sendRequest } from "./sendRequest";

//Localstorage Fetching Section
const tokeN = localStorage.getItem("token");
const userRole = localStorage.getItem("role_name");
const supervisorId = localStorage.getItem("supervisor_id");
const userId = localStorage.getItem("user_id");
const gpId = localStorage.getItem("gp_id");
const blockId = localStorage.getItem("block_id");
const wardId = localStorage.getItem("ward_id");
const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");
const districtId = localStorage.getItem("district_id");
const today = localStorage.getItem("today");

//API Modular Functions

//Header for sendRequest Function
const sendHeader = {
  headers: {
    Authorization: `Bearer ${tokeN}`,
  },
};

const commonObj = {
  //common section
  token: tokeN,
  lat: lat,
  longi: long,
  block: blockId,
  gp: gpId,
  sansadNumber: "-1",
  locality: "-1",
  supervisor: supervisorId,
  fieldStaff: userId,
  entryDate: today,

};

const formDataFunc = (commonObj, paramObj) => {
  const formData = { ...commonObj, ...paramObj };
  return formData;
};

//Society and Multi Storied - List
const societyList = async ({ natureOfHouse }) => {
  try {
    const response = await sendRequest(
      "post",
      "/household/society/list",
      {
        token: tokeN,
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
const multiStoriedAddNew = async ({ paramObj }) => {
  const formData = formDataFunc(commonObj, paramObj);
  try {
    console.log("Multi storied Form Data", formData);//testing
    const response_multistoried = await sendRequest(
      "post",
      "/household/society/add",
      formData,
      sendHeader
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
const marketList = async () => {
  try {
    const responseMarket = await sendRequest(
      "post",
      "/household/market/list",
      { token: tokeN },
      sendHeader
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
const marketAdd = async ({ paramObj }) => {

  const formDataMarket = formDataFunc(commonObj, paramObj);
  console.log("Market Form Data", formDataMarket);//testing
  try {

    const response_marketAdd = await sendRequest(
      "post",
      "/household/market/add",
      formDataMarket,
      sendHeader
    )

    if (response_marketAdd !== undefined && response_marketAdd.data.data.status === "success") {
      swal("Success", "Added Successfully", "success");
      return response_marketAdd.data.data.status
    }
    console.log("Response for Add Market", response_marketAdd);//testing

  } catch (error) {
    console.log(error);
  }
};

export { societyList, multiStoriedAddNew, marketList, marketAdd };
