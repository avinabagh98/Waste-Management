"use client";

import styles from "./livestock.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";

export default function Livestockpage() {
  //State variables
  const [userRole, setUserRole] = useState("");





  //form-data states
  const [supervisorLivestock, setSupervisorLivestock] = useState("");
  const [fieldStaffLivestock, setFieldStaffLivestock] = useState("");
  const [dateOfReportingLivestock, setDateOfReportingLivestock] = useState("");
  const [wardNoGPLivestock, setWardNoGPLivestock] = useState("");
  const [localityNameVillageLivestock, setLocalityNameVillageLivestock] =
    useState("");
  const [registorNumberLivestock, setRegistorNumberLivestock] = useState("");
  const [nameOfLivestockShedLivestock, setNameOfLivestockShedLivestock] =
    useState("");
  const [nameOfOwnerLivestock, setNameOfOwnerLivestock] = useState("");
  const [contactNumberLivestock, setContactNumberLivestock] = useState("");
  const [numberOfLivestockLivestock, setNumberOfLivestockLivestock] =
    useState("");
  const [
    compostableWasteTransferredLivestock,
    setCompostableWasteTransferredLivestock,
  ] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  //Loading Header Data States
  const [name, setName] = useState("");
  const [wardName, setWardName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");
  const [token, setToken] = useState("");





  //Other declarations
  const route = useRouter();
  const translate = LanguageFetcher();

  const wardOptions = ["select", "1", "2"];
  const localityOptions = ["select", "1", "2"];
  const registorOptions = ["select", "1", "2"];

  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_name: wardName,
    block_name: block_name,
  };

  const formDataLS = {
    token: token,
    supervisor: supervisorLivestock,
    fieldStaff: fieldStaffLivestock,
    date_of_reporting: dateOfReportingLivestock,
    wardId: wardNoGPLivestock,
    localityId: localityNameVillageLivestock,
    regNumber: registorNumberLivestock,
    lat: lat,
    long: long,
    nameOfLivestock: nameOfLivestockShedLivestock,
    ownerName: nameOfOwnerLivestock,
    contactNumber: contactNumberLivestock,
    noOflivestock: numberOfLivestockLivestock,
    wtOfwaste: compostableWasteTransferredLivestock,
  };

  // LocalStorage Fetching
  useEffect(() => {
    // setUserRole(localStorage.getItem("role_name"));
    try {
      async function fetchData() {
        const tokeN = await localStorage.getItem("token");
        if (!tokeN) {
          route.push("/home/login");
        } else {
          setToken(tokeN);
          setUserRole(localStorage.getItem("role_name"));

          //loadingHeaderData from local storage
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setWardName(localStorage.getItem("ward_id"));
          // setSupervisorLivestock(localStorage.getItem("supervisorLivestock"));
          setFieldStaffLivestock(localStorage.getItem("name"));
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
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);

        });
      } else {
        // alert("Geolocation not available")
        setLocation(null);
      }
    };

    geolocation();
  }, []);

  // Handler Functions
  const handleVal = (id, val) => {
    if (id === "supervisorLivestock") { setSupervisorLivestock(val); }
    if (id === "fieldStaffLivestock") { setFieldStaffLivestock(val); }
    if (id === "dateOfReportingLivestock") { setDateOfReportingLivestock(val); }
    if (id === "wardNoGPLivestock") { setWardNoGPLivestock(val); }
    if (id === "localityNameVillageLivestock") { setLocalityNameVillageLivestock(val); }
    if (id === "registorNumberLivestock") { setRegistorNumberLivestock(val); }
    if (id === "nameOfLivestockShedLivestock") { setNameOfLivestockShedLivestock(val); }
    if (id === "nameOfOwnerLivestock") { setNameOfOwnerLivestock(val); }
    if (id === "contactNumberLivestock") { setContactNumberLivestock(val); }
    if (id === "numberOfLivestockLivestock") { setNumberOfLivestockLivestock(val); }
    if (id === "compostableWasteTransferredLivestock") { setCompostableWasteTransferredLivestock(val); }

  };

  const handleValdropdown = (id, val) => {
    if (id === "wardNoGPLivestock") {
      setWardNoGPLivestock(val);
    }
    if (id === "localityNameVillageLivestock") {
      setLocalityNameVillageLivestock(val);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formDataLS);
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
          <Textparser text={"Livestock List"} />
        </div>

        {/* //Form Container */}

        <div className={styles.formcontainer}>
          <Surveyques
            id={"supervisorLivestock"}
            labelText={translate?.Supervisor_Livestock}
            value={supervisorLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}

          />

          <Surveyques
            id={"fieldStaffLivestock"}
            labelText={translate?.Field_staff_Livestock}
            value={fieldStaffLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            disabled={true}
          />

          <Surveyques
            id={"dateOfReportingLivestock"}
            type={"date"}
            labelText={translate?.Date_of_Reporting_Livestock}
            value={dateOfReportingLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <SurveyDropdown
            id={"wardNoGPLivestock"}
            labelText={translate?.Ward_No_Livestock}
            options={wardOptions}
            value={wardNoGPLivestock}
            required={true}
            handleVal={handleValdropdown}
          />

          <SurveyDropdown
            id={"localityNameVillageLivestock"}
            labelText={translate?.Locality_Name_Village_Livestock}
            value={localityNameVillageLivestock}
            options={localityOptions}
            required={true}
            handleVal={handleValdropdown}
          />


          <Surveyques
            id={"registorNumberLivestock"}
            type={"text"}
            labelText={translate?.Registor_Number_Livestock}
            value={dateOfReportingLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"nameOfLivestockShedLivestock"}
            labelText={translate?.Name_of_Livestock_Shed_Livestock}
            value={nameOfLivestockShedLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"nameOfOwnerLivestock"}
            labelText={translate?.Name_of_Owner_Livestock}
            value={nameOfOwnerLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"contactNumberLivestock"}
            labelText={translate?.Contact_Number_Livestock}
            value={contactNumberLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"numberOfLivestockLivestock"}
            labelText={translate?.Number_of_Livestock_Livestock}
            value={numberOfLivestockLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"compostableWasteTransferredLivestock"}
            labelText={translate?.Compostable_Waste_Transfarred_Livestock}
            value={compostableWasteTransferredLivestock}
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
