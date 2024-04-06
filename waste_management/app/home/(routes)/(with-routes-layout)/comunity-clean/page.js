"use client";

import styles from "./comunity.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";

export default function ComunityCleanpage() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  //form-data states
  const [monthAndYearCleaningToilets, setMonthAndYearCleaningToilets] =
    useState("");
  const [supervisorCleaningToilets, setSupervisorCleaningToilets] =
    useState("");
  const [fieldStaffCleaningToilets, setFieldStaffCleaningToilets] =
    useState("");
  const [communityToiletCleaningToilets, setCommunityToiletCleaningToilets] =
    useState("");
  const [mohallaCommiteeCleaningToilets, setMohallaCommiteeCleaningToilets] =
    useState("");
  const [cleaningToiletCleaningToilets, setCleaningToiletCleaningToilets] =
    useState("");
  const [electricityCleaningToilets, setElectricityCleaningToilets] =
    useState("");
  const [
    cleaningMaterialsCleaningToilets,
    setCleaningMaterialsCleaningToilets,
  ] = useState("");
  const [swiperChargesCleaningToilets, setSwiperChargesCleaningToilets] =
    useState("");
  const [minorRepairCleaningToilets, setMinorRepairCleaningToilets] =
    useState("");
  const [majorRepairCleaningToilets, setMajorRepairCleaningToilets] =
    useState("");
  const [oMCollectorCleaningToilets, setOMCollectorCleaningToilets] =
    useState("");
  const [
    oMRegisterMaintainedCleaningToilets,
    setOMRegisterMaintainedCleaningToilets,
  ] = useState("");
  const [
    sanitaryWasteManagedCleaningToilets,
    setSanitaryWasteManagedCleaningToilets,
  ] = useState("");
  const [
    hygieneTrainingUndertakenCleaningToilets,
    setHygieneTrainingUndertakenCleaningToilets,
  ] = useState("");
  const [
    specialDayCelebratedCleaningToilets,
    setSpecialDayCelebratedCleaningToilets,
  ] = useState("");
  const [allTapFunctionalCleaningToilets, setAllTapFunctionalCleaningToilets] =
    useState("");
  const [allDoorsClosingCleaningToilets, setAllDoorsClosingCleaningToilets] =
    useState("");
  const [conditionOfTilesCleaningToilets, setConditionOfTilesCleaningToilets] =
    useState("");
  const [conditionOfRoofCleaningToilets, setConditionOfRoofCleaningToilets] =
    useState("");
  const [
    conditionOfWashbasinCleaningToilets,
    setConditionOfWashbasinCleaningToilets,
  ] = useState("");
  const [
    conditionOfBoundaryWallCleaningToilets,
    setConditionOfBoundaryWallCleaningToilets,
  ] = useState("");
  const [
    conditionOfOverheadTankCleaningToilets,
    setConditionOfOverheadTankCleaningToilets,
  ] = useState("");
  const [
    conditionOfElectricBulbCleaningToilets,
    setConditionOfElectricBulbCleaningToilets,
  ] = useState("");
  const [
    conditionOfSepticTankCleaningToilets,
    setConditionOfSepticTankCleaningToilets,
  ] = useState("");
  const [conditionOfPimpCleaningToilets, setConditionOfPimpCleaningToilets] =
    useState("");
  const [
    totalUserChargesCollectedCleaningToilets,
    setTotalUserChargesCollectedCleaningToilets,
  ] = useState("");
  const [
    totalNumberOfHouseholdsInMCCleaningToilets,
    setTotalNumberOfHouseholdsInMCCleaningToilets,
  ] = useState("");
  const [
    userChargesPerUserCleaningToilets,
    setUserChargesPerUserCleaningToilets,
  ] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formData = {
    monthAndYearCleaningToilets,
    supervisorCleaningToilets,
    fieldStaffCleaningToilets,
    communityToiletCleaningToilets,
    mohallaCommiteeCleaningToilets,
    cleaningToiletCleaningToilets,
    electricityCleaningToilets,
    cleaningMaterialsCleaningToilets,
    swiperChargesCleaningToilets,
    minorRepairCleaningToilets,
    majorRepairCleaningToilets,
    oMCollectorCleaningToilets,
    oMRegisterMaintainedCleaningToilets,
    sanitaryWasteManagedCleaningToilets,
    hygieneTrainingUndertakenCleaningToilets,
    specialDayCelebratedCleaningToilets,
    allTapFunctionalCleaningToilets,
    allDoorsClosingCleaningToilets,
    conditionOfTilesCleaningToilets,
    conditionOfRoofCleaningToilets,
    conditionOfWashbasinCleaningToilets,
    conditionOfBoundaryWallCleaningToilets,
    conditionOfOverheadTankCleaningToilets,
    conditionOfElectricBulbCleaningToilets,
    conditionOfSepticTankCleaningToilets,
    conditionOfPimpCleaningToilets,
    totalUserChargesCollectedCleaningToilets,
    totalNumberOfHouseholdsInMCCleaningToilets,
    userChargesPerUserCleaningToilets,
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
            id={"monthAndYearCleaningToilets"}
            labelText={translate?.Month_and_year_cleaning_toilets}
            value={monthAndYearCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
        </div>
      </div>
    </>
  );
}
