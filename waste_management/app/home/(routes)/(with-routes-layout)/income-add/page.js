"use client";

import styles from "./income.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import { sendRequest } from "@/api/sendRequest";
import Textparser from "@/components/Textparser";


export default function IncomeAddpage() {

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
  const [today, setToday] = useState("");

  const [mohalla, setMohalla] = useState("");
  const [mohallaId, setMohallaId] = useState("");
  const [mohallaName, setMohallaName] = useState([]);
  const [wasteCollectors, setWasteCollectors] = useState([]);
  const [wasteCollectorName, setWasteCollectorName] = useState([]);
  const [wasteCollectorId, setWasteCollectorId] = useState("");

  //Loading Header Data States
  const [name, setName] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");

  const [locality, setLocality] = useState([]);
  const [localName, setLocalName] = useState([]);
  const [localityId, setLocalityId] = useState([]);

  //Loader States
  const [spinner, setSpinner] = useState(false);

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: ward_id,
    block_name: block_name,
    supervisor: supervisorIncome
  };

  const formDataIncome = {
    token: token,
    create_date: dateIncome,
    fieldstaffId: user_id,
    wardId: ward_id,
    localityId: localityId,
    supervisorId: supervisorId,
    mohallaId: mohallaId,
    wasteCollector: wasteCollectorId,
    recylableSold: recyclableSoldIncome,
    plasticSold: plasticRecyclableSoldIncome,
    incomeofRecylable: incomeFromSaleOfRecyclableIncome,
    saleOfManure: saleOfManureIncome,
  };

  const dropDownBody = {
    token: token,
    wardId: ward_id,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    try {
      localStorage.setItem("previousPath", "/home/income-list");
      setToday(localStorage.getItem("today"))
      setDateIncome(localStorage.getItem("today"));
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
          setSupervisorId(localStorage.getItem("supervisor_id"));
          setWardNoGpIncome(localStorage.getItem("ward_id"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  // Mohalla Committee By Ward API Calling
  useEffect(() => {
    try {
      async function fetchDropdown() {
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

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Mohalla Committee List Dropdown State Update
  useEffect(() => {
    if (mohalla.length > 0) {
      const mohallaNames = mohalla.map((mohalla) => mohalla.committee_name);
      setMohallaName(mohallaNames);
      setMohallaId(mohalla[0].id);
    }
  }, [mohalla]);

  // Waste Collector By Ward API Calling
  useEffect(() => {
    try {
      async function fetchDropdown() {
        const response = await sendRequest(
          "post",
          `/westecollector/List`,
          dropDownBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            `Waste Collectors in ward ${ward_id} from API ::`,
            response.data.data.incomeList
          );
          setWasteCollectors(response.data.data.incomeList);
        }
      }

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Waste Collector List Dropdown State Update
  useEffect(() => {
    if (wasteCollectors.length > 0) {
      const waste_collectors = wasteCollectors.map((item) => item.user_name);
      setWasteCollectorName(waste_collectors);
      setWasteCollectorId(wasteCollectors[0].id);
    }
  }, [wasteCollectors]);



  // Locality By Ward API Calling
  useEffect(() => {
    try {
      async function fetchDropdown() {
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

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Locality List Dropdown State Update
  useEffect(() => {
    if (locality.length > 0) {
      const localityaNames = locality.map((locality) => locality.village_name);
      setLocalName(localityaNames);
      setLocalityId(locality[0].id);
    }
  }, [locality]);







  // Handler Functions
  const handleVal = (id, val) => {
    if (id === "supervisorIncome") {
      setSupervisorIncome(val);
    }
    if (id === "fieldStaffIncome") {
      setFieldStaffIncome(val);
    }
    if (id === "dateIncome") {
      setDateIncome(val);
    }
    if (id === "wardNoGpIncome") {
      setWardNoGpIncome(val);
    }
    if (id === "localityNameVillageIncome") {
      let LVal = locality.filter((item) => item.village_name === val);
      let local_Selected = LVal[0].id;
      setLocalityId(local_Selected);
      setLocalityNameVillageIncome(val);
    }
    if (id === "mohallaCommiteeIncome") {
      let mhVal = mohalla.filter((item) => item.committee_name === val);
      let mohallaId_Selected = mhVal[0].id;
      setMohallaId(mohallaId_Selected);
      setMohallaCommiteeIncome(val);
    }
    if (id === "wasteCollectorNameIncome") {
      let wVal = wasteCollectors.filter((item) => item.user_name === val);
      let waste_collector_Selected = wVal[0].id;
      setWasteCollectorId(waste_collector_Selected);
      setWasteCollectorNameIncome(val);
    }
    if (id === "recyclableSoldIncome") {
      setRecyclableSoldIncome(val);
    }
    if (id === "plasticRecyclableSoldIncome") {
      setPlasticRecyclableSoldIncome(val);
    }
    if (id === "incomeFromSaleOfRecyclableIncome") {
      setIncomeFromSaleOfRecyclableIncome(val);
    }
    if (id === "saleOfManureIncome") {
      setSaleOfManureIncome(val);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let flag = false;
    for (const field in formDataIncome) {
      if (formDataIncome[field] === null || formDataIncome[field] === "") {
        flag = true;
        break;
      }
    }
    if (flag) {

      swal("Error", "Please fill all the fields", "error");
    } else {
      console.log("Income Added Submitted::", formDataIncome);
      try {
        setSpinner(true);
        const res = await sendRequest("post", "/income/add", formDataIncome, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 1) {
          swal("Successfully", "Income Added", "success");
          route.push("/home/income-list");
        }
      } catch (error) {
        console.log(error);
      }
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
        {/* //breadcrumb */}
        <div className={styles.breadcrumb}>
          <Textparser text={"Income Add"} />
        </div>

        {/* //spinner */}
        {spinner ? <><div className={styles.spinnerContainer}><img src="/svg/loader.svg" alt="loader"></img></div></> : null}

        {/* //form */}
        <div className={styles.formcontainer}>

          <Surveyques
            id={"dateIncome"}
            type={"date"}
            labelText={translate?.Date_income}
            value={dateIncome}
            defaultValue={today}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          {/* <Surveyques
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
          /> */}

          <SurveyDropdown
            id={"mohallaCommiteeIncome"}
            labelText={translate?.Mohalla_Commitee_income}
            value={mohallaCommiteeIncome}
            options={mohallaName}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          {/* <Surveyques
            id={"wardNoGpIncome"}
            labelText={translate?.Ward_No_GP_income}
            value={wardNoGpIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          /> */}

          <SurveyDropdown
            id={"localityNameVillageIncome"}
            labelText={translate?.Locality_Name_Village_income}
            value={localityNameVillageIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={localName}
          />
          <SurveyDropdown
            id={"wasteCollectorNameIncome"}
            labelText={translate?.Waste_Collector_Name_income}
            value={wasteCollectorNameIncome}
            options={wasteCollectorName}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}

          />
          <Surveyques
            id={"recyclableSoldIncome"}
            labelText={translate?.Recyclable_Sold_income}
            value={recyclableSoldIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"plasticRecyclableSoldIncome"}
            labelText={translate?.Plastic_Recyclable_Sold_income}
            value={plasticRecyclableSoldIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"incomeFromSaleOfRecyclableIncome"}
            labelText={translate?.Income_from_sale_of_recyclable_income}
            value={incomeFromSaleOfRecyclableIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"saleOfManureIncome"}
            labelText={translate?.Sale_of_Manure_income}
            value={saleOfManureIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />
          <div className={styles.btnContainer}>
            <button className={styles.submitbtn} onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
