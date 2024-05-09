"use client";

import styles from "@/app/home/(routes)/(with-routes-layout)/household-add/household.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";
import { sendRequest } from "@/api/sendRequest";
import axios from "axios";

export default function HouseholdUpdatepage() {

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

  const [mobileNo, setMobileNo] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [roadLane, setRoadLane] = useState("");
  const [homeBaseManageRat, setHomeBaseManageRat] = useState("");
  const [WGUtype, setWGUtype] = useState("");
  const [pets, setPets] = useState("");
  const [patients, setPatients] = useState("");
  const [mohallaCommitte, setMohallaCommitte] = useState("");

  //Loading Header Data States
  const [name, setName] = useState("");
  const [wardName, setWardName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [supervisor_id, setSupervisor_id] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [user_id, setUser_id] = useState("");
  const [ward_id, setWard_id] = useState("");

  const [mohalla, setMohalla] = useState("");
  const [mohallaId, setMohallaId] = useState("");
  const [mohallaName, setMohallaName] = useState([]);
  const [locality, setLocality] = useState([]);
  const [localName, setLocalName] = useState([]);
  const [localityId, setLocalityId] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [occupationName, setOccupationName] = useState([]);
  const [occupationId, setOccupationId] = useState([]);
  const [toilets, setToilets] = useState([]);
  const [toiletName, setToiletName] = useState([]);
  const [toiletId, setToiletId] = useState([]);
  const [id, setId] = useState("");
  const [spinner, setSpinner] = useState(false);

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_name: wardName,
    block_name: block_name,
    supervisor: supervisor
  };

  const dropDownBody = {
    token: token,
    wardId: ward_id,
  };

  const dropDownBody1 = {
    token: token,
  };

  const formDataHHUpdate = {
    id: id,
    token: token,
    lat: lat,
    longi: long,
    date: dateHHSurvey,
    supervisor: supervisor_id,
    numberOfChildBelow18Years: numberOfChildBelow18YearsHHSurvey,
    ownershipOfHouse: ownershipOfHouseHHSurvey,
    typeOfToilet: toiletId,
    userChargeParMonth: userChargesInRupeesPerMonthHHSurvey,
    wardNo: ward_id,
    locality: localityId,
    addaharNo: aadhaar,
    familyMembers: numberOfFamilyMembersHHSurvey,
    houseHoldName: nameOfResidentHHSurvey,
    mobileNo: mobileNo,
    ocupation: occupationId,
    ownerType: ownershipOfHouseHHSurvey,
    holdingNumber: houseNumberHHSurvey,
    roadLane: roadLane,
    homeBaseManageRat: homeBaseManageRat,
    road: roadLane,
    typeOfWGU: WGUtype,
    pets: pets,
    patients: patients,
    toiletInHouse: doYouHaveToiletInYourHouseHHSurvey,
    typeOfSegragation: typeOfSegregationHHSurvey,
    fieldStaff: user_id,
    mohallaCommitte: mohallaId,
    nameOfResident: nameOfResidentHHSurvey,
    isComposed: areYouDoingHomeCompostingHHSurvey,
    isManageGrayWater: doYouManagingGreyWaterHHSurvey,
    isKitchenGarden: areYouWillingToDoKitchenGardenInFutureHHSurvey,
    isConstructIndividual:
      areYouWillingToConstructIndividualSoakPitInFutureHHSurvey,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    localStorage.setItem("previousPath", "/home/household-list");
    try {
      async function fetchData() {

        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {

          setToken(token);
          setUserRole(localStorage.getItem("role_name"));
          setSupervisor(localStorage.getItem("supervisor"));
          //loadingHeaderData from local storage
          setId(localStorage.getItem("id"));
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setWardName(localStorage.getItem("ward_id"));
          //     setSupervisorHHSurvey(localStorage.getItem("supervisor"));
          setSupervisor_id(localStorage.getItem("supervisor_id"));
          //     setFieldStaffHHSurvey(localStorage.getItem("name"));
          setUser_id(localStorage.getItem("user_id"));
          setWardNoGPHHSurvey(localStorage.getItem("ward"));
          setWard_id(localStorage.getItem("ward_id"));
        }
      }
      fetchData();

    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  // Getting HH Survey By Id
  useEffect(() => {
    async function showData() {
      try {
        // Weekly waste collection By Id

        const res = await sendRequest(
          "post",
          "/houseHold/id",
          { token, id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Household by id response::", res);
        if (res.status === 1) {
          console.log("Household by id response::", res.data.data.list);

          //inserting data to the respected fields
          const api_response = res.data.data.list;

          setDateHHSurvey(api_response.date);
          setSupervisor_id(api_response.supervisor);
          setSupervisorHHSurvey(api_response.supervisor);
          //etSupervisorHHSurvey(localStorage.getItem("supervisor")); //supervisor
          setFieldStaffHHSurvey(api_response.user_id);
          setMobileNo(api_response.mobile_no);
          setAadhaar(api_response.addahar_no);
          setWardNoGPHHSurvey(api_response.which_word);
          setLocalityId(api_response.locality);
          setHouseNumberHHSurvey(api_response.holding_number);
          setNameOfResidentHHSurvey(api_response.house_hold_name);
          setNumberOfFamilyMembersHHSurvey(api_response.family_members);
          setNumberOfChildBelow18YearsHHSurvey(
            api_response.number_of_child_below_18_years
          );
          setRoadLane(api_response.road);
          setHomeBaseManageRat(api_response.home_base_manage_rat);
          setWGUtype(api_response.type_of_wgu);
          setPets(api_response.pets);
          setPatients(api_response.patients);
          setMohallaId(api_response.mohalla_committe); //mohalla id
          setOccupationId(api_response.ocupation); //occupation id
          setOwnershipOfHouseHHSurvey(api_response.owner_type);
          setTypeOfSegregationHHSurvey(api_response.type_of_segragation);
          setAreYouDoingHomeCompostingHHSurvey(api_response.is_composed);
          setDoYouHaveToiletInYourHouseHHSurvey(api_response.toilet_in_house);
          setToiletId(api_response.type_of_toilet); //toilet id
          setDoYouManagingGreyWaterHHSurvey(api_response.is_manage_gray_water);
          setAreYouWillingToDoKitchenGardenInFutureHHSurvey(
            api_response.is_kitchen_garden
          );
          setAreYouWillingToConstructIndividualSoakPitInFutureHHSurvey(
            api_response.is_construct_individual
          );
          setUserChargesInRupeesPerMonthHHSurvey(
            api_response.user_charge_par_month
          );
        }
      } catch (error) {
        console.log("Error at HH Survey by id::", error);
      }
    }
    showData();
  }, [token]);

  // Location Fetching
  useEffect(() => {
    const geolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(String(position.coords.latitude));
          setLong(String(position.coords.longitude));
        });
      } else {
        alert("Geolocation not available");
      }
    };

    geolocation();
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

  // Mohalla Committee List Dropdown State Update --for Update API
  useEffect(() => {
    if (mohalla.length > 0) {
      const mohallaNames = mohalla.map((mohalla) => mohalla.committee_name);
      setMohallaName(mohallaNames);

      //from ID to Name Update in dropdown
      const mohallaname = mohalla.filter((item) => item.id === mohallaId);
      setMohallaCommitte(mohallaname[0]?.committee_name);
    }
  }, [mohalla]);

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

  // Locality List Dropdown State Update --for Update API
  useEffect(() => {
    if (locality.length > 0) {
      const localityaNames = locality.map((locality) => locality.village_name);
      setLocalName(localityaNames);

      //from ID to Name Update in dropdown
      const local = locality.filter((item) => item.id === localityId);
      setLocalityNameMohallaHHSurvey(local[0]?.village_name);
    }
  }, [locality]);

  // Occupation List API Calling
  useEffect(() => {
    try {
      async function fetchOccupation() {
        const response = await sendRequest(
          "post",
          `/ocupation`,
          dropDownBody1,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log("Occpation API Response::", response.data.data.ocupation);
          setOccupations(response.data.data.ocupation);
        }
      }

      fetchOccupation();
    } catch (error) {
      console.log("Error at occupation fetching:", error);
    }
  }, [token]);

  // Occupations Dropdown State Update --for Update API
  useEffect(() => {
    if (occupations.length > 0) {
      const occupation_name = occupations.map(
        (occupation) => occupation.ocupationname
      );
      setOccupationName(occupation_name);
      //from ID to Name Update in dropdown
      const job = occupations.filter((item) => item.id === occupationId);
      setOccupationHHSurvey(job[0].ocupationname);
    }
  }, [occupations]);

  // Toilet List API Calling
  useEffect(() => {
    try {
      async function fetchToilet() {
        const response = await sendRequest(
          "post",
          `/toiletTypename`,
          dropDownBody1,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            "Toilet API Response::",
            response.data.data.toilet_type_name
          );
          setToilets(response.data.data.toilet_type_name);
        }
      }

      fetchToilet();
    } catch (error) {
      console.log("Error at toilet type fetching:", error);
    }
  }, [token]);

  // Toilet Dropdown State Update
  useEffect(() => {
    if (toilets.length > 0) {
      const toilet_name = toilets.map((toilet) => toilet.toiletTypename);
      setToiletName(toilet_name);

      //from ID to Name Update in dropdown
      const toilet = toilets.filter((item) => item.id === toiletId);
      setSelectToiletTypeHHSurvey(toilet[0].toiletTypename);
    }
  }, [toilets]);

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
      let LVal = locality.filter((item) => item.village_name === val);
      let local_Selected = LVal[0].id;
      setLocalityId(local_Selected);
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
      let oVal = occupations.filter((item) => item.ocupationname === val);
      let occupationId_Selected = oVal[0].id;
      setOccupationId(occupationId_Selected);
      setOccupationHHSurvey(val);
    }

    if (id === "selectToiletTypeHHSurvey") {
      let toiletVal = toilets.filter((item) => item.toiletTypename === val);
      let toilet_Selected = toiletVal[0].id;
      setToiletId(toilet_Selected);
      setSelectToiletTypeHHSurvey(val);
    }

    if (id === "userChargesInRupeesPerMonthHHSurvey") {
      setUserChargesInRupeesPerMonthHHSurvey(val);
    }

    if (id === "mobileNumberHHSurvey") {
      setMobileNo(val);
    }

    if (id === "aadhaarNumberHHSurvey") {
      setAadhaar(val);
    }

    if (id === "roadLane") {
      setRoadLane(val);
    }

    if (id === "homebasemanageRat") {
      setHomeBaseManageRat(val);
    }

    if (id === "wgutype") {
      setWGUtype(val);
    }

    if (id === "pets") {
      setPets(val);
    }

    if (id === "patients") {
      setPatients(val);
    }

    if (id === "mohallaCommitte") {
      let mhVal = mohalla.filter((item) => item.committee_name === val);
      let mohallaId_Selected = mhVal[0].id;
      setMohallaId(mohallaId_Selected);
      setMohallaCommitte(val);
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
  };

  const UpdateHandler = async (e) => {
    setSpinner(true);
    let flag = false;
    e.preventDefault();
    for (const field in formDataHHUpdate) {
      if (formDataHHUpdate[field] === null || formDataHHUpdate[field] === "") {
        flag = true;
        break;
      }
    }
    if (flag) {
      setSpinner(false);
      swal("Error", "Please fill all the fields", "error");
    } else {
      console.log("HH Survey Update-form Submitted::", formDataHHUpdate);
      //UPDATE API CALLING
      const res = await sendRequest(
        "post",
        "/household/Update",
        formDataHHUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 1) {
        swal("Success", "Updated Successfully", "success");
        route.push("/home/household-list");
      }
    }
  };

  return (
    <>

      {/* //Spinner */}
      {spinner ? <><div className={styles.spinnerContainer}><img src="/svg/loader.svg" alt="loader"></img></div></> : null}

      {/* //Content */}
      <Header
        userRole={userRole}
        isOffCanvasVisible={false}
        loadingdata={loadingHeaderData}
      />

      <div className={styles.container}>
        {/* //breadcrumb */}
        <div className={styles.breadcrumb}>
          <Textparser text={"Household Survey Update"} />
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

          {/* <Surveyques
            id={"supervisorHHSurvey"}
            labelText={translate?.Supervisor_HH_survey}
            value={supervisor}
            required={true}
            disabled={true}
            handleVal={(id, val) => handleVal(id, val)}
          /> */}
          {/* 
          <SurveyDropdown
            id={"fieldStaffHHSurvey"}
            labelText={translate?.Field_Staff_HH_survey}
            value={fieldStaffHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          /> */}

          {/* <Surveyques
            id={"fieldStaffHHSurvey"}
            disabled={true}
            labelText={translate?.Field_Staff_HH_survey}
            value={name}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          /> */}

          <Surveyques
            id={"mobileNumberHHSurvey"}
            labelText={"Mobile Number"}
            value={mobileNo}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"aadhaarNumberHHSurvey"}
            labelText={"Aadhaar Number"}
            value={aadhaar}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          {/* <SurveyDropdown
            id={"wardNoGPHHSurvey"}
            labelText={translate?.Ward_no_GP_HH_survey}
            value={wardNoGPHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={demoOptions}
          /> */}
          {/* 
          <Surveyques
            id={"wardNoGPHHSurvey"}
            labelText={translate?.Ward_no_GP_HH_survey}
            value={wardNoGPHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          /> */}

          <SurveyDropdown
            id={"localityNameMohallaHHSurvey"}
            labelText={translate?.Locality_Name_Mohalla_HH_survey}
            value={localityNameMohallaHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={localName}
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
            type={"number"}
          />

          <Surveyques
            id={"numberOfChildBelow18YearsHHSurvey"}
            labelText={translate?.No_of_Child_below_18_years_HH_survey}
            value={numberOfChildBelow18YearsHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"roadLane"}
            labelText={"Road Lane"}
            value={roadLane}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"roadLane"}
            labelText={"Road"}
            value={roadLane}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"homebasemanageRat"}
            labelText={"Home Base Manage Rate"}
            value={homeBaseManageRat}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"wgutype"}
            labelText={"Wgu Type"}
            value={WGUtype}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"pets"}
            labelText={"How many Pets?"}
            value={pets}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <Surveyques
            id={"patients"}
            labelText={"How many patients?"}
            value={patients}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            type={"number"}
          />

          <SurveyDropdown
            id={"mohallaCommitte"}
            labelText={"mohallaCommitte"}
            value={mohallaCommitte}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={mohallaName}
          />

          <SurveyDropdown
            id={"occupationHHSurvey"}
            labelText={translate?.Occupation_HH_survey}
            value={occupationHHSurvey}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
            options={occupationName}
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                  name="areYouDoingHomeCompostingHHSurvey"
                  value="0"
                  checked={areYouDoingHomeCompostingHHSurvey === "0"}
                  onChange={(e) => {
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
            options={toiletName}
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
                    handleRadioChange(e.target.name, e.target.value);
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
            type={"number"}
          />

          <div className={styles.btnContainer}>
            <button className={styles.submitbtn} onClick={UpdateHandler}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
