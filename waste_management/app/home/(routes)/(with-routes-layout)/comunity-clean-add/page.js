"use client";

import styles from "./comunity.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";

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
  const [conditionOfPumpCleaningToilets, setConditionOfPumpCleaningToilets] =
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

  //Loading Header Data States
  const [name, setName] = useState("");
  const [wardName, setWardName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");


  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_name: wardName,
    block_name: block_name,
  };

  const formDataCC = {
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
    conditionOfPumpCleaningToilets,
    totalUserChargesCollectedCleaningToilets,
    totalNumberOfHouseholdsInMCCleaningToilets,
    userChargesPerUserCleaningToilets,
  };

  const comunitytoileteOptions = ["select"];
  const cleaningstatusOptions = ["select"];
  const oMOptions = ["select"];
  const sanitaryOptions = ["select"];
  const hygineOptions = ["select"];
  const specialdayOptions = ["select"];
  const alltapOptions = ["select"];
  const alldoorOptions = ["select"];
  const tileconditionOptions = ["select"];
  const roofconditionOptions = ["select"];
  const washBasinconditionOptions = ["select"];
  const boundarywallconditionOptions = ["select"];
  const overheadtankOptions = ["select"];
  const bulbOptions = ["select"];
  const septictankOptions = ["select"];
  const pumpOptions = ["select"];

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {

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
          setWardName(localStorage.getItem("ward_id"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
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

        {/* //breadcrumb */}
        <div className={styles.breadcrumb}>
          <Textparser text={"Community Toilet Add"} />
        </div>

        {/* //Lists */}
        <div className={styles.formcontainer}>
          <Surveyques
            id={"monthAndYearCleaningToilets"}
            labelText={translate?.Month_and_year_cleaning_toilets}
            value={monthAndYearCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"supervisorCleaningToilets"}
            labelText={translate?.Supervisor_cleaning_toilets}
            value={supervisorCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"fieldStaffCleaningToilets"}
            labelText={translate?.Field_Staff_cleaning_toilets}
            value={fieldStaffCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={comunitytoileteOptions}
          />

          <Surveyques
            id={"communityToiletCleaningToilets"}
            labelText={translate?.Community_Toilet_cleaning_toilets}
            value={communityToiletCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"mohallaCommiteeCleaningToilets"}
            labelText={translate?.Mohalla_Commitee_cleaning_toilets}
            value={mohallaCommiteeCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={cleaningstatusOptions}
          />
          <Surveyques
            id={"cleaningToiletCleaningToilets"}
            labelText={translate?.Cleaning_Toilet_cleaning_toilets}
            value={cleaningToiletCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"electricityCleaningToilets"}
            labelText={translate?.Electricity_cleaning_toilets}
            value={electricityCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"cleaningMaterialsCleaningToilets"}
            labelText={translate?.Cleaning_Materials_cleaning_toilets}
            value={cleaningMaterialsCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"swiperChargesCleaningToilets"}
            labelText={translate?.Swiper_Charges_cleaning_toilets}
            value={swiperChargesCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"minorRepairCleaningToilets"}
            labelText={translate?.Minor_Repair_cleaning_toilets}
            value={minorRepairCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"majorRepairCleaningToilets"}
            labelText={translate?.Major_Repair_cleaning_toilets}
            value={majorRepairCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"oMCollectorCleaningToilets"}
            labelText={translate?.OM_Collector_cleaning_toilets}
            value={oMCollectorCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"oMRegisterMaintainedCleaningToilets"}
            labelText={translate?.OM_Register_Maintained_cleaning_toilets}
            value={oMRegisterMaintainedCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={oMOptions}
          />

          <SurveyDropdown
            id={"sanitaryWasteManagedCleaningToilets"}
            labelText={translate?.Sanitary_Waste_Managed_cleaning_toilets}
            value={sanitaryWasteManagedCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={sanitaryOptions}
          />

          <SurveyDropdown
            id={"hygieneTrainingUndertakenCleaningToilets"}
            labelText={translate?.Hygiene_Training_Undertaken_cleaning_toilets}
            value={hygieneTrainingUndertakenCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={hygineOptions}
          />

          <SurveyDropdown
            id={"specialDayCelebratedCleaningToilets"}
            labelText={translate?.Special_Day_Celebrated_cleaning_toilets}
            value={specialDayCelebratedCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={specialdayOptions}
          />

          <SurveyDropdown
            id={"allTapFunctionalCleaningToilets"}
            labelText={translate?.All_Tap_Functional_cleaning_toilets}
            value={allTapFunctionalCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={alltapOptions}
          />

          <SurveyDropdown
            id={"allDoorsClosingCleaningToilets"}
            labelText={translate?.All_Doors_Closing_cleaning_toilets}
            value={allDoorsClosingCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={alldoorOptions}
          />

          <SurveyDropdown
            id={"conditionOfTilesCleaningToilets"}
            labelText={translate?.Condition_of_Tiles_cleaning_toilets}
            value={conditionOfTilesCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={tileconditionOptions}
          />

          <SurveyDropdown
            id={"conditionOfRoofCleaningToilets"}
            labelText={translate?.Condition_of_Roof_cleaning_toilets}
            value={conditionOfRoofCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={roofconditionOptions}
          />

          <SurveyDropdown
            id={"conditionOfWashbasinCleaningToilets"}
            labelText={translate?.Condition_of_Washbasin_cleaning_toilets}
            value={conditionOfWashbasinCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={washBasinconditionOptions}
          />

          <SurveyDropdown
            id={"conditionOfBoundaryWallCleaningToilets"}
            labelText={translate?.Condition_of_Boundary_Wall_cleaning_toilets}
            value={conditionOfBoundaryWallCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={boundarywallconditionOptions}
          />

          <SurveyDropdown
            id={"conditionOfOverheadTankCleaningToilets"}
            labelText={translate?.Condition_of_Overhead_Tank_cleaning_toilets}
            value={conditionOfOverheadTankCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={overheadtankOptions}
          />

          <SurveyDropdown
            id={"conditionOfElectricBulbCleaningToilets"}
            labelText={translate?.Condition_of_Electric_Bulb_cleaning_toilets}
            value={conditionOfElectricBulbCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={bulbOptions}
          />

          <SurveyDropdown
            id={"conditionOfSepticTankCleaningToilets"}
            labelText={translate?.Condition_of_Septic_Tank_cleaning_toilets}
            value={conditionOfSepticTankCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={septictankOptions}
          />

          <SurveyDropdown
            id={"conditionOfPumpCleaningToilets"}
            labelText={translate?.Condition_of_Pump_cleaning_toilets}
            value={conditionOfPumpCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={pumpOptions}
          />

          <Surveyques
            id={"totalUserChargesCollectedCleaningToilets"}
            labelText={translate?.Total_User_Charges_Collected_cleaning_toilets}
            value={totalUserChargesCollectedCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"totalNumberOfHouseholdsInMCCleaningToilets"}
            labelText={
              translate?.Total_number_of_Households_in_MC_cleaning_toilets
            }
            value={totalNumberOfHouseholdsInMCCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"userChargesPerUserCleaningToilets"}
            labelText={translate?.User_Charges_Per_User_cleaning_toilets}
            value={userChargesPerUserCleaningToilets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <div className={styles.btnContainer}>
            <button className={styles.submitbtn}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
