"use client";

import styles from "./mohalla.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";

export default function Mohallapage() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  //form-data states
  const [dateOfMeetingMohalla, setDateOfMeetingMohalla] = useState("");
  const [supervisorMohalla, setSupervisorMohalla] = useState("");
  const [fieldStaffMohalla, setFieldStaffMohalla] = useState("");
  const [wardNoGPMohalla, setWardNoGPMohalla] = useState("");
  const [localityNameVillageMohalla, setLocalityNameVillageMohalla] =
    useState("");
  const [mohallaCommiteeMohalla, setMohallaCommiteeMohalla] = useState("");
  const [householdsUnderMCMohalla, setHouseholdsUnderMCMohalla] = useState("");
  const [
    householdDoingSegregationMohalla,
    setHouseholdDoingSegregationMohalla,
  ] = useState("");
  const [hhPayingUserChargesMohalla, setHhPayingUserChargesMohalla] =
    useState("");
  const [
    userChargesCollectedRsPerMonthMohalla,
    setUserChargesCollectedRsPerMonthMohalla,
  ] = useState("");
  const [salaryPaidToWastePickerMohalla, setSalaryPaidToWastePickerMohalla] =
    useState("");
  const [otherExpensesInRsMohalla, setOtherExpensesInRsMohalla] = useState("");
  const [
    isTheWasteCollectorRegularMohalla,
    setIsTheWasteCollectorRegularMohalla,
  ] = useState("0");
  const [
    isTheWasteComingToComposter1Mohalla,
    setIsTheWasteComingToComposter1Mohalla,
  ] = useState("");
  const [
    isTheWasteComingToComposter2Mohalla,
    setIsTheWasteComingToComposter2Mohalla,
  ] = useState("");
  const [manureGeneratedInKgMohalla, setManureGeneratedInKgMohalla] =
    useState("");
  const [manureSoldInKgMohalla, setManureSoldInKgMohalla] = useState("");
  const [incomeFromManureSoldInRsMohalla, setIncomeFromManureSoldInRsMohalla] =
    useState("");
  const [
    noOfHhsTakingHomeCompostingMohalla,
    setNoOfHhsTakingHomeCompostingMohalla,
  ] = useState("");
  const [balanceInRsMohalla, setBalanceInRsMohalla] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formDatamohalla = {
    dateOfMeetingMohalla,
    supervisorMohalla,
    fieldStaffMohalla,
    wardNoGPMohalla,
    localityNameVillageMohalla,
    mohallaCommiteeMohalla,
    householdsUnderMCMohalla,
    householdDoingSegregationMohalla,
    hhPayingUserChargesMohalla,
    userChargesCollectedRsPerMonthMohalla,
    salaryPaidToWastePickerMohalla,
    otherExpensesInRsMohalla,
    isTheWasteCollectorRegularMohalla,
    isTheWasteComingToComposter1Mohalla,
    isTheWasteComingToComposter2Mohalla,
    manureGeneratedInKgMohalla,
    manureSoldInKgMohalla,
    incomeFromManureSoldInRsMohalla,
    noOfHhsTakingHomeCompostingMohalla,
    balanceInRsMohalla,
  };

  const wardOptions = ["select", "1", "2"];
  const localityOptions = ["select", "1", "2"];
  const mohallaOptions = ["select", "1", "2"];

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    // setUserRole(localStorage.getItem("role_name"));
    console.log(isTheWasteCollectorRegularMohalla);
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
  }, [isTheWasteCollectorRegularMohalla]);

  // API Data Fetching

  // Function Declarations

  // Handler Functions

  const handleVal = (id, val) => {};

  const handleRadioChange = (e, name) => {
    if (name === "isTheWasteCollectorRegularMohalla") {
      setIsTheWasteCollectorRegularMohalla(e.target.value);
    }
    if (name === "isTheWasteComingToComposter1Mohalla") {
      setIsTheWasteComingToComposter1Mohalla(e.target.value);
    }
    if (name === "isTheWasteComingToComposter2Mohalla") {
      setIsTheWasteComingToComposter2Mohalla(e.target.value);
    }
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
            id={"dateOfMeetingMohalla"}
            labelText={translate?.Date_of_Meeting_mohalla}
            value={dateOfMeetingMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"supervisorMohalla"}
            labelText={translate?.Supervisor_mohalla}
            value={supervisorMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"fieldStaffMohalla"}
            labelText={translate?.Field_Staff_mohalla}
            value={fieldStaffMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <SurveyDropdown
            id={"wardNoGPMohalla"}
            labelText={translate?.Ward_No_GP_mohalla}
            value={wardNoGPMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={wardOptions}
          />
          <SurveyDropdown
            id={"localityNameVillageMohalla"}
            labelText={translate?.Locality_Name_Village_mohalla}
            value={localityNameVillageMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={localityOptions}
          />
          <SurveyDropdown
            id={"mohallaCommiteeMohalla"}
            labelText={translate?.Mohalla_Commitee_mohalla}
            value={mohallaCommiteeMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={mohallaOptions}
          />

          <Surveyques
            id={"householdsUnderMCMohalla"}
            labelText={translate?.Households_Under_MC_mohalla}
            value={householdsUnderMCMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"householdDoingSegregationMohalla"}
            labelText={translate?.Household_Doing_Segregation_mohalla}
            value={householdDoingSegregationMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"hhPayingUserChargesMohalla"}
            labelText={translate?.HH_Paying_User_Charges_mohalla}
            value={hhPayingUserChargesMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"userChargesCollectedRsPerMonthMohalla"}
            labelText={translate?.User_Charges_Collected_Rs_per_month_mohalla}
            value={userChargesCollectedRsPerMonthMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"salaryPaidToWastePickerMohalla"}
            labelText={translate?.Salary_paid_to_Waste_Picker_mohalla}
            value={salaryPaidToWastePickerMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"otherExpensesInRsMohalla"}
            labelText={translate?.Other_Expenses_in_Rs_mohalla}
            value={otherExpensesInRsMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <div className={styles.radioInput}>
            <Textparser
              text={translate?.Is_the_waste_collector_regular_mohalla}
            />
            <div className={styles.radioInput_Options}>
              <span>
                <input
                  type="radio"
                  id="isTheWasteCollectorRegularMohalla_yes"
                  name="isTheWasteCollectorRegularMohalla"
                  value="1"
                  checked={isTheWasteCollectorRegularMohalla === "1"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name);
                  }}
                />
                <label htmlFor="isTheWasteCollectorRegularMohalla_yes">
                  Yes
                </label>
              </span>
              <span>
                <input
                  type="radio"
                  id="isTheWasteCollectorRegularMohalla_no"
                  name="isTheWasteCollectorRegularMohalla"
                  value="0"
                  checked={isTheWasteCollectorRegularMohalla === "0"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name);
                  }}
                />
                <label htmlFor="isTheWasteCollectorRegularMohalla_no">No</label>
              </span>
            </div>
          </div>

          <div className={styles.radioInput}>
            <Textparser
              text={translate?.Is_the_waste_coming_to_composter_1_mohalla}
            />
            <div className={styles.radioInput_Options}>
              <span>
                <input
                  type="radio"
                  id="isTheWasteComingToComposter1Mohalla_yes"
                  name="isTheWasteComingToComposter1Mohalla"
                  value="1"
                  checked={isTheWasteComingToComposter1Mohalla === "1"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name);
                  }}
                />
                <label htmlFor="isTheWasteComingToComposter1Mohalla_yes">
                  Yes
                </label>
              </span>
              <span>
                <input
                  type="radio"
                  id="isTheWasteComingToComposter1Mohalla_no"
                  name="isTheWasteComingToComposter1Mohalla"
                  value="0"
                  checked={isTheWasteComingToComposter1Mohalla === "0"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name);
                  }}
                />
                <label htmlFor="isTheWasteComingToComposter1Mohalla_no">
                  No
                </label>
              </span>
            </div>
          </div>

          <div className={styles.radioInput}>
            <Textparser
              text={translate?.Is_the_waste_coming_to_composter_2_mohalla}
            />
            <div className={styles.radioInput_Options}>
              <span>
                <input
                  type="radio"
                  id="isTheWasteComingToComposter2Mohalla_yes"
                  name="isTheWasteComingToComposter2Mohalla"
                  value="1"
                  checked={isTheWasteComingToComposter2Mohalla === "1"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name);
                  }}
                />
                <label htmlFor="isTheWasteComingToComposter2Mohalla_yes">
                  Yes
                </label>
              </span>
              <span>
                <input
                  type="radio"
                  id="isTheWasteComingToComposter2Mohalla_no"
                  name="isTheWasteComingToComposter2Mohalla"
                  value="0"
                  checked={isTheWasteComingToComposter2Mohalla === "0"}
                  onChange={(e) => {
                    handleRadioChange(e, e.target.name);
                  }}
                />
                <label htmlFor="isTheWasteComingToComposter2Mohalla_no">
                  No
                </label>
              </span>
            </div>
          </div>

          <Surveyques
            id={"manureGeneratedInKgMohalla"}
            labelText={translate?.Manure_Generated_in_Kg_mohalla}
            value={manureGeneratedInKgMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"manureSoldInKgMohalla"}
            labelText={translate?.Manure_Sold_in_Kg_mohalla}
            value={manureSoldInKgMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"incomeFromManureSoldInRsMohalla"}
            labelText={translate?.Income_from_Manure_Sold_in_Rs_mohalla}
            value={incomeFromManureSoldInRsMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"noOfHhsTakingHomeCompostingMohalla"}
            labelText={translate?.No_of_HHs_taking_Home_Composting_mohalla}
            value={noOfHhsTakingHomeCompostingMohalla}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"balanceInRsMohalla"}
            labelText={translate?.Balance_in_Rs_mohalla}
            value={balanceInRsMohalla}
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
