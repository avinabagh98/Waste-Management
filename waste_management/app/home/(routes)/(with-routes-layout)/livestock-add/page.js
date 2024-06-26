"use client";

import styles from "@/app/home/(routes)/(with-routes-layout)/livestock-list/livestock.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";
import { sendRequest } from "@/api/sendRequest";

export default function Livestockpage() {

  //State variables
  const [userRole, setUserRole] = useState("");

  //form-data states
  const [supervisor, setSupervisor] = useState("");
  const [fieldStaffLivestock, setFieldStaffLivestock] = useState("");
  const [dateOfReportingLivestock, setDateOfReportingLivestock] = useState("");
  const [wardNoGPLivestock, setWardNoGPLivestock] = useState("");
  const [gp, setGp] = useState("");
  const [localityNameVillageLivestock, setLocalityNameVillageLivestock] =
    useState("");
  const [registorNumberLivestock, setRegistorNumberLivestock] = useState("");
  const [nameOfLivestockShedLivestock, setNameOfLivestockShedLivestock] =
    useState("");
  const [nameOfOwnerLivestock, setNameOfOwnerLivestock] = useState("");
  const [contactNumberLivestock, setContactNumberLivestock] = useState("");
  const [numberOfLivestockLivestock, setNumberOfLivestockLivestock] =
    useState("");
  const [typeOfLivestock, setTypeOfLivestock] = useState("");
  const [
    compostableWasteTransferredLivestock,
    setCompostableWasteTransferredLivestock,
  ] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [supervisor_id, setSupervisorId] = useState("");
  const [locality, setLocality] = useState([]);
  const [localName, setLocalName] = useState([]);
  const [localityId, setLocalityId] = useState([]);
  const [user_id, setUserId] = useState("");

  //Loading Header Data States
  // const [name, setName] = useState("");
  const [wardId, setWardId] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");
  const [token, setToken] = useState("");

  //Loader States
  const [spinner, setSpinner] = useState(false);


  //Other declarations
  const route = useRouter();
  const translate = LanguageFetcher();

  const loadingHeaderData = {
    name: "EBluesys",
    district_name: "",
    ward_id: "",
    block_name: "",
    supervisor: "",
  };

  const dropDownBody = {
    token: token,
    wardId: wardId,
  };

  const formDataLS = {
    token: token,
    supervisorName: supervisor_id,
    userid: user_id,
    dateofReporting: dateOfReportingLivestock,
    wardId: wardId,
    localityId: localityId,
    regNumber: registorNumberLivestock,
    lat: lat,
    long: long,
    nameOfLivestock: nameOfLivestockShedLivestock,
    typeOflivestock: typeOfLivestock,
    ownerName: nameOfOwnerLivestock,
    contactNumber: contactNumberLivestock,
    noOflivestock: numberOfLivestockLivestock,
    wtOfwaste: compostableWasteTransferredLivestock,
  };

  // LocalStorage Fetching
  useEffect(() => {
    localStorage.setItem("previousPath", "/home/livestock-list");
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
          setDateOfReportingLivestock(localStorage.getItem("today"));
          // setName(localStorage.getItem("name"));
          setUserId(localStorage.getItem("user_id"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setWardId(localStorage.getItem("ward_id"));
          setSupervisor(localStorage.getItem("supervisor"));
          setSupervisorId(localStorage.getItem("supervisor_id"));
          // setFieldStaffLivestock(localStorage.getItem("name"));
          setWardNoGPLivestock(localStorage.getItem("ward_id"));
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
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
      } else {
        swal("Error", "Geolocation not available", "error");
      }
    };

    geolocation();
  }, []);

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
            `Locality lists in ward ${wardId} from API ::`,
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
    if (id === "dateOfReportingLivestock") {
      setDateOfReportingLivestock(val);
    }

    if (id === "localityNameVillageLivestock") {
      let LVal = locality.filter((item) => item.village_name === val);
      let local_Selected = LVal[0].id;
      setLocalityId(local_Selected);

      setLocalityNameVillageLivestock(val);
    }

    if (id === "registorNumberLivestock") {
      setRegistorNumberLivestock(val);
    }
    if (id === "nameOfLivestockShedLivestock") {
      setNameOfLivestockShedLivestock(val);
    }
    if (id === "nameOfOwnerLivestock") {
      setNameOfOwnerLivestock(val);
    }
    if (id === "contactNumberLivestock") {
      setContactNumberLivestock(val);
    }
    if (id === "numberOfLivestockLivestock") {
      setNumberOfLivestockLivestock(val);
    }
    if (id === "compostableWasteTransferredLivestock") {
      setCompostableWasteTransferredLivestock(val);
    }
    if (id === "typeOfLivestock") {
      setTypeOfLivestock(val);
    }
    if (id === "id1") { setDate(val); }
    if (id === "id2") { setProjectName(val); }
    if (id === "id3") { setModule(val); }
    if (id === "id4") { setFunctionality(val); }
    if (id === "id5") { setWorkStatus(val); }
    if (id === "id6") { setRemarks(val); }
    if (id === "id7") { setYourOpinionOnModule(val); }
    if (id === "id8") { setName(val); }

  };

  const handleValdropdown = (id, val) => {
    if (id === "wardNoGPLivestock") {
      setWardNoGPLivestock(val);
    }
    if (id === "localityNameVillageLivestock") {
      setLocalityNameVillageLivestock(val);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let flag = false;

    for (const field in formDataLS) {
      if (formDataLS[field] === null || formDataLS[field] === "") {
        flag = true;
        break;
      }
    }
    if (flag) {
      setSpinner(false);
      swal("Error", "Please fill all the fields", "error");
    } else {
      try {
        setSpinner(true);
        console.log("LiveStock Submitted :: ", formDataLS);
        const res = await sendRequest(
          "post",
          "/livestockShed/add",
          formDataLS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 1) {
          swal("Successfully", "Livestock Added", "success");
          route.push("/home/livestock-list");
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };





  return (
    <>
      {/* //spinner */}
      {spinner ? (
        <>
          <div className={styles.spinnerContainer}>
            <img src="/svg/loader.svg" alt="loader"></img>
          </div>
        </>
      ) : null}

      {/* //Content */}
      <Header
        // userRole={userRole}
        isOffCanvasVisible={false}
        loadingdata={loadingHeaderData}
      />

      <div className={styles.container}>
        {/* //breadcrumb */}
        <div className={styles.ProjectTrackerbreadcrumb}>
          <Textparser text={"livestock-add"} />
        </div>

        {/* //Form Container */}

        <div className={styles.formcontainer}>



          {/* 
          <Surveyques
            id={"dateOfReportingLivestock"}
            type={"date"}
            labelText={translate?.Date_of_Reporting_Livestock}
            value={dateOfReportingLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />



          <SurveyDropdown
            id={"localityNameVillageLivestock"}
            labelText={translate?.Locality_Name_Village_Livestock}
            value={localityNameVillageLivestock}
            options={localName}
            required={true}
            handleVal={handleValdropdown}
          />

          <Surveyques
            id={"registorNumberLivestock"}
            type={"text"}
            labelText={translate?.Registor_Number_Livestock}
            value={registorNumberLivestock}
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
            id={"typeOfLivestock"}
            labelText={translate?.LiveStockType_Livestock}
            value={typeOfLivestock}
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
            type={"number"}
          />
          <Surveyques
            id={"numberOfLivestockLivestock"}
            labelText={translate?.Number_of_Livestock_Livestock}
            value={numberOfLivestockLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"compostableWasteTransferredLivestock"}
            labelText={translate?.Compostable_Waste_Transfarred_Livestock}
            value={compostableWasteTransferredLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          /> */}


          <div className={styles.btnContainer}>
            <button className={styles.submitbtnTracker} onClick={"#"}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
