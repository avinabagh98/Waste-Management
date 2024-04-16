"use client";

import styles from "./household.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";

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


  const formDataHH = {
    "date": dateHHSurvey,
    "supervisor": supervisorHHSurvey,
    "numberOfChildBelow18Years": numberOfChildBelow18YearsHHSurvey,
    "ownershipOfHouse": ownershipOfHouseHHSurvey,
    "typeOfToilet": selectToiletTypeHHSurvey,
    "userChargeParMonth": userChargesInRupeesPerMonthHHSurvey,
    "wordNo": wardNoGPHHSurvey,
    "locality": localityNameMohallaHHSurvey,
    "addaharNo": "",
    "familyMembers": numberOfFamilyMembersHHSurvey,
    "houseHoldName": houseNumberHHSurvey,
    "mobileNo": "",
    "ocupation": occupationHHSurvey,
    "ownerType": "",
    "holdingNumber": "",
    "roadLane": "",
    "homeBaseManageRat": "",
    "road": "",
    "typeOfWGU": "",
    "pets": "",
    "patients": "",
    "toiletInHouse": doYouHaveToiletInYourHouseHHSurvey,
    "typeOfSegragation": typeOfSegregationHHSurvey,
    "fieldStaff": fieldStaffHHSurvey,
    "mohallaCommitte": "",
    "nameOfResident": nameOfResidentHHSurvey,
    "isComposed": areYouDoingHomeCompostingHHSurvey,
    "isManageGrayWater": doYouManagingGreyWaterHHSurvey,
    "isKitchenGarden": areYouWillingToDoKitchenGardenInFutureHHSurvey,
    "isConstructIndividual": areYouWillingToConstructIndividualSoakPitInFutureHHSurvey,
    "token": token
  }

  //Handler Functions
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formDataHH);
  }


  const demoOptions = ["select", "demo1", "demo2"];

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
    if (id === "dateHHSurvey") {
      setDateHHSurvey(val);
    }
    if (id === "supervisorHHSurvey") {
      setSupervisorHHSurvey(val);
    }

    if (id === "fieldStaffHHSurvey") {
      setFieldStaffHHSurvey(val);
    }

    if (id === "wardNoGPHHSurvey") {
      setWardNoGPHHSurvey(val);
    }

    if (id === "localityNameMohallaHHSurvey") {
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

    if (id === "occupationHHSurvey") {
      setOccupationHHSurvey(val);
    }

    if (id === "selectToiletTypeHHSurvey") {
      setSelectToiletTypeHHSurvey(val);
    }

    if (id === "userChargesInRupeesPerMonthHHSurvey") {

      setUserChargesInRupeesPerMonthHHSurvey(val);
    }




  };

  const handleRadioChange = (name, value) => {
    if (name === "ownershipOfHouseHHSurvey") {
      setOwnershipOfHouseHHSurvey(value);
    }
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
    if (name === "areYouWillingToDoKitchenGardenInFutureHHSurvey") {
      setAreYouWillingToDoKitchenGardenInFutureHHSurvey(value);
    }
    if (name === "areYouWillingToConstructIndividualSoakPitInFutureHHSurvey") {
      setAreYouWillingToConstructIndividualSoakPitInFutureHHSurvey(value);
    }

  }

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
          <Textparser text={"Household Survey Add"} />
        </div>

        <div className={styles.formcontainer}>
          <Surveyques
            id={"dateHHSurvey"}
            type={"date"}
            labelText={translate?.Date_HH_survey}
            value={dateHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"supervisorHHSurvey"}
            labelText={translate?.Supervisor_HH_survey}
            value={supervisorHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"fieldStaffHHSurvey"}
            labelText={translate?.Field_Staff_HH_survey}
            value={fieldStaffHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          />

          <SurveyDropdown
            id={"wardNoGPHHSurvey"}
            labelText={translate?.Ward_no_GP_HH_survey}
            value={wardNoGPHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          />

          <SurveyDropdown
            id={"localityNameMohallaHHSurvey"}
            labelText={translate?.Locality_Name_Mohalla_HH_survey}
            value={localityNameMohallaHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          />

          <Surveyques
            id={"houseNumberHHSurvey"}
            labelText={translate?.House_Number_HH_survey}
            value={houseNumberHHSurvey}
            required={true}
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
          />

          <Surveyques
            id={"numberOfChildBelow18YearsHHSurvey"}
            labelText={translate?.No_of_Child_below_18_years_HH_survey}
            value={numberOfChildBelow18YearsHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"occupationHHSurvey"}
            labelText={translate?.Occupation_HH_survey}
            value={occupationHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          />

          <div className={styles.radioInput}>
            <Textparser text={translate?.Ownership_of_House_HH_survey} />
            <div className={styles.radioInput_Options}>
              <span>
                <input
                  type="radio"
                  id="ownershipOfHouseHHSurvey_own"
                  name="ownershipOfHouseHHSurvey"
                  value="1"
                  checked={ownershipOfHouseHHSurvey === "1"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="ownershipOfHouseHHSurvey_own">Own</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="ownershipOfHouseHHSurvey_rent"
                  name="ownershipOfHouseHHSurvey"
                  value="0"
                  checked={ownershipOfHouseHHSurvey === "0"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="ownershipOfHouseHHSurvey_rent">Rent</label>
              </span>
            </div>
          </div>

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
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="typeOfSegregationHHSurvey_fully">Fully</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="typeOfSegregationHHSurvey_partial"
                  name="typeOfSegregationHHSurvey"
                  value="1"
                  checked={typeOfSegregationHHSurvey === "1"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name, e.target.value);
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
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="typeOfSegregationHHSurvey_no">No</label>
              </span>
            </div>
          </div>

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
                    handleRadioChange(e, e.target.name, e.target.value);
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
                  name="ownershipOfHouseHHSurvey"
                  value="0"
                  checked={areYouDoingHomeCompostingHHSurvey === "0"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="areYouDoingHomeCompostingHHSurvey_no">No</label>
              </span>
            </div>
          </div>

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
                    handleRadioChange(e, e.target.name, e.target.value);
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
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="doYouHaveToiletInYourHouseHHSurvey_no">
                  No
                </label>
              </span>
            </div>
          </div>

          <SurveyDropdown
            id={"selectToiletTypeHHSurvey"}
            labelText={translate?.Select_Toilet_Type_HH_survey}
            value={selectToiletTypeHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          />

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
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="doYouManagingGreyWaterHHSurvey_yes">Yes</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="doYouManagingGreyWaterHHSurvey_no"
                  name="doYouManagingGreyWaterHHSurvey"
                  value="0"
                  checked={doYouManagingGreyWaterHHSurvey === "0"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="doYouManagingGreyWaterHHSurvey_no">No</label>
              </span>
            </div>
          </div>

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
                    handleRadioChange(e, e.target.name, e.target.value);
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
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="areYouWillingToDoKitchenGardenInFutureHHSurvey_no">
                  No
                </label>
              </span>
            </div>
          </div>

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
                    handleRadioChange(e, e.target.name, e.target.value);
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
                    handleRadioChange(e, e.target.name, e.target.value);
                  }}
                />
                <label htmlFor="areYouWillingToConstructIndividualSoakPitInFutureHHSurvey_no">
                  No
                </label>
              </span>
            </div>
          </div>

          <Surveyques
            id={"userChargesInRupeesPerMonthHHSurvey"}
            labelText={translate?.User_charges_HH_survey}
            value={userChargesInRupeesPerMonthHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}

          />

          <div className={styles.btnContainer}>
            <button className={styles.submitbtn} onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
