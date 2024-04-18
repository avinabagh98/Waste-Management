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
  const [user_id, setUser_id] = useState("");
  const [supervisorId, setSupervisorId] = useState("");


  //Loading Header Data States
  const [name, setName] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: ward_id,
    block_name: block_name,
  };

  const formDataIncome = {
    token: token,
    create_date: dateIncome,
    user_id: user_id,
    wardId: ward_id,
    localityId: localityNameVillageIncome,
    supervisorId: supervisorId,
    mohallaId: mohallaCommiteeIncome,
    wasteCollector: wasteCollectorNameIncome,
    recylableSold: recyclableSoldIncome,
    plasticSold: plasticRecyclableSoldIncome,
    incomeofRecylable: incomeFromSaleOfRecyclableIncome,
    saleOfManure: saleOfManureIncome,
  };

  const mohallaOptions = ["Select", "1"];
  const collectorNameOptions = ["Select"];

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
          setUserRole(localStorage.getItem("role_name"));
          setUser_id(localStorage.getItem("user_id"));
          setToken(token);

          //loadingHeaderData from local storage
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setWard_id(localStorage.getItem("ward_id"));

          setFieldStaffIncome(localStorage.getItem("name"));
          setSupervisorIncome(localStorage.getItem("supervisor"));
          setWardNoGpIncome(localStorage.getItem("ward_id"));


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
    if (id === "supervisorIncome") { setSupervisorIncome(val); }
    if (id === "fieldStaffIncome") { setFieldStaffIncome(val); }
    if (id === "dateIncome") { setDateIncome(val); }
    if (id === "wardNoGpIncome") { setWardNoGpIncome(val); }
    if (id === "localityNameVillageIncome") { setLocalityNameVillageIncome(val); }
    if (id === "mohallaCommiteeIncome") { setMohallaCommiteeIncome(val); }
    if (id === "wasteCollectorNameIncome") { setWasteCollectorNameIncome(val); }
    if (id === "recyclableSoldIncome") { setRecyclableSoldIncome(val); }
    if (id === "plasticRecyclableSoldIncome") { setPlasticRecyclableSoldIncome(val); }
    if (id === "incomeFromSaleOfRecyclableIncome") { setIncomeFromSaleOfRecyclableIncome(val); }
    if (id === "saleOfManureIncome") { setSaleOfManureIncome(val); }

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Income Submitted :: ", formDataIncome);

    // try {

    //   console.log("LiveStock Submitted :: ", formDataLS);
    //   const res = await sendRequest(
    //     "post",
    //     "/livestockShed/add",
    //     formDataLS,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       }
    //     }
    //   );
    //   if (res.status === 1) {

    //     swal("Successfully", "Livestock Added", "success");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

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
            type={"date"}
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
            <button className={styles.submitbtn} onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
