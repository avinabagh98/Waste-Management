"use client";

import styles from "./household.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";
import { sendRequest } from "@/api/sendRequest";
import axios from "axios";

export default function HouseholdAddpage() {

  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  //form-data states
  const [dateHHSurvey, setDateHHSurvey] = useState("");
  const [gp, setGp] = useState("");
  const [localityNameMohallaHHSurvey, setLocalityNameMohallaHHSurvey] =
    useState("");
  const [idType, setIdType] = useState("");
  const [houseNumberHHSurvey, setHouseNumberHHSurvey] = useState("");
  const [nameOfResidentHHSurvey, setNameOfResidentHHSurvey] = useState("");
  const [numberOfFamilyMembersHHSurvey, setNumberOfFamilyMembersHHSurvey] =
    useState("");
  const [
    numberOfChildBelow18YearsHHSurvey,
    setNumberOfChildBelow18YearsHHSurvey,
  ] = useState("");
  const [occupationHHSurvey, setOccupationHHSurvey] = useState("");
  const [ownershipOfHouseHHSurvey, setOwnershipOfHouseHHSurvey] = useState("1");
  const [typeOfSegregationHHSurvey, setTypeOfSegregationHHSurvey] =
    useState("");
  const [
    areYouDoingHomeCompostingHHSurvey,
    setAreYouDoingHomeCompostingHHSurvey,
  ] = useState("");
  const [
    doYouHaveToiletInYourHouseHHSurvey,
    setDoYouHaveToiletInYourHouseHHSurvey,
  ] = useState("");
  const [selectToiletTypeHHSurvey, setSelectToiletTypeHHSurvey] = useState("");
  const [doYouManagingGreyWaterHHSurvey, setDoYouManagingGreyWaterHHSurvey] =
    useState("");
  const [doYouManagingBlackWaterHHSurvey, setDoYouManagingBlackWaterHHSurvey] = useState("");
  const [
    areYouWillingToDoKitchenGardenInFutureHHSurvey,
    setAreYouWillingToDoKitchenGardenInFutureHHSurvey,
  ] = useState("");
  const [
    areYouWillingToConstructIndividualSoakPitInFutureHHSurvey,
    setAreYouWillingToConstructIndividualSoakPitInFutureHHSurvey,
  ] = useState("");
  const [
    userChargesInRupeesPerMonthHHSurvey,
    setUserChargesInRupeesPerMonthHHSurvey,
  ] = useState("");

  const [mobileNo, setMobileNo] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [roadLane, setRoadLane] = useState("");
  const [homeBaseManageRat, setHomeBaseManageRat] = useState("");
  const [WGUtype, setWGUtype] = useState("");
  const [pets, setPets] = useState("");
  const [patients, setPatients] = useState("");
  const [mohallaCommitte, setMohallaCommitte] = useState("");

  //Loading Header Data States
  const [name, setName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisor_id, setSupervisor_id] = useState("");
  const [user_id, setUser_id] = useState("");
  const [userName, setUserName] = useState("");
  const [wardName, setWardName] = useState("");
  const [ward_id, setWard_id] = useState("");

  const [mohalla, setMohalla] = useState("");
  const [mohallaId, setMohallaId] = useState("");
  const [mohallaName, setMohallaName] = useState([]);
  const [locality, setLocality] = useState([]);
  const [localName, setLocalName] = useState([]);
  const [localityId, setLocalityId] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [occupationName, setOccupationName] = useState([]);
  const [occupationId, setOccupationId] = useState([]);
  const [toilets, setToilets] = useState([]);
  const [toiletName, setToiletName] = useState([]);
  const [toiletId, setToiletId] = useState([]);
  const [today, setToday] = useState("");
  const [hasPets, setHasPets] = useState("");
  const [hasPatients, setHasPatients] = useState("");
  const [wasteGenerated, setWasteGenerated] = useState("");
  const [WillingToDoManage, setWillingToDoManage] = useState("");
  const [wantTOPay, setWantTOPay] = useState("");
  const [spinner, setSpinner] = useState(false);

  //Shop
  const [typeOfShop, setTypeOfShop] = useState("");
  const [sansadNo, setSansadNo] = useState("");
  const [mobileShop, setMobileShop] = useState("");
  const [bioWasteShop, setBioWasteShop] = useState("");
  const [nonBioWasteShop, setNonBioWasteShop] = useState("");
  const [dailyWasteManage, setDailyWasteManage] = useState("");
  const [willingToGiveWaste, setWillingToGiveWaste] = useState("");
  const [willingToPayGp, setWillingToPayGp] = useState("");

  //Market
  const [typeofMarket, settypeofMarket] = useState("");
  const [ismarketCommitteePresence, setIsmarketCommitteePresence] = useState("");
  const [numberOfshops, setNumberOfshops] = useState("");
  const [numberOfGroceries, setNumberOfGroceries] = useState("");
  const [numberOfFoodShops, setNumberOfFoodShops] = useState("");
  const [numberOfVegetables, setNumberOfVegetables] = useState("");
  const [numberOfResturants, setNumberOfResturants] = useState("");
  const [numberOfHotels, setNumberOfHotels] = useState("");
  const [numberOfMeatShop, setNumberOfMeatShop] = useState("");
  const [numberOfFishShops, setNumberOfFishShops] = useState("");
  const [numberOfOtherShops, setNumberOfOtherShops] = useState("");
  const [wasteGenMarket, setWasteGenMarket] = useState("");
  const [bioDegradableWasteMarket, setBioDegradableWasteMarket] = useState("");
  const [nonBioDegradableWasteMarket, setNonBioDegradableWasteMarket] = useState("");
  const [hazardousWasteMarket, setHazardousWasteMarket] = useState("");
  const [dailyWasteManageMarket, setDailyWasteManageMarket] = useState("");
  const [willingToGiveWasteMarket, setWillingToGiveWasteMarket] = useState("");
  const [willingToPayGpMarket, setWillingToPayGpMarket] = useState("");


  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: gp,
    block_name: block_name,
  };

  const dropDownBody = {
    token: token,
    wardId: ward_id,
  };

  const dropDownBody1 = {
    token: token,
  };

  const formDataHH = {
    token: token,
    lat: lat,
    longi: long,
    date: dateHHSurvey,
    supervisor: supervisor_id,
    numberOfChildBelow18Years: numberOfChildBelow18YearsHHSurvey,
    ownershipOfHouse: ownershipOfHouseHHSurvey,
    typeOfToilet: toiletId,
    userChargeParMonth: userChargesInRupeesPerMonthHHSurvey,
    wardNo: ward_id,
    locality: localityId,
    addaharNo: idCardNumber,
    familyMembers: numberOfFamilyMembersHHSurvey,
    houseHoldName: nameOfResidentHHSurvey,
    mobileNo: mobileNo,
    ocupation: occupationId,
    ownerType: ownershipOfHouseHHSurvey,
    holdingNumber: houseNumberHHSurvey,
    roadLane: roadLane,
    homeBaseManageRat: homeBaseManageRat,
    road: roadLane,
    typeOfWGU: WGUtype === "household" ? "1" : WGUtype === "shop" ? "2" : WGUtype === "market" ? "3" : WGUtype === "institution" ? "4" : "9999",
    pets: pets,
    patients: patients,
    toiletInHouse: doYouHaveToiletInYourHouseHHSurvey,
    typeOfSegragation: typeOfSegregationHHSurvey,
    fieldStaff: user_id,
    mohallaCommitte: mohallaId,
    nameOfResident: nameOfResidentHHSurvey,
    isComposed: areYouDoingHomeCompostingHHSurvey,
    isManageGrayWater: doYouManagingGreyWaterHHSurvey,
    isKitchenGarden: areYouWillingToDoKitchenGardenInFutureHHSurvey,
    isConstructIndividual:
      areYouWillingToConstructIndividualSoakPitInFutureHHSurvey,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    localStorage.setItem("previousPath", "/home/household-list");
    setToday(localStorage.getItem("today"));
    setDateHHSurvey(localStorage.getItem("today"));
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          setToken(token);
          setUserRole(localStorage.getItem("role_name"));

          //loadingHeaderData from local storage
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setSupervisorName(localStorage.getItem("supervisor"));
          setSupervisor_id(localStorage.getItem("supervisor_id"));
          setUserName(localStorage.getItem("name"));
          setUser_id(localStorage.getItem("user_id"));
          setWardName(localStorage.getItem("ward"));
          setWard_id(localStorage.getItem("ward_id"));
          setGp(localStorage.getItem("gp"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  // Location Fetching
  useEffect(() => {
    const geolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(String(position.coords.latitude));
          setLong(String(position.coords.longitude));
        });
      } else {
        alert("Geolocation not available");
      }
    };

    geolocation();
  }, []);

  // Dropdown-Options List API Calling
  useEffect(() => {
    try {
      async function fetchMohalla() {
        const response = await sendRequest(
          "post",
          `/mohollacommittee/List`,
          dropDownBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            `Mohalla lists in ward ${ward_id} from API ::`,
            response.data.data.lists
          );
          setMohalla(response.data.data.lists);
        }
      }

      async function fetchLocality() {
        const response = await sendRequest(
          "post",
          `/localitylist/List`,
          dropDownBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            `Locality lists in ward ${ward_id} from API ::`,
            response.data.data.incomeList
          );
          setLocality(response.data.data.incomeList);
        }
      }
      async function fetchOccupation() {
        const response = await sendRequest(
          "post",
          `/ocupation`,
          dropDownBody1,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            "Occpation API Response::",
            response.data.data.occupations
          );
          setOccupations(response.data.data.ocupation);
        }
      }

      async function fetchToilet() {
        const response = await sendRequest(
          "post",
          `/toiletTypename`,
          dropDownBody1,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            "Toilet API Response::",
            response.data.data.toilet_type_name
          );
          setToilets(response.data.data.toilet_type_name);
        }
      }

      fetchToilet();
      fetchMohalla();
      fetchLocality();
      fetchOccupation();
    } catch (error) {
      console.log("Error at dropdown fetching:", error);
    }
  }, [token]);

  // Dropdown-Options State Update
  useEffect(() => {
    if (occupations.length > 0) {
      const occupation_name = occupations.map(
        (occupation) => occupation.ocupationname
      );
      setOccupationName(occupation_name);
      setOccupationId(occupations[0]?.id);
    }

    if (toilets.length > 0) {
      const toilet_name = toilets.map((toilet) => toilet.toiletTypename);
      setToiletName(toilet_name);
      setToiletId(toilets[0].id);
    }

    if (mohalla.length > 0) {
      const mohallaNames = mohalla.map((mohalla) => mohalla.committee_name);
      setMohallaName(mohallaNames);
      setMohallaId(mohalla[0].id);
    }

    if (locality.length > 0) {
      const localityaNames = locality.map((locality) => locality.village_name);
      setLocalName(localityaNames);
      setLocalityId(locality[0].id);
    }
  }, [occupations, toilets, mohalla, locality]);

  // Handler Functions
  const handleVal = (id, val) => {

    //Household
    if (id === "WillingToDoManage") {
      val === "yes" ? setWillingToDoManage("1") : setWillingToDoManage("0");
    }
    if (id === "dateHHSurvey") {
      setDateHHSurvey(val);
    }

    if (id === "localityNameMohallaHHSurvey") {
      let LVal = locality.filter((item) => item.village_name === val);
      let local_Selected = LVal[0].id;
      setLocalityId(local_Selected);
      setLocalityNameMohallaHHSurvey(val);
    }

    if (id === "houseNumberHHSurvey") {
      setHouseNumberHHSurvey(val);
    }

    if (id === "nameOfResidentHHSurvey") {
      setNameOfResidentHHSurvey(val);
    }

    if (id === "numberOfFamilyMembersHHSurvey") {
      setNumberOfFamilyMembersHHSurvey(val);
    }

    if (id === "numberOfChildBelow18YearsHHSurvey") {
      setNumberOfChildBelow18YearsHHSurvey(val);
    }

    if (id === "hasPets") {
      if (val === "yes") {
        setHasPets("1");
      }
      if (val === "no") {
        setHasPets("0");
      }
    }

    if (id === "hasPatient") {
      if (val === "yes") {
        setHasPatients("1");
      }
      if (val === "no") {
        setHasPatients("0");
      }
    }
    if (id === "occupationHHSurvey") {
      let oVal = occupations.filter((item) => item.ocupationname === val);
      let occupationId_Selected = oVal[0].id;
      setOccupationId(occupationId_Selected);
      setOccupationHHSurvey(val);
    }

    if (id === "selectToiletTypeHHSurvey") {
      let toiletVal = toilets.filter((item) => item.toiletTypename === val);
      let toilet_Selected = toiletVal[0].id;
      setToiletId(toilet_Selected);
      setSelectToiletTypeHHSurvey(val);
    }

    if (id === "userChargesInRupeesPerMonthHHSurvey") {
      setUserChargesInRupeesPerMonthHHSurvey(val);
    }

    if (id === "mobileNumberHHSurvey") {
      setMobileNo(val);
    }

    if (id === "identificationNumberHHSurvey") {
      setIdCardNumber(val);
    }

    if (id === "idTypeHHSurvey") {
      setIdType(val);
    }

    if (id === "roadLane") {
      setRoadLane(val);
    }

    if (id === "homebasemanageRat") {
      setHomeBaseManageRat(val);
    }

    if (id === "wgutype") {
      setWGUtype(val);
    }

    if (id === "pets") {
      setPets(val);
    }

    if (id === "patients") {
      setPatients(val);
    }

    if (id === "mohallaCommitte") {
      let mhVal = mohalla.filter((item) => item.committee_name === val);
      let mohallaId_Selected = mhVal[0].id;
      setMohallaId(mohallaId_Selected);
      setMohallaCommitte(val);
    }

    if (id === "ownershipOfHouseHHSurvey") {
      val === "Own" ? setOwnershipOfHouseHHSurvey("1") : setOwnershipOfHouseHHSurvey("0");

    }

    //Shop

    if (id === "typeOfShop") {
      val === "Grocery" ? setTypeOfShop("1") : val === "Food" ? setTypeOfShop("2") : val === "Vegetables" ? setTypeOfShop("3") : val === "Resturant" ? setTypeOfShop("4") : val === "Fish" ? setTypeOfShop("5") : val === "Meat" ? setTypeOfShop("6") : ""
    }

    if (id === "sansadNoShop") {
      val === "Itahar Sansad" ? setSansadNo("1") : val === "Raj Sansad" ? setSansadNo("2") : ""
    }

    if (id === "dailyWasteManage") {
      val === "Dumping" ? setDailyWasteManage("1") : val === "Throwing" ? setDailyWasteManage("2") : val === "Burned" ? setDailyWasteManage("3") : ""
    }


    if (id === "willingToGiveWasteGp") {
      if (val === "Yes") {
        setWillingToGiveWaste("1");
      }
      if (val === "No") {
        setWillingToGiveWaste("0");
      }
    }

    if (id === "willingToPayGp") {
      if (val === "Yes") {
        setWillingToPayGp("1");
      }
      if (val === "No") {
        setWillingToPayGp("0");
      }
    }


    //Market

    if (id === "typeofMarket") {
      val === "Hat" ? settypeofMarket("1") : val === "Market" ? settypeofMarket("2") : val === "MultiComplex" ? settypeofMarket("3") : val === "Others" ? settypeofMarket("4") : ""
    }

    if (id === "sansadNoShop") {
      val === "Itahar Sansad" ? setSansadNo("1") : val === "Raj Sansad" ? setSansadNo("2") : ""
    }

    if (id === "marketCommitteePresence") {

      val === "Yes" ? setIsmarketCommitteePresence("1") : val === "No" ? setIsmarketCommitteePresence("0") : ""
    }

    if (id === "dailyWasteManageMarket") {
      val === "Dumping" ? setDailyWasteManageMarket("1") : val === "Throwing" ? setDailyWasteManageMarket("2") : val === "Burned" ? setDailyWasteManageMarket("3") : ""
    }

    if (id === "willingToGiveWasteMarket") {
      if (val === "Yes") {
        setWillingToGiveWasteMarket("1");
      }
      if (val === "No") {
        setWillingToGiveWasteMarket("0");
      }
    }

    if (id === "willingToPayGpMarket") {
      if (val === "Yes") {
        setWillingToPayGpMarket("1");
      }
      if (val === "No") {
        setWillingToPayGpMarket("0");
      }
    }







  };












  const handleRadioChange = (name, value) => {

    if (name === "typeOfSegregationHHSurvey") {
      setTypeOfSegregationHHSurvey(value);
    }
    if (name === "areYouDoingHomeCompostingHHSurvey") {
      setAreYouDoingHomeCompostingHHSurvey(value);
    }
    if (name === "doYouHaveToiletInYourHouseHHSurvey") {
      setDoYouHaveToiletInYourHouseHHSurvey(value);
    }
    if (name === "doYouManagingGreyWaterHHSurvey") {
      setDoYouManagingGreyWaterHHSurvey(value);
    }

    if (name === "doYouManagingBlackWaterHHSurvey") {
      setDoYouManagingBlackWaterHHSurvey(value);
    }
    if (name === "areYouWillingToDoKitchenGardenInFutureHHSurvey") {
      setAreYouWillingToDoKitchenGardenInFutureHHSurvey(value);
    }
    if (name === "areYouWillingToConstructIndividualSoakPitInFutureHHSurvey") {
      setAreYouWillingToConstructIndividualSoakPitInFutureHHSurvey(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("HouseHold Survey Form Submitted :: ", formDataHH);

    try {
      let flag = false;
      e.preventDefault();
      for (const field in formDataHH) {
        if (formDataHH[field] === null || formDataHH[field] === "") {
          flag = true;
          break;
        }
      }
      if (flag) {
        swal("Error", "Please fill all the fields", "error");
      } else {
        setSpinner(true);
        const household_add_res = await axios.post(
          "https://waste.ebluesys.com/api/household/Insert",
          formDataHH
        );

        // if (household_add_res.status === 1) {
        //   swal("Success", "Submitted Successfully", "success");
        //   console.log("Household Survey Response", household_add_res);
        //   route.push("/home/household-list");
        // }

        if (household_add_res.data.data.status === "success") {
          swal("Success", "Household Added Successfully", "success");
          console.log("Household Survey Response", household_add_res);
          route.push("/home/household-list");
        }
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
      if (error.name === "AxiosError") {
        swal("Error", error.response.data.data.msg, "error");
      }
    }
  };


  const dummySubmit = (e) => {
    e.preventDefault();
    route.push("/home/household-list");
  };


  return (
    <>
      {spinner ? (
        <>
          <div className={styles.spinnerContainer}>
            <img src="/svg/loader.svg" alt="loader"></img>
          </div>
        </>
      ) : null}

      {/* //form content */}
      <Header
        userRole={userRole}
        isOffCanvasVisible={false}
        loadingdata={loadingHeaderData}
      />

      <div className={styles.container}>
        {/* //breadcrumb */}
        <div className={styles.breadcrumb}>
          <Textparser text={"Household Survey Add"} />
        </div>
        {/* //form container */}
        <div className={styles.formcontainer}>
          <div className={styles.quescontainer}>
            <Surveyques
              id={"dateHHSurvey"}
              type={"date"}
              labelText={translate?.Date_HH_survey}
              value={dateHHSurvey}
              defaultValue={today}
              required={true}
              handleVal={(id, val) => handleVal(id, val)}
            />

            <SurveyDropdown
              id={"wgutype"}
              labelText={translate?.WguType_HH_survey}
              value={WGUtype}
              required={true}
              handleVal={(id, val) => handleVal(id, val)}
              options={["select", "household", "instituion", "market", "shop"]}
            />
          </div>

          {/* //Type of WGU */}

          {WGUtype === "household" ? (
            <>

              {/* //Personal Information */}
              <div className={styles.personalInfoContainer}>
                <div className={styles.personalInfoHeading}>
                  <Textparser text={"Personal Information"} />
                </div>
                <Surveyques
                  id={"mobileNumberHHSurvey"}
                  type={"number"}
                  labelText={"Mobile Number"}
                  value={mobileNo}
                  handleVal={(id, val) => handleVal(id, val)}
                />

                <SurveyDropdown
                  id={"idTypeHHSurvey"}
                  labelText={translate?.IdType_HH_survey}
                  value={idType}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={[
                    "select",
                    "aadhaar",
                    "pan",
                    "voter",
                    "driving license",
                  ]}
                />
                {idType !== "" && idType !== "select" ? (
                  <Surveyques
                    id={"identificationNumberHHSurvey"}
                    type={"number"}
                    labelText={"Identification Number"}
                    value={idCardNumber}
                    handleVal={(id, val) => handleVal(id, val)}
                    required={true}
                  />
                ) : null}

                <SurveyDropdown
                  id={"occupationHHSurvey"}
                  labelText={translate?.Occupation_HH_survey}
                  value={occupationHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={occupationName}
                />

                <SurveyDropdown
                  id={"localityNameMohallaHHSurvey"}
                  labelText={translate?.Locality_Name_Mohalla_HH_survey}
                  value={localityNameMohallaHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={localName}
                />
              </div>


              {/* //Household Information */}
              <div className={styles.householdInfoContainer}>

                <div className={styles.householdInfoHeading}>
                  <Textparser text={"Household Information"} />
                </div>


                <SurveyDropdown
                  id={"ownershipOfHouseHHSurvey"}
                  labelText={translate?.Ownership_of_House_HH_survey}
                  value={ownershipOfHouseHHSurvey === "1" ? "Own" : "Rent"}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Own", "Rent"]}
                />


                <Surveyques
                  id={"houseNumberHHSurvey"}
                  labelText={translate?.House_Number_HH_survey}
                  value={houseNumberHHSurvey}
                  handleVal={(id, val) => handleVal(id, val)}
                />

                <Surveyques
                  id={"nameOfResidentHHSurvey"}
                  labelText={translate?.Name_of_Resident_HH_survey}
                  value={nameOfResidentHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                />


                <Surveyques
                  id={"numberOfFamilyMembersHHSurvey"}
                  labelText={translate?.Number_of_Family_Members_HH_survey}
                  value={numberOfFamilyMembersHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />

                <Surveyques
                  id={"numberOfChildBelow18YearsHHSurvey"}
                  labelText={translate?.No_of_Child_below_18_years_HH_survey}
                  value={numberOfChildBelow18YearsHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />

                <Surveyques
                  id={"roadLane"}
                  labelText={"Address Line 1"}
                  value={roadLane}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"text"}
                />

                <Surveyques
                  id={"roadLane"}
                  labelText={"Address Line 2"}
                  value={roadLane}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"text"}
                />


                <SurveyDropdown
                  id={"hasPets"}
                  labelText={"Has any pets?"}
                  value={
                    hasPets === "0" ? "no" : hasPets === "1" ? "yes" : "select"
                  }
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["select", "yes", "no"]}
                />
                {hasPets === "1" ? (
                  <Surveyques
                    id={"pets"}
                    labelText={"How many pets?"}
                    value={pets}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />
                ) : null}

                <SurveyDropdown
                  id={"hasPatient"}
                  labelText={"Has patient?"}
                  value={
                    hasPatients === "0"
                      ? "no"
                      : hasPatients === "1"
                        ? "yes"
                        : "select"
                  }
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["select", "yes", "no"]}
                />
                {hasPatients === "1" ? (
                  <Surveyques
                    id={"patients"}
                    labelText={" How Many patients?"}
                    value={patients}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />
                ) : null}

              </div>


              {/* //Waste Information */}
              <div className={styles.wasteInfoContainer}>
                <div className={styles.wasteInfoHeading}>
                  <Textparser text={"Generated Waste Information"} />
                </div>

                <Surveyques
                  id={"wasteGenerated"}
                  labelText={translate?.Waste_gen_amt_HH_survey}
                  value={wasteGenerated}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />

                <SurveyDropdown
                  id={"WillingToDoManage"}
                  labelText={translate?.Willing_to_do_manage_HH_survey}
                  value={WillingToDoManage === "1" ? "yes" : WillingToDoManage === "0" ? "no" : "-1"}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["select", "yes", "no"]}
                />

                {WillingToDoManage === "1" ?
                  <>
                    {/* //typeOfSegragation */}
                    <div className={styles.radioInput}>
                      <Textparser text={translate?.Type_of_Segregation_HH_survey} />
                      <div className={styles.radioInput_Options}>
                        <span>
                          <input
                            type="radio"
                            id="typeOfSegregationHHSurvey_fully"
                            name="typeOfSegregationHHSurvey"
                            value="2"
                            checked={typeOfSegregationHHSurvey === "2"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="typeOfSegregationHHSurvey_fully">
                            Fully
                          </label>
                        </span>
                        <span>
                          <input
                            type="radio"
                            id="typeOfSegregationHHSurvey_partial"
                            name="typeOfSegregationHHSurvey"
                            value="1"
                            checked={typeOfSegregationHHSurvey === "1"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="typeOfSegregationHHSurvey_partial">
                            Partial
                          </label>
                        </span>

                        <span>
                          <input
                            type="radio"
                            id="typeOfSegregationHHSurvey_no"
                            name="typeOfSegregationHHSurvey"
                            value="0"
                            checked={typeOfSegregationHHSurvey === "0"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="typeOfSegregationHHSurvey_no">No</label>
                        </span>
                      </div>
                    </div>

                    {/* //DoingHomeComposting */}
                    <div className={styles.radioInput}>
                      <Textparser
                        text={translate?.Are_You_Doing_Home_Composting_HH_survey}
                      />
                      <div className={styles.radioInput_Options}>
                        <span>
                          <input
                            type="radio"
                            id="areYouDoingHomeCompostingHHSurvey_yes"
                            name="areYouDoingHomeCompostingHHSurvey"
                            value="1"
                            checked={areYouDoingHomeCompostingHHSurvey === "1"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="areYouDoingHomeCompostingHHSurvey_yes">
                            Yes
                          </label>
                        </span>
                        <span>
                          <input
                            type="radio"
                            id="areYouDoingHomeCompostingHHSurvey_no"
                            name="areYouDoingHomeCompostingHHSurvey"
                            value="0"
                            checked={areYouDoingHomeCompostingHHSurvey === "0"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="areYouDoingHomeCompostingHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>



                    {/* //Greywater */}

                    <div className={styles.radioInput}>
                      <Textparser
                        text={translate?.Do_you_managing_Grey_Water_HH_survey}
                      />
                      <div className={styles.radioInput_Options}>
                        <span>
                          <input
                            type="radio"
                            id="doYouManagingGreyWaterHHSurvey_yes"
                            name="doYouManagingGreyWaterHHSurvey"
                            value="1"
                            checked={doYouManagingGreyWaterHHSurvey === "1"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="doYouManagingGreyWaterHHSurvey_yes">
                            Yes
                          </label>
                        </span>
                        <span>
                          <input
                            type="radio"
                            id="doYouManagingGreyWaterHHSurvey_no"
                            name="doYouManagingGreyWaterHHSurvey"
                            value="0"
                            checked={doYouManagingGreyWaterHHSurvey === "0"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="doYouManagingGreyWaterHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>

                    {/* //Blackwater */}
                    <div className={styles.radioInput}>
                      <Textparser
                        text={translate?.Do_you_managing_Black_Water_HH_survey}
                      />
                      <div className={styles.radioInput_Options}>
                        <span>
                          <input
                            type="radio"
                            id="doYouManagingBlackWaterHHSurvey_yes"
                            name="doYouManagingBlackWaterHHSurvey"
                            value="1"
                            checked={doYouManagingBlackWaterHHSurvey === "1"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="doYouManagingBlackWaterHHSurvey_yes">
                            Yes
                          </label>
                        </span>
                        <span>
                          <input
                            type="radio"
                            id="doYouManagingBlackWaterHHSurvey_no"
                            name="doYouManagingBlackWaterHHSurvey"
                            value="0"
                            checked={doYouManagingBlackWaterHHSurvey === "0"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="doYouManagingBlackWaterHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>



                  </>
                  : WillingToDoManage === "0" ?
                    <>
                      <SurveyDropdown
                        id={"wantTOPay"}
                        labelText={"Will Want to Pay"}
                        value={wantTOPay}
                        onChange={(e) => setWantTOPay(e.target.value)}
                        options={["Yes", "No"]}
                      />

                      <Surveyques
                        id={"userChargesInRupeesPerMonthHHSurvey"}
                        labelText={translate?.User_charges_HH_survey}
                        value={userChargesInRupeesPerMonthHHSurvey}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"number"}
                      />
                    </> : <></>}

              </div>


              {/* //Toilet Information */}

              <div className={styles.toiletInfoContainer}>
                <div className={styles.toiletInfoHeading}>
                  <Textparser text={"Other Information"} />
                </div>

                {/* //Are you willing to do kitchen garden in future */}
                <div className={styles.radioInput}>
                  <Textparser
                    text={
                      translate?.Are_you_willing_to_do_kitchen_garden_in_future_HH_survey
                    }
                  />
                  <div className={styles.radioInput_Options}>
                    <span>
                      <input
                        type="radio"
                        id="areYouWillingToDoKitchenGardenInFutureHHSurvey_yes"
                        name="areYouWillingToDoKitchenGardenInFutureHHSurvey"
                        value="1"
                        checked={
                          areYouWillingToDoKitchenGardenInFutureHHSurvey === "1"
                        }
                        onChange={(e) => {
                          handleRadioChange(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor="areYouWillingToDoKitchenGardenInFutureHHSurvey_yes">
                        Yes
                      </label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        id="areYouWillingToDoKitchenGardenInFutureHHSurvey_no"
                        name="areYouWillingToDoKitchenGardenInFutureHHSurvey"
                        value="0"
                        checked={
                          areYouWillingToDoKitchenGardenInFutureHHSurvey === "0"
                        }
                        onChange={(e) => {
                          handleRadioChange(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor="areYouWillingToDoKitchenGardenInFutureHHSurvey_no">
                        No
                      </label>
                    </span>
                  </div>
                </div>

                {/* //Are you willing to construct individual soak pit in future */}
                <div className={styles.radioInput}>
                  <Textparser
                    text={
                      translate?.Are_you_willing_to_construct_individual_soak_pit_in_future_HH_survey
                    }
                  />
                  <div className={styles.radioInput_Options}>
                    <span>
                      <input
                        type="radio"
                        id="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey_yes"
                        name="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey"
                        value="1"
                        checked={
                          areYouWillingToConstructIndividualSoakPitInFutureHHSurvey ===
                          "1"
                        }
                        onChange={(e) => {
                          handleRadioChange(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey_yes">
                        Yes
                      </label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        id="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey_no"
                        name="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey"
                        value="0"
                        checked={
                          areYouWillingToConstructIndividualSoakPitInFutureHHSurvey ===
                          "0"
                        }
                        onChange={(e) => {
                          handleRadioChange(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey_no">
                        No
                      </label>
                    </span>
                  </div>
                </div>

                {/* //Have toilet */}
                <div className={styles.radioInput}>
                  <Textparser
                    text={translate?.Do_You_have_Toilet_in_Your_House_HH_survey}
                  />
                  <div className={styles.radioInput_Options}>
                    <span>
                      <input
                        type="radio"
                        id="doYouHaveToiletInYourHouseHHSurvey_yes"
                        name="doYouHaveToiletInYourHouseHHSurvey"
                        value="1"
                        checked={doYouHaveToiletInYourHouseHHSurvey === "1"}
                        onChange={(e) => {
                          handleRadioChange(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor="doYouHaveToiletInYourHouseHHSurvey_yes">
                        Yes
                      </label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        id="doYouHaveToiletInYourHouseHHSurvey_no"
                        name="doYouHaveToiletInYourHouseHHSurvey"
                        value="0"
                        checked={doYouHaveToiletInYourHouseHHSurvey === "0"}
                        onChange={(e) => {
                          handleRadioChange(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor="doYouHaveToiletInYourHouseHHSurvey_no">
                        No
                      </label>
                    </span>
                  </div>
                </div>

                {/* //toilet type */}

                {doYouHaveToiletInYourHouseHHSurvey === "1" ?
                  <SurveyDropdown
                    id={"selectToiletTypeHHSurvey"}
                    labelText={translate?.Select_Toilet_Type_HH_survey}
                    value={selectToiletTypeHHSurvey}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={toiletName}
                  />
                  : <></>}

              </div>



            </>
          ) : (
            WGUtype === "shop" ?
              <div className={styles.shopInfoContainer}>
                <div className={styles.shopInfoHeading}>
                  <Textparser text={"Shop Information"} />
                </div>

                <SurveyDropdown
                  id={"typeOfShop"}
                  labelText={translate?.Type_of_shop_HH_survey}
                  value={typeOfShop === '1' ? "Grocery" : typeOfShop === '2' ? "Food" : typeOfShop === '3' ? "Vegetables" : typeOfShop === '4' ? "Resturant" : typeOfShop === '5' ? "Fish" : typeOfShop === '6' ? "Meat" : ""}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Select", "Grocery", "Food", "Vegetables", "Resturant", "Fish", "Meat"]}
                />

                <SurveyDropdown
                  id={"sansadNoShop"}
                  labelText={translate?.SansadNo_HH_survey}
                  value={sansadNo === "1" ? "Itahar Sansad" : sansadNo === "2" ? "Raj Sansad" : ""}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Select", "Itahar Sansad", "Raj Sansad"]}
                />

                <Surveyques
                  id={"contactShop"}
                  labelText={translate?.mobile_Shop_HH_survey}
                  value={mobileShop}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />

                <Surveyques
                  id={"bioDegradableWasteShop"}
                  labelText={translate?.bioWaste_Shop_HH_survey}
                  value={bioWasteShop}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />

                <Surveyques
                  id={"nonBioDegradableWasteShop"}
                  labelText={translate?.nonBiowaste_Shop_HH_survey}
                  value={nonBioWasteShop}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />


                <SurveyDropdown
                  id={"dailyWasteManage"}
                  labelText={translate?.dailyWasteManage_Shop_HH_survey}
                  value={dailyWasteManage === "1" ? "Dumping" : dailyWasteManage === "2" ? "Throwing" : dailyWasteManage === "3" ? "Burned" : ""}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Select", "Dumping", "Throwing", "Burned"]}

                />

                <SurveyDropdown
                  id={"willingToGiveWasteGp"}
                  labelText={translate?.willingToGiveWaste_Shop_HH_survey}
                  value={willingToGiveWaste === "1" ? "Yes" : willingToGiveWaste === "0" ? "No" : ""}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Select", "Yes", "No"]}

                />

                <SurveyDropdown
                  id={"willingToPayGp"}
                  labelText={translate?.willingToPayGp_Shop_HH_survey}
                  value={willingToPayGp === "1" ? "Yes" : willingToPayGp === "0" ? "No" : ""}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Select", "Yes", "No"]}

                />



              </div>

              : WGUtype === "market" ?

                <div className={styles.marketInfoContainer}>
                  <div className={styles.marketInfoHeading}>
                    <Textparser text={"Market Information"} />
                  </div>

                  <SurveyDropdown
                    id={"typeofMarket"}
                    labelText={translate?.Type_of_market_HH_survey}
                    value={typeofMarket === '1' ? "Hat" : typeofMarket === '2' ? "Market" : typeofMarket === '3' ? "MultiComplex" : typeofMarket === '4' ? "Others" : ""}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={["Select", "Hat", "Market", "MultiComplex", "Others"]}
                  />


                  <SurveyDropdown
                    id={"sansadNoShop"}
                    labelText={translate?.SansadNo_HH_survey}
                    value={sansadNo === "1" ? "Itahar Sansad" : sansadNo === "2" ? "Raj Sansad" : ""}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={["Select", "Itahar Sansad", "Raj Sansad"]}
                  />

                  <SurveyDropdown
                    id={"marketCommitteePresence"}
                    labelText={translate?.MarketCommitee_HH_survey}
                    value={ismarketCommitteePresence === "1" ? "Yes" : ismarketCommitteePresence === "0" ? "No" : ""}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={["Select", "Yes", "No"]}
                  />

                  <Surveyques
                    id={"numberOfshops"}
                    labelText={translate?.TotalShop_Market_HH_survey}
                    value={numberOfshops}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"numberOfGroceries"}
                    labelText={translate?.TotalGrocery_Market_HH_survey}
                    value={numberOfGroceries}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"numberOfFoodShops"}
                    labelText={translate?.TotalFood_Market_HH_survey}
                    value={numberOfFoodShops}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"numberOfVegetables"}
                    labelText={translate?.TotalVegetable_Market_HH_survey}
                    value={numberOfVegetables}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />


                  <Surveyques
                    id={"numberOfResturants"}
                    labelText={translate?.TotalResturant_Market_HH_survey}
                    value={numberOfResturants}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />


                  <Surveyques
                    id={"numberOfHotels"}
                    labelText={translate?.TotalHotels_Market_HH_survey}
                    value={numberOfHotels}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />


                  <Surveyques
                    id={"numberOfMeatShop"}
                    labelText={translate?.TotalMeatShop_Market_HH_survey}
                    value={numberOfMeatShop}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"numberOfFishShops"}
                    labelText={translate?.TotalFishShops_Market_HH_survey}
                    value={numberOfFishShops}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"numberOfOtherShops"}
                    labelText={translate?.TotalOther_Market_HH_survey}
                    value={numberOfOtherShops}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />


                  <Surveyques
                    id={"wasteGenMarket"}
                    labelText={translate?.TotalWasteGeneration_Market_HH_survey}
                    value={wasteGenMarket}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />



                  <Surveyques
                    id={"bioDegradableWasteMarket"}
                    labelText={translate?.TotalBioDegradableWaste_Market_HH_survey}
                    value={bioDegradableWasteMarket}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"nonBioDegradableWasteMarket"}
                    labelText={translate?.TotalNonBioDegradableWaste_Market_HH_survey}
                    value={nonBioDegradableWasteMarket}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />

                  <Surveyques
                    id={"hazardousWasteMarket"}
                    labelText={translate?.TotalHazardousWaste_Market_HH_survey}
                    value={hazardousWasteMarket}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    type={"number"}
                  />



                  <SurveyDropdown
                    id={"dailyWasteManageMarket"}
                    labelText={translate?.WasteMangement_Market_HH_survey}
                    value={dailyWasteManageMarket === "1" ? "Dumping" : dailyWasteManageMarket === "2" ? "Throwing" : dailyWasteManageMarket === "3" ? "Burned" : ""}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={["Select", "Dumping", "Throwing", "Burned"]}
                  />



                  <SurveyDropdown
                    id={"willingToGiveWasteMarket"}
                    labelText={translate?.willingToGiveWaste_Market_HH_survey}
                    value={willingToGiveWasteMarket === "1" ? "Yes" : willingToGiveWasteMarket === "0" ? "No" : ""}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={["Select", "Yes", "No"]}

                  />


                  <SurveyDropdown
                    id={"willingToPayGpMarket"}
                    labelText={translate?.willingToPayGp_Market_HH_survey}
                    value={willingToPayGpMarket === "1" ? "Yes" : willingToPayGpMarket === "0" ? "No" : ""}
                    // required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={["Select", "Yes", "No"]}

                  />



                </div>

                :
                <></>
          )}

          <div className={styles.btnContainer}>
            <button className={styles.submitbtn} onClick={dummySubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
