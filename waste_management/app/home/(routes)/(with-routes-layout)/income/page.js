"use client";

import styles from "./income.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";

export default function Incomepage() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  //form-data states
  const [dateIncome, setDateIncome] = useState("");
  const [supervisorIncome, setSupervisorIncome] = useState("");
  const [fieldStaffIncome, setFieldStaffIncome] = useState("");
  const [mohallaCommiteeIncome, setMohallaCommiteeIncome] = useState("");
  const [wardNoGpIncome, setWardNoGpIncome] = useState("");
  const [localityNameVillageIncome, setLocalityNameVillageIncome] =
    useState("");
  const [wasteCollectorNameIncome, setWasteCollectorNameIncome] = useState("");
  const [recyclableSoldIncome, setRecyclableSoldIncome] = useState("");
  const [plasticRecyclableSoldIncome, setPlasticRecyclableSoldIncome] =
    useState("");
  const [
    incomeFromSaleOfRecyclableIncome,
    setIncomeFromSaleOfRecyclableIncome,
  ] = useState("");
  const [saleOfManureIncome, setSaleOfManureIncome] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formData = {
    dateIncome,
    supervisorIncome,
    fieldStaffIncome,
    mohallaCommiteeIncome,
    wardNoGpIncome,
    localityNameVillageIncome,
    wasteCollectorNameIncome,
    recyclableSoldIncome,
    plasticRecyclableSoldIncome,
    incomeFromSaleOfRecyclableIncome,
    saleOfManureIncome,
  };

  const mohallaOptions = ["Select"];
  const collectorNameOptions = ["Select"];

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
            id={"dateIncome"}
            labelText={translate?.Date_income}
            value={dateIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"supervisorIncome"}
            labelText={translate?.Supervisor_income}
            value={supervisorIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"fieldStaffIncome"}
            labelText={translate?.Field_Staff_income}
            value={fieldStaffIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"mohallaCommiteeIncome"}
            labelText={translate?.Mohalla_Commitee_income}
            value={mohallaCommiteeIncome}
            options={mohallaOptions}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"wardNoGpIncome"}
            labelText={translate?.Ward_No_GP_income}
            value={wardNoGpIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"localityNameVillageIncome"}
            labelText={translate?.Locality_Name_Village_income}
            value={localityNameVillageIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <SurveyDropdown
            id={"wasteCollectorNameIncome"}
            labelText={translate?.Waste_Collector_Name_income}
            value={wasteCollectorNameIncome}
            options={collectorNameOptions}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"recyclableSoldIncome"}
            labelText={translate?.Recyclable_Sold_income}
            value={recyclableSoldIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"plasticRecyclableSoldIncome"}
            labelText={translate?.Plastic_Recyclable_Sold_income}
            value={plasticRecyclableSoldIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"incomeFromSaleOfRecyclableIncome"}
            labelText={translate?.Income_from_sale_of_recyclable_income}
            value={incomeFromSaleOfRecyclableIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"saleOfManureIncome"}
            labelText={translate?.Sale_of_Manure_income}
            value={saleOfManureIncome}
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
