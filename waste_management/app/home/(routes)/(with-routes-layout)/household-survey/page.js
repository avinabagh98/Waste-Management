"use client";

import styles from ".//household.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";

export default function Householdpage() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  //form-data states
  const [dateHHSurvey, setDateHHSurvey] = useState("");
  const [supervisorHHSurvey, setSupervisorHHSurvey] = useState("");
  const [fieldStaffHHSurvey, setFieldStaffHHSurvey] = useState("");
  const [wardNoGPHHSurvey, setWardNoGPHHSurvey] = useState("");
  const [localityNameMohallaHHSurvey, setLocalityNameMohallaHHSurvey] =
    useState("");
  const [houseNumberHHSurvey, setHouseNumberHHSurvey] = useState("");
  const [nameOfResidentHHSurvey, setNameOfResidentHHSurvey] = useState("");
  const [numberOfFamilyMembersHHSurvey, setNumberOfFamilyMembersHHSurvey] =
    useState("");
  const [
    numberOfChildBelow18YearsHHSurvey,
    setNumberOfChildBelow18YearsHHSurvey,
  ] = useState("");
  const [occupationHHSurvey, setOccupationHHSurvey] = useState("");
  const [ownershipOfHouseHHSurvey, setOwnershipOfHouseHHSurvey] = useState("");
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

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formData = {
    dateHHSurvey,
    supervisorHHSurvey,
    fieldStaffHHSurvey,
    wardNoGPHHSurvey,
    localityNameMohallaHHSurvey,
    houseNumberHHSurvey,
    nameOfResidentHHSurvey,
    numberOfFamilyMembersHHSurvey,
    numberOfChildBelow18YearsHHSurvey,
    occupationHHSurvey,
    ownershipOfHouseHHSurvey,
    typeOfSegregationHHSurvey,
    areYouDoingHomeCompostingHHSurvey,
    doYouHaveToiletInYourHouseHHSurvey,
    selectToiletTypeHHSurvey,
    doYouManagingGreyWaterHHSurvey,
    areYouWillingToDoKitchenGardenInFutureHHSurvey,
    areYouWillingToConstructIndividualSoakPitInFutureHHSurvey,
    userChargesInRupeesPerMonthHHSurvey,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    setUserRole(localStorage.getItem("role_name"));
    //     try {
    //       async function fetchData() {
    //         const token = await localStorage.getItem("token");
    //         if (!token) {
    //           route.push("/home/login");
    //         } else {
    //           setUserRole(localStorage.getItem("role_name"));
    //           setToken(token);

    //           //Fetching user details
    //           const user_details_response = await sendRequest(
    //             "get",
    //             "/user-details",
    //             null,
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${token}`,
    //               },
    //             }
    //           );

    //           if (user_details_response.status === 1) {
    //             // console.log("User Details Response ::", user_details_response.data);
    //             setAPI_Data_userDetails(user_details_response.data);
    //           }
    //         }
    //       }
    //       fetchData();
    //     } catch (error) {
    //       swal("Error", error.message, "error");
    //     }
  }, []);

  // API Data Fetching

  // Function Declarations

  // Handler Functions
  const handleVal = (id, val) => {
    setTest(val);
    console.log(test);
  };

  return (
    <>
      <Header
        userRole={userRole}
        isOffCanvasVisible={false}
        loadingdata={loadingHeaderData}
      />

      <div className={styles.container}>
        <div className={styles.formcontainer}>
          <Surveyques
            id={"dateHHSurvey"}
            labelText={translate?.Date_HH_survey}
            value={dateHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
        </div>
      </div>
    </>
  );
}
