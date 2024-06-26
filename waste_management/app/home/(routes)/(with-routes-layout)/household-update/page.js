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
  const [gp, setGp] = useState("");
  const [pets, setPets] = useState("");
  const [caste, setCaste] = useState("");
  const [today, setToday] = useState("");
  const [idType, setIdType] = useState("");
  const [WGUtype, setWGUtype] = useState("");
  const [wantTOPay, setWantTOPay] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [roadLane, setRoadLane] = useState("");
  const [roadLane2, setRoadLane2] = useState("");
  const [patients, setPatients] = useState("");
  const [religion, setReligion] = useState("");
  const [hasPets, setHasPets] = useState("");
  const [houseOwner, setHouseOwner] = useState("");
  const [hasPatients, setHasPatients] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [societyName, setSocietyName] = useState("");
  const [wasteGenerated, setWasteGenerated] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [mohallaCommitte, setMohallaCommitte] = useState("");
  const [WillingToDoManage, setWillingToDoManage] = useState("");
  const [supervisorHHSurvey, setSupervisorHHSurvey] = useState("");
  const [fieldStaffHHSurvey, setFieldStaffHHSurvey] = useState("");
  const [dateHHSurvey, setDateHHSurvey] = useState("");
  const [occupationHHSurvey, setOccupationHHSurvey] = useState("");
  const [homeBaseManageRat, setHomeBaseManageRat] = useState("");
  const [wardNoGPHHSurvey, setWardNoGPHHSurvey] = useState("");
  const [natureOfHousehold, setNatureOfHousehold] = useState("1");
  const [houseNumberHHSurvey, setHouseNumberHHSurvey] = useState("");
  const [nameOfResidentHHSurvey, setNameOfResidentHHSurvey] = useState("");
  const [typeOfSegregationHHSurvey, setTypeOfSegregationHHSurvey] = useState("");
  const [ownershipOfHouseHHSurvey, setOwnershipOfHouseHHSurvey] = useState("");
  const [doYouHaveToiletInYourHouseHHSurvey, setDoYouHaveToiletInYourHouseHHSurvey] = useState("");
  const [doYouManagingGreyWaterHHSurvey, setDoYouManagingGreyWaterHHSurvey] = useState("");
  const [doYouManagingBlackWaterHHSurvey, setDoYouManagingBlackWaterHHSurvey] = useState("");
  const [numberOfFamilyMembersHHSurvey, setNumberOfFamilyMembersHHSurvey] = useState("");
  const [numberOfChildBelow18YearsHHSurvey, setNumberOfChildBelow18YearsHHSurvey] = useState("");
  const [areYouDoingHomeCompostingHHSurvey, setAreYouDoingHomeCompostingHHSurvey] = useState("");
  const [localityNameMohallaHHSurvey, setLocalityNameMohallaHHSurvey] = useState("");
  const [selectToiletTypeHHSurvey, setSelectToiletTypeHHSurvey] = useState("");
  const [areYouWillingToDoKitchenGardenInFutureHHSurvey, setAreYouWillingToDoKitchenGardenInFutureHHSurvey] = useState("");
  const [areYouWillingToConstructIndividualSoakPitInFutureHHSurvey, setAreYouWillingToConstructIndividualSoakPitInFutureHHSurvey] = useState("");
  const [userChargesInRupeesPerMonthHHSurvey, setUserChargesInRupeesPerMonthHHSurvey] = useState("");




  //Loading Header Data States
  const [name, setName] = useState("");
  const [wardName, setWardName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [block_name, setBLockName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [supervisor_id, setSupervisor_id] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [user_id, setUser_id] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [block_id, setBlock_id] = useState("");

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

  ///////////////////////////////////////////*************************************************/////////////////////////////
  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: gp,
    block_name: block_name,
    supervisor: supervisor,
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

  const commonObj = {
    //common section
    token: token,
    lat: lat,
    longi: long,
    date: dateHHSurvey, //changed for multistoried
    supervisor: supervisor_id, //off for multistoried
    fieldStaff: user_id,
    gp: ward_id,
    block: block_id,
    district: districtId,
    state: "8",
    locality: localityId, //+24/6 -modified
  };


  const houseObj = {
    typeOfWGU:
      WGUtype === "household"
        ? "1"
        : WGUtype === "shop"
          ? "2"
          : WGUtype === "market"
            ? "3"
            : WGUtype === "institution"
              ? "4"
              : "",
    natureOfHouse: natureOfHousehold ?? "-1",
    numberOfChildBelow18Years: numberOfChildBelow18YearsHHSurvey,
    ownershipOfHouse: ownershipOfHouseHHSurvey ?? "-1",
    typeOfToilet: toiletId ?? "-1",
    userChargeParMonth: userChargesInRupeesPerMonthHHSurvey ?? "-1",
    addaharNo: "-1", //duplicate
    familyMembers: numberOfFamilyMembersHHSurvey ?? "-1",
    houseHoldName: nameOfResidentHHSurvey ?? "-1",
    mobileNo: mobileNo ?? "-1",
    ocupation: occupationHHSurvey ?? "-1",
    ownerType: ownershipOfHouseHHSurvey ?? "-1", //duplicate
    holdingNumber: houseNumberHHSurvey ?? "-1",
    road_lane: roadLane ?? "-1",
    road: roadLane2 ?? "-1",
    homeBaseManageRat: "-1", //need to omit
    pets: pets ?? "-1",
    patients: patients ?? "-1",
    toiletInHouse: doYouHaveToiletInYourHouseHHSurvey ?? "-1",
    typeOfSegragation: typeOfSegregationHHSurvey ?? "-1",
    nameOfResident: societyName ?? "-1",
    isComposed: areYouDoingHomeCompostingHHSurvey ?? "-1",
    isManageGrayWater: doYouManagingGreyWaterHHSurvey ?? "-1",
    isManagingBlackWater: doYouManagingBlackWaterHHSurvey ?? "-1",
    isKitchenGarden: areYouWillingToDoKitchenGardenInFutureHHSurvey ?? "-1",
    isConstructIndividual:
      areYouWillingToConstructIndividualSoakPitInFutureHHSurvey ?? "-1",
    road_lane: "-1", //duplicate
    amountOfWasteGeneration: wasteGenerated ?? "-1",
    willingToManageByOwn: WillingToDoManage ?? "-1",
    willWantToPay: wantTOPay ?? "-1",
    caste: caste ?? "-1",
    religion: religion ?? "-1",
    selectTypeOfId: idType ?? "-1",
    identificationNumber: idCardNumber ?? "-1",
    howManyAnimal: "-1", //duplicate
    howManyPatient: "-1", //duplicate
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  ///////////////////////////////////////////*************************************************/////////////////////////////
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
          setBlock_id(localStorage.getItem("block_id"));
          setDistrictId(localStorage.getItem("district_id"));

          setWardName(localStorage.getItem("ward_id"));
          //setSupervisorHHSurvey(localStorage.getItem("supervisor"));
          setSupervisor_id(localStorage.getItem("supervisor_id"));
          //setFieldStaffHHSurvey(localStorage.getItem("name"));
          setUser_id(localStorage.getItem("user_id"));
          setWardNoGPHHSurvey(localStorage.getItem("ward"));
          setWard_id(localStorage.getItem("ward_id"));
          setGp(localStorage.getItem("gp"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  // Getting HH Survey By Id - Already filled Response
  useEffect(() => {
    setToday(localStorage.getItem("today"));
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
          setDateHHSurvey(today);
          setWGUtype(api_response.type_of_wgu == "1" ? "household" :
            api_response.type_of_wgu == "2" ? "shop" :
              api_response.type_of_wgu == "3" ? "market" :
                api_response.type_of_wgu == "4" ? "institution" : ""
          );
          setRoadLane2(api_response.road_lane);
          setSupervisor_id(api_response.supervisor);
          setSupervisorHHSurvey(api_response.supervisor);
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
          //Pets
          api_response.pets == "-1" ? setHasPets("0") : setHasPets('1')
          api_response.pets != "-1" ? setPets(api_response.pets) : setPets("-1");
          //Patients
          api_response.patients == "-1" ? setHasPatients("0") : setHasPatients('1')
          api_response.patients != "-1" ? setPatients(api_response.patients) : setPatients("-1");
          setHouseOwner(api_response.name_of_owner);
          setCaste(api_response.caste);
          setReligion(api_response.religion);
          setIdType(api_response.select_type_of_id);
          setIdCardNumber(api_response.identification_number);
          setWasteGenerated(api_response.amount_of_waste_generation);
          setWillingToDoManage(api_response.willing_to_manage_by_own);
          setWantTOPay(api_response.will_want_to_pay);
          setOccupationHHSurvey(api_response.ocupation); //occupation id
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


  // Dropdown-Options List API Calling
  useEffect(() => {
    try {
      async function fetchMohalla() {
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

      async function fetchLocality() {
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
          localStorage.setItem("LocalityList", JSON.stringify(response.data.data.incomeList));
        }
      }


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
          console.log(
            "Occpation API Response::",
            response.data.data.occupations
          );
          setOccupations(response.data.data.ocupation);
        }
      }

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
      fetchMohalla();
      fetchLocality();
      fetchOccupation();
    } catch (error) {
      console.log("Error at dropdown fetching:", error);
    }
  }, [token]);

  // Dropdown-Options State Update
  useEffect(() => {
    if (occupations.length > 0) {
      const occupation_name = occupations.map(
        (occupation) => occupation.ocupationname
      );
      setOccupationName(occupation_name);
      setOccupationId(occupations[0]?.id);
    }

    if (toilets.length > 0) {
      const toilet_name = toilets.map((toilet) => toilet.toiletTypename);
      setToiletName(toilet_name);
      setToiletId(toilets[0].id);
    }

    // if (mohalla.length > 0) {
    //   const mohallaNames = mohalla.map((mohalla) => mohalla.committee_name);
    //   setMohallaName(mohallaNames);
    //   setMohallaId(mohalla[0].id);
    // }

    if (locality.length > 0) {
      const localityaNames = locality?.map((locality) => locality.village_name);
      setLocalName(localityaNames);
      setLocalityId(locality[0].id);
    }
  }, [occupations, toilets, locality]);

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

  ///////////////////////////////////////////*************************************************/////////////////////////////
  const formDataFunc = (commonObj, paramObj) => {
    const formData = { ...commonObj, ...paramObj };
    return formData;
  };


  ///////////////////////////////////////////*************************************************/////////////////////////////
  const AddNewSubmitHandler = async (e, token, object1, object2) => {
    e.preventDefault();
    try {
      if (WGUtype === "household") {
        await multiStoriedAddNew({
          token: token,
          commonObj: object1,
          paramObj: object2,
        }).then((response) => {
          if (response === "success") {
            handleClosePopup();
            const randomNumber = getRandomInt(1, 100);
            setLiveDataFlag(randomNumber);
          }
        });
      }

      if (WGUtype === "shop") {
        await marketAdd({
          token: token,
          commonObj: object1,
          paramObj: object2,
        }).then((response) => {
          if (response === "success") {
            handleClosePopup();
            const randomNumber = getRandomInt(1, 100);
            setLiveDataFlag(randomNumber);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewClick = () => {
    setShowPopup(true);
    setNewSociety("");
    setKeyPerson("");
    setKeyPersonContact("");
    setMarketName("");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const handleVal = (id, val) => {
    //Household
    if (id == "wasteGenerated") {
      setWasteGenerated(val);
    }
    if (id === "casteHHSurvey") {
      setCaste(val);
    }
    if (id === "religionHHSurvey") {
      setReligion(val);
    }
    if (id === "natureOfHousehold") {
      val === "Individual"
        ? setNatureOfHousehold("1")
        : val === "Multi Storied"
          ? setNatureOfHousehold("2")
          : val === "Housing Society"
            ? setNatureOfHousehold("3")
            : setNatureOfHousehold("");
    }

    if (id === "nameOfSociety") {
      setSocietyName(val);
      console.log(societies);
      let key_person = societies.filter((item) => item.society_name === val);
      setKeyPerson(key_person[0].key_person);
    }

    if (id === "addNewNameOfSociety") {
      setNewSociety(val);
    }
    if (id === "keyPerson") {
      setKeyPerson(val);
    }

    if (id === "keyPersonContact") {
      setKeyPersonContact(val);
    }

    if (id === "WillingToDoManage") {
      val === "yes" ? setWillingToDoManage("1") : setWillingToDoManage("0");
    }
    if (id === "dateHHSurvey") {
      setDateHHSurvey(val);
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
    if (id === "nameOfResidentOwnerHHSurvey") {
      setHouseOwner(val);
    }

    if (id === "numberOfFamilyMembersHHSurvey") {
      setNumberOfFamilyMembersHHSurvey(val);
    }

    if (id === "numberOfChildBelow18YearsHHSurvey") {
      setNumberOfChildBelow18YearsHHSurvey(val);
    }

    if (id === "hasPets") {
      if (val === "yes") {
        setHasPets("1");
      }
      if (val === "no") {
        setHasPets("0");
      }
    }

    if (id === "hasPatient") {
      if (val === "yes") {
        setHasPatients("1");
      }
      if (val === "no") {
        setHasPatients("0");
      }
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

    if (id === "identificationNumberHHSurvey") {
      setIdCardNumber(val);
    }

    if (id === "idTypeHHSurvey") {
      setIdType(val);
    }

    if (id === "roadLane") {
      setRoadLane(val);
    }

    if (id === "roadLane2") {
      setRoadLane2(val);
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

    if (id === "ownershipOfHouseHHSurvey") {
      val === "Own"
        ? setOwnershipOfHouseHHSurvey("1")
        : setOwnershipOfHouseHHSurvey("0");
    }

    if (id === "wantTOPay") {
      val === "Yes" ? setWantTOPay("1") : val === "No" ? setWantTOPay("0") : "";
    }

    //Shop
    if (id === "typeOfShop") {
      val === "Grocery"
        ? setTypeOfShop("1")
        : val === "Food"
          ? setTypeOfShop("2")
          : val === "Vegetables"
            ? setTypeOfShop("3")
            : val === "Resturant"
              ? setTypeOfShop("4")
              : val === "Fish"
                ? setTypeOfShop("5")
                : val === "Meat"
                  ? setTypeOfShop("6")
                  : "";
    }

    if (id === "shopLocated") {
      val === "Para"
        ? setShopLocated("1")
        : val === "Market"
          ? setShopLocated("2")
          : setShopLocated("");
    }

    // if (id === "marketName") {
    //   console.log("at handle val data_arr", data_marketArr); //testing
    //   let marketid = idFetcher({
    //     matchingParam: val,
    //     mainDataArr: data_marketArr,
    //   });
    //   setMarketName(marketid);
    // }

    if (id === "sansadNoShop") {
      val === "Itahar Sansad"
        ? setSansadNo("1")
        : val === "Raj Sansad"
          ? setSansadNo("2")
          : "";
    }

    if (id === "shopName") {
      setShopName(val);
    }

    if (id === "ShopOwner") {
      setShopOwner(val);
    }

    if (id === "contactShop") {
      setMobileShop(val);
    }

    if (id === "dailyWasteManage") {
      val === "Dumping"
        ? setDailyWasteManage("1")
        : val === "Throwing"
          ? setDailyWasteManage("2")
          : val === "Burned"
            ? setDailyWasteManage("3")
            : "";
    }

    if (id === "willingToGiveWasteShop") {
      if (val === "Yes") {
        setWillingToGiveWasteShop("1");
      }
      if (val === "No") {
        setWillingToGiveWasteShop("0");
        setWillingToPayGpShop("-1");
      }
    }
    if (id === "willingToPayGpShop") {
      if (val === "Yes") {
        setWillingToPayGpShop("1");
      }
      if (val === "No") {
        setWillingToPayGpShop("0");
      }
    }

    if (id === "nonBioDegradableWasteShop") {
      setNonBioWasteShop(val);
    }

    if (id === "bioDegradableWasteShop") {
      setBioWasteShop(val);
    }

    //Market
    if (id === "marketName") {
      console.log("at handle val data_arr", data_marketArr);
      let marketid = idFetcher({
        matchingParam: val,
        mainDataArr: data_marketArr,
      });
      setMarketid(marketid);
      setMarketName(val);
    }

    if (id === "typeofMarket") {
      val === "Hat"
        ? settypeofMarket("1")
        : val === "Market"
          ? settypeofMarket("2")
          : val === "MultiComplex"
            ? settypeofMarket("3")
            : val === "Others"
              ? settypeofMarket("4")
              : "";
    }

    if (id === "sansadNoMarket") {
      val === "Itahar Sansad"
        ? setSansadNo("1")
        : val === "Raj Sansad"
          ? setSansadNo("2")
          : "";
    }

    if (id === "marketCommitteePresence") {
      val === "Yes"
        ? setIsmarketCommitteePresence("1")
        : val === "No"
          ? setIsmarketCommitteePresence("0")
          : "";
    }

    if (id === "willingToGiveWasteMarket") {
      if (val === "Yes") {
        setWillingToGiveWasteMarket("1");
      }
      if (val === "No") {
        setWillingToGiveWasteMarket("0");
      }
    }

    if (id === "willingToPayGpMarket") {
      if (val === "Yes") {
        setWillingToPayGpMarket("1");
      }
      if (val === "No") {
        setWillingToPayGpMarket("0");
      }
    }

    if (id === "numberOfshops") {
      setNumberOfshops(val);
    }

    if (id === "numberOfGroceries") {
      setNumberOfGroceries(val);
    }

    if (id === "numberOfFoodShops") {
      setNumberOfFoodShops(val);
    } else if (id === "numberOfVegetables") {
      setNumberOfVegetables(val);
    } else if (id === "numberOfResturants") {
      setNumberOfResturants(val);
    } else if (id === "numberOfHotels") {
      setNumberOfHotels(val);
    } else if (id === "numberOfMeatShop") {
      setNumberOfMeatShop(val);
    } else if (id === "numberOfFishShops") {
      setNumberOfFishShops(val);
    } else if (id === "numberOfOtherShops") {
      setNumberOfOtherShops(val);
    } else if (id === "wasteGenMarket") {
      setWasteGenMarket(val);
    } else if (id === "bioDegradableWasteMarket") {
      setBioDegradableWasteMarket(val);
    } else if (id === "nonBioDegradableWasteMarket") {
      setNonBioDegradableWasteMarket(val);
    } else if (id === "hazardousWasteMarket") {
      setHazardousWasteMarket(val);
    }

    if (id === "dailyWasteManageMarket") {
      setDailyWasteManageMarket(val);
    }

    //Institution

    if (id === "sansadNoInstitution") {
      val === "Itahar Sansad"
        ? setSansadNo("1")
        : val === "Raj Sansad"
          ? setSansadNo("2")
          : "";
    }
    if (id === "sanataryWaste") {
      setSanatartyWasteInstitute(val);
    }

    if (id === "typeOfInstitution") {
      setTypeOfInstitution(val);
    }

    if (id === "isMidDayMeal") {
      if (val === "Yes") {
        setIsMidDayMeal("1");
      }
      if (val === "No") {
        setIsMidDayMeal("0");
      }
    }

    if (id === "WillingToDoManageWasteInstitute") {
      if (val === "Yes") {
        setWillingToDoManageWasteInstitute("1");
      }
      if (val === "No") {
        setWillingToDoManageWasteInstitute("0");
      }
    }

    if (id === "hasGarden") {
      if (val === "Yes") {
        setHasGarden("1");
      }
      if (val === "No") {
        setHasGarden("0");
      }
    }

    if (id === "willingToPayGpInstitute") {
      if (val === "Yes") {
        setWillingToPayGpInstitute("1");
      }
      if (val === "No") {
        setWillingToPayGpInstitute("0");
      }
    }

    if (id === "dailyWasteManageInstitute") {
      setDailyWasteManageInstitute(val);
    }

    if (id === "willingToGiveWasteInstitute") {
      if (val === "Yes") {
        setWillingToGiveWasteInstitute("1");
      }
      if (val === "No") {
        setWillingToGiveWasteInstitute("0");
      }
    }

    if (id === "willingToPayGpInstitute") {
      if (val === "Yes") {
        setWillingToPayGpInstitute("1");
      }
      if (val === "No") {
        setWillingToPayGpInstitute("0");
      }
    }

    if (id === "nameOfInstitution") {
      setNameOfInstitution(val);
    }

    if (id === "numberOfStudents") {
      setNumberOfStudents(val);
    }

    if (id === "numberOfBoys") {
      setNumberOfBoys(val);
    }

    if (id === "numberOfGirls") {
      setNumberOfGirls(val);
    }

    if (id === "numberOfDailyWasteGen") {
      setNumberOfDailyWasteGen(val);
    }

    if (id === "bioDegradableWasteInstitute") {
      setBioDegradableWasteInstitute(val);
    }

    if (id === "nonBioDegradableWasteInstitute") {
      setNonBioDegradableWasteInstitute(val);
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
    e.preventDefault();

    try {
      let flag = false;
      let formDataObject;

      //Creating WGUType wise API Body
      if (WGUtype === "household") {
        formDataObject = formDataFunc(commonObj, houseObj);
        console.log("HouseHold Survey Form Submitted :: ", formDataObject);
      }
      if (WGUtype === "shop") {
        formDataObject = formDataFunc(commonObj, shopObj);
        console.log("Shop Survey Form Submitted :: ", formDataObject);
      }
      if (WGUtype === "institution") {
        formDataObject = formDataFunc(commonObj, instituteObj);
        console.log("Instituion Survey Form Submitted :: ", formDataObject);
      }

      if (WGUtype === "market") {
        formDataObject = formDataFunc(commonObj, marketObj);
        console.log("Market Survey Form Submitted :: ", formDataObject);
      }

      for (const field in formDataObject) {
        //Add Mandatory Field from here
        if (formDataObject[field] === null || formDataObject[field] === "") {
          // flag = true;
          // break;

          // Household mandatory field
          // if ((field === "typeOfWGU" || field === "natureOfHouse" || field === "numberOfChildBelow18Years" || field === "ownershipOfHouse" || field === "typeOfToilet" || field === "userChargeParMonth" || field === "familyMembers" || field === "houseHoldName" || field === "mobileNo" || field === "ocupation" || field === "ownerType" || field === "holdingNumber" || field === "roadLane" || field === "road" || field === "pets" || field === "patients" || field === "toiletInHouse" || field === "typeOfSegragation" || field === "isComposed" || field === "isManageGrayWater" || field === "isManagingBlackWater" || field === "isKitchenGarden" || field === "isConstructIndividual" || field === "amountOfWasteGeneration" || field === "willingToManageByOwn" || field === "willWantToPay" || field === "caste" || field === "religion") && WGUtype === "household") {
          //   flag = true;
          // }

          // Shop mandatory field
          // if ((field === "typeOfWGU") && WGUtype === "shop") {
          //   flag = true;
          // }
          formDataObject[field] = "-1";
        }
      }
      if (flag) {
        swal("Warning", "Please fill all the fields", "warning");
      } else {
        setSpinner(true);
        const household_add_res = await axios.post(
          "https://waste.ebluesys.com/api/household/Insert",
          formDataObject,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Household Add Response", household_add_res); //testing
        if (household_add_res.data.data.status === "success") {
          swal("Success", "Data Added Successfully", "success");
          console.log("Household Survey Response", household_add_res);
          route.push("/home/household-list");
        }
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
      if (error.name === "AxiosError") {
        swal("Error", "Something went wrong during API call", "error");
      }
    }
  };

  ///////////////////////////////////////////*************************************************/////////////////////////////
  return (
    <>
      {/* //Spinner */}
      {spinner ? (
        <>
          <div className={styles.spinnerContainer}>
            <img src="/svg/loader.svg" alt="loader"></img>
          </div>
        </>
      ) : null}

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
          <div className={styles.quescontainer}>
            <Surveyques
              id={"dateHHSurvey"}
              type={"date"}
              labelText={translate?.Date_HH_survey}
              value={dateHHSurvey}
              defaultValue={today}
              required={true}
              handleVal={(id, val) => handleVal(id, val)}
            />

            <SurveyDropdown
              id={"wgutype"}
              labelText={translate?.WguType_HH_survey}
              value={WGUtype}
              required={true}
              handleVal={(id, val) => handleVal(id, val)}
              options={["select", "household", "shop", "institution", "market"]}
            />
          </div>

          {/* //Type of WGU */}

          {WGUtype === "household" ? (
            <>
              {/* //Household Information */}
              <div className={styles.householdInfoContainer}>
                {/* //Add New Market and Society */}
                <div className={styles.householdInfoHeading}>
                  <Textparser
                    text={translate?.householdInfoHeading_HH_survey}
                  />
                  {natureOfHousehold === "2" || natureOfHousehold === "3" ? (
                    <div className={styles.addNewSocietyContainer}>
                      <img
                        src="/svg/add_new.svg"
                        alt="add_new"
                        onClick={() => {
                          // setSpinner(true);
                          handleAddNewClick();
                        }}
                      ></img>
                      <p>
                        {natureOfHousehold === "2"
                          ? translate?.addNewMultiStoried_HH_survey
                          : natureOfHousehold === "3"
                            ? translate?.addNewSociety_HH_survey
                            : null}
                      </p>
                    </div>
                  ) : null}

                  {showPopup && (
                    <div className={styles.popupOverlay}>
                      <div className={styles.popupContainer}>
                        <button
                          className={styles.closeButton}
                          onClick={handleClosePopup}
                        >
                          <img src="/svg/close.svg"></img>
                        </button>
                        <h3>
                          {natureOfHousehold === "3"
                            ? translate?.Add_Society_HH_survey
                            : natureOfHousehold === "2"
                              ? translate?.addNewMultiStoried_HH_survey
                              : ""}
                        </h3>
                        <div>
                          <Surveyques
                            id={"addNewNameOfSociety"}
                            type={"text"}
                            labelText={
                              natureOfHousehold === "3"
                                ? translate?.Societyname_HH_survey
                                : natureOfHousehold === "2"
                                  ? translate?.Multistoriedname_HH_survey
                                  : ""
                            }
                            value={newSociety}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                          />

                          <Surveyques
                            id={"keyPerson"}
                            type={"text"}
                            labelText={translate?.keyPerson_HH_survey}
                            value={keyPerson}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                          />

                          <Surveyques
                            id={"keyPersonContact"}
                            type={"number"}
                            labelText={translate?.keyPersonContact_HH_survey}
                            value={keyPersonContact}
                            // required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                          />

                          <div
                            className={styles.societySubmitBtn}
                            onClick={(e) => {
                              console.log(
                                "multistoried at button",
                                multiStoriedAddNewObj
                              );
                              AddNewSubmitHandler(
                                e,
                                token,
                                commonOtherObj,
                                multiStoriedAddNewObj
                              );
                            }}
                          >
                            {natureOfHousehold === "3"
                              ? translate?.addNewSociety_HH_survey
                              : natureOfHousehold === "2"
                                ? translate?.addNewMultiStoried_HH_survey
                                : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <SurveyDropdown
                  id={"natureOfHousehold"}
                  labelText={translate?.natureOfHouseholds_HH_survey}
                  value={
                    natureOfHousehold === "1"
                      ? "Individual"
                      : natureOfHousehold === "2"
                        ? "Multi Storied"
                        : natureOfHousehold === "3"
                          ? "Housing Society"
                          : ""
                  }
                  handleVal={(id, val) => handleVal(id, val)}
                  options={[
                    "Select",
                    "Individual",
                    "Multi Storied",
                    "Housing Society",
                  ]}
                />

                {natureOfHousehold === "1" ? (
                  <>
                    <SurveyDropdown
                      id={"ownershipOfHouseHHSurvey"}
                      labelText={translate?.Ownership_of_House_HH_survey}
                      value={ownershipOfHouseHHSurvey === "1" ? "Own" : "Rent"}
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["Own", "Rent"]}
                    />
                    <Surveyques
                      id={"houseNumberHHSurvey"}
                      labelText={translate?.House_Number_HH_survey}
                      value={houseNumberHHSurvey}
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
                      labelText={
                        translate?.No_of_Child_below_18_years_HH_survey
                      }
                      value={numberOfChildBelow18YearsHHSurvey}
                      required={true}
                      handleVal={(id, val) => handleVal(id, val)}
                      type={"number"}
                    />
                    <Surveyques
                      id={"roadLane"}
                      labelText={"Address Line 1"}
                      value={roadLane}
                      handleVal={(id, val) => handleVal(id, val)}
                      type={"text"}
                    />

                    <Surveyques
                      id={"roadLane2"}
                      labelText={"Address Line 2"}
                      value={roadLane2}
                      handleVal={(id, val) => handleVal(id, val)}
                      type={"text"}
                    />

                    <SurveyDropdown
                      id={"hasPets"}
                      labelText={"Has any Domestic Animal?"}
                      value={
                        hasPets === "0"
                          ? "no"
                          : hasPets === "1"
                            ? "yes"
                            : "select"
                      }
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["select", "yes", "no"]}
                    />
                    {hasPets === "1" ? (
                      <Surveyques
                        id={"pets"}
                        labelText={"How many domestic animal?"}
                        value={pets}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"number"}
                      />
                    ) : null}
                    <SurveyDropdown
                      id={"hasPatient"}
                      labelText={"Has patient?"}
                      value={
                        hasPatients === "0"
                          ? "no"
                          : hasPatients === "1"
                            ? "yes"
                            : "select"
                      }
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["select", "yes", "no"]}
                    />
                    {hasPatients === "1" ? (
                      <Surveyques
                        id={"patients"}
                        labelText={" How Many patients?"}
                        value={patients}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"number"}
                      />
                    ) : null}
                  </>
                ) : natureOfHousehold === "2" || natureOfHousehold === "3" ? (
                  <>
                    <SurveyDropdown
                      id={"nameOfSociety"}
                      labelText={
                        natureOfHousehold === "3"
                          ? translate?.Societyname_HH_survey
                          : natureOfHousehold === "2"
                            ? translate?.Multistoriedname_HH_survey
                            : ""
                      }
                      value={societyName}
                      handleVal={(id, val) => handleVal(id, val)}
                      options={societyOptions}
                    />

                    <Surveyques
                      id={"keyPerson"}
                      labelText={translate?.keyPerson_HH_survey}
                      value={keyPerson}
                      handleVal={(id, val) => handleVal(id, val)}
                      disabled={true}
                    />

                    <SurveyDropdown
                      id={"ownershipOfHouseHHSurvey"}
                      labelText={translate?.Ownership_of_House_HH_survey}
                      value={ownershipOfHouseHHSurvey === "1" ? "Own" : "Rent"}
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["Own", "Rent"]}
                    />

                    <Surveyques
                      id={"nameOfResidentHHSurvey"}
                      labelText={translate?.Name_of_Resident_HH_survey}
                      value={nameOfResidentHHSurvey}
                      required={true}
                      handleVal={(id, val) => handleVal(id, val)}
                    />

                    <Surveyques
                      id={"houseNumberHHSurvey"}
                      labelText={translate?.House_Number_HH_survey}
                      value={houseNumberHHSurvey}
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
                      labelText={
                        translate?.No_of_Child_below_18_years_HH_survey
                      }
                      value={numberOfChildBelow18YearsHHSurvey}
                      required={true}
                      handleVal={(id, val) => handleVal(id, val)}
                      type={"number"}
                    />
                    <Surveyques
                      id={"roadLane"}
                      labelText={"Address Line 1"}
                      value={roadLane}
                      handleVal={(id, val) => handleVal(id, val)}
                      type={"text"}
                    />
                    <Surveyques
                      id={"roadLane2"}
                      labelText={"Address Line 2"}
                      value={roadLane2}
                      handleVal={(id, val) => handleVal(id, val)}
                      type={"text"}
                    />
                    <SurveyDropdown
                      id={"hasPets"}
                      labelText={"Has any Domestic Animal?"}
                      value={
                        hasPets === "0"
                          ? "no"
                          : hasPets === "1"
                            ? "yes"
                            : "select"
                      }
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["select", "yes", "no"]}
                    />
                    {hasPets === "1" ? (
                      <Surveyques
                        id={"pets"}
                        labelText={"How many domestic animal?"}
                        value={pets}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"number"}
                      />
                    ) : null}
                    <SurveyDropdown
                      id={"hasPatient"}
                      labelText={"Has patient?"}
                      value={
                        hasPatients === "0"
                          ? "no"
                          : hasPatients === "1"
                            ? "yes"
                            : "select"
                      }
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["select", "yes", "no"]}
                    />
                    {hasPatients === "1" ? (
                      <Surveyques
                        id={"patients"}
                        labelText={" How Many patients?"}
                        value={patients}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"number"}
                      />
                    ) : null}
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* //Personal Information */}
              <div className={styles.personalInfoContainer}>
                <div className={styles.personalInfoHeading}>
                  <Textparser text={"Personal Information"} />
                </div>
                <Surveyques
                  id={"nameOfResidentOwnerHHSurvey"}
                  labelText={translate?.Name_of_ResidentOwner_HH_survey}
                  value={houseOwner}
                  type={"text"}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                />

                <Surveyques
                  id={"mobileNumberHHSurvey"}
                  type={"number"}
                  labelText={"Mobile Number"}
                  value={mobileNo}
                  handleVal={(id, val) => handleVal(id, val)}
                />

                <Surveyques
                  id={"casteHHSurvey"}
                  type={"text"}
                  labelText={translate?.Caste_HH_survey}
                  value={caste}
                  handleVal={(id, val) => handleVal(id, val)}
                />

                <Surveyques
                  id={"religionHHSurvey"}
                  type={"text"}
                  labelText={translate?.Religion_HH_survey}
                  value={religion}
                  handleVal={(id, val) => handleVal(id, val)}
                />

                <SurveyDropdown
                  id={"idTypeHHSurvey"}
                  labelText={translate?.IdType_HH_survey}
                  value={idType}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={[
                    "select",
                    "aadhaar",
                    "pan",
                    "voter",
                    "driving license",
                  ]}
                />
                {idType !== "" && idType !== "select" ? (
                  <Surveyques
                    id={"identificationNumberHHSurvey"}
                    type={"number"}
                    labelText={"Identification Number"}
                    value={idCardNumber}
                    handleVal={(id, val) => handleVal(id, val)}
                    required={true}
                  />
                ) : null}

                <SurveyDropdown
                  id={"occupationHHSurvey"}
                  labelText={translate?.Occupation_HH_survey}
                  value={occupationHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={occupationName}
                />

                <SurveyDropdown
                  id={"localityNameMohallaHHSurvey"}
                  labelText={translate?.Locality_Name_Mohalla_HH_survey}
                  value={localityNameMohallaHHSurvey}
                  required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={localName}
                />
              </div>

              {/* //Waste Information */}
              <div className={styles.wasteInfoContainer}>
                <div className={styles.wasteInfoHeading}>
                  <Textparser text={"Generated Waste Information"} />
                </div>

                <Surveyques
                  id={"wasteGenerated"}
                  labelText={translate?.Waste_gen_amt_HH_survey}
                  value={wasteGenerated}
                  handleVal={(id, val) => handleVal(id, val)}
                  type={"number"}
                />

                <SurveyDropdown
                  id={"WillingToDoManage"}
                  labelText={translate?.Willing_to_do_manage_HH_survey}
                  value={
                    WillingToDoManage === "1"
                      ? "yes"
                      : WillingToDoManage === "0"
                        ? "no"
                        : "-1"
                  }
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["select", "yes", "no"]}
                />

                {WillingToDoManage === "1" ? (
                  <>
                    {/* //typeOfSegragation */}
                    <div className={styles.radioInput}>
                      <Textparser
                        text={translate?.Type_of_Segregation_HH_survey}
                      />
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
                          <label htmlFor="typeOfSegregationHHSurvey_fully">
                            Fully
                          </label>
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
                          <label htmlFor="typeOfSegregationHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>

                    {/* //DoingHomeComposting */}
                    <div className={styles.radioInput}>
                      <Textparser
                        text={
                          translate?.Are_You_Doing_Home_Composting_HH_survey
                        }
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
                          <label htmlFor="areYouDoingHomeCompostingHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>

                    {/* //Greywater */}

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
                          <label htmlFor="doYouManagingGreyWaterHHSurvey_yes">
                            Yes
                          </label>
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
                          <label htmlFor="doYouManagingGreyWaterHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>

                    {/* //Blackwater */}
                    <div className={styles.radioInput}>
                      <Textparser
                        text={translate?.Do_you_managing_Black_Water_HH_survey}
                      />
                      <div className={styles.radioInput_Options}>
                        <span>
                          <input
                            type="radio"
                            id="doYouManagingBlackWaterHHSurvey_yes"
                            name="doYouManagingBlackWaterHHSurvey"
                            value="1"
                            checked={doYouManagingBlackWaterHHSurvey === "1"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="doYouManagingBlackWaterHHSurvey_yes">
                            Yes
                          </label>
                        </span>
                        <span>
                          <input
                            type="radio"
                            id="doYouManagingBlackWaterHHSurvey_no"
                            name="doYouManagingBlackWaterHHSurvey"
                            value="0"
                            checked={doYouManagingBlackWaterHHSurvey === "0"}
                            onChange={(e) => {
                              handleRadioChange(e.target.name, e.target.value);
                            }}
                          />
                          <label htmlFor="doYouManagingBlackWaterHHSurvey_no">
                            No
                          </label>
                        </span>
                      </div>
                    </div>
                  </>
                ) : WillingToDoManage === "0" ? (
                  <>
                    <SurveyDropdown
                      id={"wantTOPay"}
                      labelText={"Will Want to Pay"}
                      value={
                        wantTOPay === "1"
                          ? "Yes"
                          : wantTOPay === "0"
                            ? "No"
                            : ""
                      }
                      handleVal={(id, val) => handleVal(id, val)}
                      options={["Yes", "No"]}
                    />

                    {wantTOPay === "1" ? (
                      <Surveyques
                        id={"userChargesInRupeesPerMonthHHSurvey"}
                        labelText={translate?.User_charges_HH_survey}
                        value={userChargesInRupeesPerMonthHHSurvey}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"number"}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* //Toilet Information */}

              <div className={styles.toiletInfoContainer}>
                <div className={styles.toiletInfoHeading}>
                  <Textparser text={"Other Information"} />
                </div>

                {/* //Are you willing to do kitchen garden in future */}
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

                {/* //Are you willing to construct individual soak pit in future */}
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

                {/* //Have toilet */}
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

                {/* //toilet type */}

                {doYouHaveToiletInYourHouseHHSurvey === "1" ? (
                  <SurveyDropdown
                    id={"selectToiletTypeHHSurvey"}
                    labelText={translate?.Select_Toilet_Type_HH_survey}
                    value={selectToiletTypeHHSurvey}
                    required={true}
                    handleVal={(id, val) => handleVal(id, val)}
                    options={toiletName}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : WGUtype === "shop" ? (
            <div className={styles.shopInfoContainer}>
              <div className={styles.shopInfoHeading}>
                <Textparser text={"Shop Information"} />
                {shopLocated === "2" ? (
                  <div className={styles.addNewSocietyContainer}>
                    <img
                      src="/svg/add_new.svg"
                      alt="add_new"
                      onClick={() => {
                        handleAddNewClick();
                      }}
                    ></img>
                    <p>{translate?.Add_MarketShop_HH_survey}</p>
                  </div>
                ) : null}
              </div>

              {showPopup && (
                <div className={styles.popupOverlay}>
                  <div className={styles.popupContainer}>
                    <button
                      className={styles.closeButton}
                      onClick={handleClosePopup}
                    >
                      <img src="/svg/close.svg"></img>
                    </button>
                    <h3>Add Market </h3>
                    <div>
                      <Surveyques
                        id={"marketName"}
                        labelText={translate?.Market_HH_survey}
                        value={marketName}
                        // required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                        type={"text"}
                      />

                      <div
                        className={styles.marketShopBtn}
                        onClick={(e) => {
                          console.log("marketAddNewObj", marketAddNewObj);
                          AddNewSubmitHandler(
                            e,
                            token,
                            commonOtherObj,
                            marketAddNewObj
                          );
                        }}
                      >
                        {translate?.Add_MarketShop_HH_survey}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <SurveyDropdown
                id={"shopLocated"}
                labelText={translate?.ShopLocated_shop_HH_survey}
                value={
                  shopLocated === "1"
                    ? "Para"
                    : shopLocated === "2"
                      ? "Market"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Para", "Market"]}
              />

              {shopLocated === "2" ? (
                <SurveyDropdown
                  id={"marketName"}
                  labelText={translate?.Market_HH_survey}
                  value={marketName}
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={marketOptions}
                />
              ) : null}

              <SurveyDropdown
                id={"typeOfShop"}
                labelText={translate?.Type_of_shop_HH_survey}
                value={
                  typeOfShop === "1"
                    ? "Grocery"
                    : typeOfShop === "2"
                      ? "Food"
                      : typeOfShop === "3"
                        ? "Vegetables"
                        : typeOfShop === "4"
                          ? "Resturant"
                          : typeOfShop === "5"
                            ? "Fish"
                            : typeOfShop === "6"
                              ? "Meat"
                              : ""
                }
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={[
                  "Select",
                  "Grocery",
                  "Food",
                  "Vegetables",
                  "Resturant",
                  "Fish",
                  "Meat",
                ]}
              />

              <SurveyDropdown
                id={"sansadNoShop"}
                labelText={translate?.SansadNo_HH_survey}
                value={
                  sansadNo === "1"
                    ? "Itahar Sansad"
                    : sansadNo === "2"
                      ? "Raj Sansad"
                      : ""
                }
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Itahar Sansad", "Raj Sansad"]}
              />

              <Surveyques
                id={"shopName"}
                labelText={translate?.ShopName_Shop_HH_survey}
                value={shopName}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"text"}
              />

              <Surveyques
                id={"ShopOwner"}
                labelText={translate?.NameOfOwner_Shop_HH_survey}
                value={shopOwner}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"text"}
              />

              <Surveyques
                id={"contactShop"}
                labelText={translate?.mobile_Shop_HH_survey}
                value={mobileShop}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"bioDegradableWasteShop"}
                labelText={translate?.bioWaste_Shop_HH_survey}
                value={bioWasteShop}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"nonBioDegradableWasteShop"}
                labelText={translate?.nonBiowaste_Shop_HH_survey}
                value={nonBioWasteShop}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <SurveyDropdown
                id={"dailyWasteManage"}
                labelText={translate?.dailyWasteManage_Shop_HH_survey}
                value={
                  dailyWasteManage === "1"
                    ? "Dumping"
                    : dailyWasteManage === "2"
                      ? "Throwing"
                      : dailyWasteManage === "3"
                        ? "Burned"
                        : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Dumping", "Throwing", "Burned"]}
              />

              <SurveyDropdown
                id={"willingToGiveWasteShop"}
                labelText={translate?.willingToGiveWaste_Shop_HH_survey}
                value={
                  willingToGiveWasteShop === "1"
                    ? "Yes"
                    : willingToGiveWasteShop === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />
              {willingToGiveWasteShop === "1" ? (
                <SurveyDropdown
                  id={"willingToPayGpShop"}
                  labelText={translate?.willingToPayGp_Shop_HH_survey}
                  value={
                    willingToPayGpShop === "1"
                      ? "Yes"
                      : willingToPayGpShop === "0"
                        ? "No"
                        : ""
                  }
                  // required={true}
                  handleVal={(id, val) => handleVal(id, val)}
                  options={["Select", "Yes", "No"]}
                />
              ) : (
                <></>
              )}
            </div>
          ) : WGUtype === "market" ? (
            <div className={styles.marketInfoContainer}>
              <div className={styles.marketInfoHeading}>
                <Textparser text={"Market Information"} />
              </div>

              <SurveyDropdown
                id={"marketName"}
                labelText={translate?.Market_HH_survey}
                value={marketName}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={marketOptions}
              />
              <SurveyDropdown
                id={"typeofMarket"}
                labelText={translate?.Type_of_market_HH_survey}
                value={
                  typeofMarket === "1"
                    ? "Hat"
                    : typeofMarket === "2"
                      ? "Market"
                      : typeofMarket === "3"
                        ? "MultiComplex"
                        : typeofMarket === "4"
                          ? "Others"
                          : ""
                }
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Hat", "Market", "MultiComplex", "Others"]}
              />

              <SurveyDropdown
                id={"sansadNoMarket"}
                labelText={translate?.SansadNo_HH_survey}
                value={
                  sansadNo === "1"
                    ? "Itahar Sansad"
                    : sansadNo === "2"
                      ? "Raj Sansad"
                      : ""
                }
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Itahar Sansad", "Raj Sansad"]}
              />

              <SurveyDropdown
                id={"marketCommitteePresence"}
                labelText={translate?.MarketCommitee_HH_survey}
                value={
                  ismarketCommitteePresence === "1"
                    ? "Yes"
                    : ismarketCommitteePresence === "0"
                      ? "No"
                      : ""
                }
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />

              <Surveyques
                id={"numberOfshops"}
                labelText={translate?.TotalShop_Market_HH_survey}
                value={numberOfshops}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfGroceries"}
                labelText={translate?.TotalGrocery_Market_HH_survey}
                value={numberOfGroceries}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfFoodShops"}
                labelText={translate?.TotalFood_Market_HH_survey}
                value={numberOfFoodShops}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfVegetables"}
                labelText={translate?.TotalVegetable_Market_HH_survey}
                value={numberOfVegetables}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfResturants"}
                labelText={translate?.TotalResturant_Market_HH_survey}
                value={numberOfResturants}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfHotels"}
                labelText={translate?.TotalHotels_Market_HH_survey}
                value={numberOfHotels}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfMeatShop"}
                labelText={translate?.TotalMeatShop_Market_HH_survey}
                value={numberOfMeatShop}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfFishShops"}
                labelText={translate?.TotalFishShops_Market_HH_survey}
                value={numberOfFishShops}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfOtherShops"}
                labelText={translate?.TotalOther_Market_HH_survey}
                value={numberOfOtherShops}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"wasteGenMarket"}
                labelText={translate?.TotalWasteGeneration_Market_HH_survey}
                value={wasteGenMarket}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"bioDegradableWasteMarket"}
                labelText={translate?.TotalBioDegradableWaste_Market_HH_survey}
                value={bioDegradableWasteMarket}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"nonBioDegradableWasteMarket"}
                labelText={
                  translate?.TotalNonBioDegradableWaste_Market_HH_survey
                }
                value={nonBioDegradableWasteMarket}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"hazardousWasteMarket"}
                labelText={translate?.TotalHazardousWaste_Market_HH_survey}
                value={hazardousWasteMarket}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <SurveyDropdown
                id={"dailyWasteManageMarket"}
                labelText={translate?.WasteMangement_Market_HH_survey}
                value={dailyWasteManageMarket}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Dumping", "Throwing", "Burned"]}
              />

              <SurveyDropdown
                id={"willingToGiveWasteMarket"}
                labelText={translate?.willingToGiveWaste_Market_HH_survey}
                value={
                  willingToGiveWasteMarket === "1"
                    ? "Yes"
                    : willingToGiveWasteMarket === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />

              <SurveyDropdown
                id={"willingToPayGpMarket"}
                labelText={translate?.willingToPayGp_Market_HH_survey}
                value={
                  willingToPayGpMarket === "1"
                    ? "Yes"
                    : willingToPayGpMarket === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />
            </div>
          ) : WGUtype === "institution" ? (
            <div className={styles.institutionInfoContainer}>
              <div className={styles.institutionInfoHeading}>
                <Textparser text={"Institution Information"} />
              </div>

              <SurveyDropdown
                id={"typeOfInstitution"}
                labelText={translate?.Type_of_instituion_HH_survey}
                value={typeOfInstitution}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={[
                  "Select",
                  "ICDS",
                  "SSK",
                  "MSK",
                  "Primary School",
                  "Upper Primary School",
                  "High School",
                  "Higher Secondary School",
                  "College",
                ]}
              />

              <Surveyques
                id={"nameOfInstitution"}
                labelText={translate?.NameOFInstitution_HH_survey}
                value={nameOfInstitution}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"text"}
              />

              <SurveyDropdown
                id={"sansadNoInstitution"}
                labelText={translate?.SansadNo_HH_survey}
                value={
                  sansadNo === "1"
                    ? "Itahar Sansad"
                    : sansadNo === "2"
                      ? "Raj Sansad"
                      : ""
                }
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Itahar Sansad", "Raj Sansad"]}
              />

              <Surveyques
                id={"numberOfStudents"}
                labelText={translate?.TotalStudents_Institution_HH_survey}
                value={numberOfStudents}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfBoys"}
                labelText={translate?.TotalBoys_Institution_HH_survey}
                value={numberOfBoys}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"numberOfGirls"}
                labelText={translate?.TotalGirls_Institution_HH_survey}
                value={numberOfGirls}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <SurveyDropdown
                id={"isMidDayMeal"}
                labelText={translate?.IsMidDayMeal_Institution_HH_survey}
                value={
                  isMidDayMeal === "1"
                    ? "Yes"
                    : isMidDayMeal === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />

              <Surveyques
                id={"numberOfDailyWasteGen"}
                labelText={
                  translate?.TotalWasteGeneration_Institution_HH_survey
                }
                value={numberOfDailyWasteGen}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"bioDegradableWasteInstitute"}
                labelText={
                  translate?.TotalBioDegradableWaste_Institution_HH_survey
                }
                value={bioDegradableWasteInstitute}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"nonBioDegradableWasteInstitute"}
                labelText={
                  translate?.TotalNonBioDegradableWaste_Institution_HH_survey
                }
                value={nonBioDegradableWasteInstitute}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <Surveyques
                id={"sanataryWaste"}
                labelText={translate?.TotalSanataryWaste_Institution_HH_survey}
                value={sanatartyWasteInstitute}
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                type={"number"}
              />

              <SurveyDropdown
                id={"WillingToDoManageWasteInstitute"}
                labelText={
                  translate?.WillingToManageWaste_Institution_HH_survey
                }
                value={
                  WillingToDoManageWasteInstitute === "1"
                    ? "Yes"
                    : WillingToDoManageWasteInstitute === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />

              <SurveyDropdown
                id={"hasGarden"}
                labelText={translate?.hasGarden_Institution_HH_survey}
                value={
                  hasGarden === "1" ? "Yes" : hasGarden === "0" ? "No" : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />

              <SurveyDropdown
                id={"dailyWasteManageInstitute"}
                labelText={translate?.DailyWasteManage_Institution_HH_survey}
                value={dailyWasteManageInstitute}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Dumping", "Throwing", "Burned"]}
              />

              <SurveyDropdown
                id={"willingToGiveWasteInstitute"}
                labelText={
                  translate?.WillingToGiveWasteGP_Institution_HH_survey
                }
                value={
                  willingToGiveWasteInstitute === "1"
                    ? "Yes"
                    : willingToGiveWasteInstitute === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />

              <SurveyDropdown
                id={"willingToPayGpInstitute"}
                labelText={translate?.WillingToPayGp_Institution_HH_survey}
                value={
                  willingToPayGpInstitute === "1"
                    ? "Yes"
                    : willingToPayGpInstitute === "0"
                      ? "No"
                      : ""
                }
                // required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={["Select", "Yes", "No"]}
              />
            </div>
          ) : (
            <></>
          )}

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
