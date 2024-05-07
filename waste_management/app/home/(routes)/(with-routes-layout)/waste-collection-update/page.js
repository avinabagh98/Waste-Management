"use client";

import styles from "@/app/home/(routes)/(with-routes-layout)/waste-collection-add/waste.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";
import { sendRequest } from "@/api/sendRequest";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function WastecollectionUpdatePage() {
<<<<<<< HEAD




=======
>>>>>>> 6fb682acf8e4510bb0e5d89e1114e5a1baa58505
  //State variables
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  //form-data states
  const [dateWasteCollection, setDateWasteCollection] = useState(null);
  const [supervisorWasteCollection, setSupervisorWasteCollection] =
    useState(null);
  const [fieldStaffWasteCollection, setFieldStaffWasteCollection] =
    useState(null);
  const [houseNumberWasteCollection, setHouseNumberWasteCollection] =
    useState(null);
  const [mohallaCommiteeWasteCollection, setMohallaCommiteeWasteCollection] =
    useState("select");
  const [nameOfULBBlockWasteCollection, setNameOfULBBlockWasteCollection] =
    useState(null);
  const [wardNoGPWasteCollection, setWardNoGPWasteCollection] = useState(null);
  const [
    localityNameVillageWasteCollection,
    setLocalityNameVillageWasteCollection,
  ] = useState("");
  const [nameOfResidentWasteCollection, setNameOfResidentWasteCollection] =
    useState(null);
  const [
    compostableWasteCollectedWasteCollection,
    setCompostableWasteCollectedWasteCollection,
  ] = useState(null);
  const [ironWasteCollection, setIronWasteCollection] = useState(null);
  const [aluminiumWasteCollection, setAluminiumWasteCollection] =
    useState(null);
  const [otherMetalsWasteCollection, setOtherMetalsWasteCollection] =
    useState(null);
  const [petBottlesWasteCollection, setPetBottlesWasteCollection] =
    useState(null);
  const [otherPlasticWasteCollection, setOtherPlasticWasteCollection] =
    useState(null);
  const [glassWasteCollection, setGlassWasteCollection] = useState(null);
  const [milkBagWasteCollection, setMilkBagWasteCollection] = useState(null);
  const [paperWasteCollection, setPaperWasteCollection] = useState(null);
  const [cardBoardWasteCollection, setCardBoardWasteCollection] =
    useState(null);
  const [othersWasteCollection, setOthersWasteCollection] = useState(null);
  const [inertWasteWasteCollection, setInertWasteWasteCollection] =
    useState(null);
  const [
    daysOfCollectionsInAWeekWasteCollection,
    setDaysOfCollectionsInAWeekWasteCollection,
  ] = useState(null);
  const [mohallas, setMohallas] = useState([]);
  const [mohallaName, setMohallaName] = useState([]);
  const [mohallaId, setMohallaId] = useState("");

  const [locality, setLocality] = useState([]);
  const [localName, setLocalName] = useState([]);
  const [localityId, setLocalityId] = useState([]);
  const [supervisor, setSupervisor] = useState("");
  const [wardId, setWardId] = useState(null);
  const [id, setId] = useState("");

  //Loading Header Data States
  const [name, setName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");
  const [spinner, setSpinner] = useState(false);

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: wardId,
    block_name: block_name,
  };

  const formDataWCUpdate = {
    id: id,
    token: token,
    mohallaId: mohallaId,
    wardId: wardId,
    Date: dateWasteCollection,
    supervisorId: supervisorWasteCollection,
    fieldStaffId: fieldStaffWasteCollection,
    houseNumber: houseNumberWasteCollection,
    Block: nameOfULBBlockWasteCollection,
    localityId: localityId,
    residentName: nameOfResidentWasteCollection,
    compostableWasteCollected: compostableWasteCollectedWasteCollection,
    Iron: ironWasteCollection,
    Aluminium: aluminiumWasteCollection,
    otherMetals: otherMetalsWasteCollection,
    petBottles: petBottlesWasteCollection,
    otherPlastic: otherPlasticWasteCollection,
    Glass: glassWasteCollection,
    milkbag: milkBagWasteCollection,
    Paper: paperWasteCollection,
    cardBoard: cardBoardWasteCollection,
    Others: othersWasteCollection,
    inertinertWaste_waste: inertWasteWasteCollection,
    daysCollectionInWeek: daysOfCollectionsInAWeekWasteCollection,
  };

  const dropDownBody = {
    token: token,
    wardId: wardId,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("previousPath", "/home/waste-collection-list");
      try {
        async function fetchData() {
          const tokeN = localStorage.getItem("token");
          if (!tokeN) {
            route.push("/home/login");
          } else {
            setUserRole(localStorage.getItem("role_name"));
            setToken(tokeN);

            //loadingHeaderData from local storage
            setName(localStorage.getItem("name"));
            setDistrictName(localStorage.getItem("district"));
            setBLockName(localStorage.getItem("block"));
            setWardId(localStorage.getItem("ward_id"));
            setSupervisor(localStorage.getItem("supervisor"));
            setFieldStaffWasteCollection(localStorage.getItem("name"));
            setNameOfULBBlockWasteCollection(localStorage.getItem("block"));
            setWardNoGPWasteCollection(localStorage.getItem("ward_id"));
            setId(localStorage.getItem("id"));
          }
        }
        fetchData();
      } catch (error) {
        swal("Error", error.message, "error");
      }
    }
  }, []);

  // Getting Weekly waste collection BY id
  useEffect(() => {
    async function showData() {
      try {
        // Weekly waste collection By Id
        const res = await sendRequest(
          "post",
          `/weeklywastecollection/id`,
          { token, id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 1) {
          console.log(
            "Response weekly waste collection id",
            res.data.data.list
          );

          //inserting data to the respected fields
          const api_response = res.data.data.list;

          setDateWasteCollection(api_response.date);
          setSupervisorWasteCollection(api_response.supervisor_id);
          setFieldStaffWasteCollection(api_response.field_staff_id);
          setHouseNumberWasteCollection(api_response.house_number);
          setMohallaId(api_response.moholla_committee_id);
          setNameOfULBBlockWasteCollection(api_response.block);
          setWardNoGPWasteCollection(api_response.ward_no);
          setLocalityId(api_response.locality_id);
          setNameOfResidentWasteCollection(api_response.resident_name);
          setCompostableWasteCollectedWasteCollection(
            api_response.compostable_waste_collected
          );
          setIronWasteCollection(api_response.iron);
          setAluminiumWasteCollection(api_response.aluminium);
          setOtherMetalsWasteCollection(api_response.other_metals);
          setPetBottlesWasteCollection(api_response.pet_bottles);
          setOtherPlasticWasteCollection(api_response.other_plastic);
          setGlassWasteCollection(api_response.glass);
          setMilkBagWasteCollection(api_response.milkbag);
          setPaperWasteCollection(api_response.paper);
          setCardBoardWasteCollection(api_response.card_board);
          setOthersWasteCollection(api_response.others);
          setInertWasteWasteCollection(api_response.inert_waste);
          setDaysOfCollectionsInAWeekWasteCollection(
            api_response.days_collection_in_week
          );


          setLoading(false);
        }
      } catch (error) {
        console.log("Error at weekly waste collection by id::", error);
      }
    }
    showData();
  }, [token, mohallaCommiteeWasteCollection]);

  // Mohalla Committee List Dropdown Fetching
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
          console.log(response.data.data.lists);

          setMohallas(response.data.data.lists);
          const mohallas_name = response.data.data.lists.map(
            (item) => item.committee_name
          );
          setMohallaName(mohallas_name);
        }
      }

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Mohalla Committee List Dropdown State Update -- for Update API
  useEffect(() => {
    if (mohallas.length > 0) {
      const mohallaNames = mohallas.map((mohalla) => mohalla.committee_name);
      setMohallaName(mohallaNames);
      //from ID to Name Update in dropdown
      const mohallaname = mohallas.filter((item) => item.id === mohallaId);
      setMohallaCommiteeWasteCollection(mohallaname[0]?.committee_name);
    }
  }, [mohallas]);

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

  // Locality List Dropdown State Update -- for Update API
  useEffect(() => {
    if (locality.length > 0) {
      const localityaNames = locality.map((locality) => locality.village_name);
      setLocalName(localityaNames);
      //from ID to Name Update in dropdown
      const local = locality.filter((item) => item.id === localityId);
      setLocalityNameVillageWasteCollection(local[0]?.village_name);
    }
  }, [locality]);

  // Handler Functions

  const handleVal = (id, val) => {
    if (id === "dateWasteCollection") {
      setDateWasteCollection(val);
    }

    if (id === "houseNumberWasteCollection") {
      setHouseNumberWasteCollection(val);
    }
    if (id === "mohallaCommiteeWasteCollection") {
      let mhVal = mohallas.filter((item) => item.committee_name === val);
      let mohallaId_Selected = mhVal[0].id;
      setMohallaId(mohallaId_Selected);
      setMohallaCommiteeWasteCollection(val);
    }
    if (id === "nameOfULBBlockWasteCollection") {
      setNameOfULBBlockWasteCollection(val);
    }
    if (id === "wardNoGPWasteCollection") {
      setWardNoGPWasteCollection(val);
    }

    if (id === "localityNameVillageWasteCollection") {
      let LVal = locality.filter((item) => item.village_name === val);
      let local_Selected = LVal[0].id;
      setLocalityId(local_Selected);
      setLocalityNameVillageWasteCollection(val);
    }
    if (id === "nameOfResidentWasteCollection") {
      setNameOfResidentWasteCollection(val);
    }

    if (id === "compostableWasteCollectedWasteCollection") {
      setCompostableWasteCollectedWasteCollection(val);
    }

    if (id === "ironWasteCollection") {
      setIronWasteCollection(val);
    }
    if (id === "aluminiumWasteCollection") {
      setAluminiumWasteCollection(val);
    }
    if (id === "otherMetalsWasteCollection") {
      setOtherMetalsWasteCollection(val);
    }
    if (id === "petBottlesWasteCollection") {
      setPetBottlesWasteCollection(val);
    }
    if (id === "otherPlasticWasteCollection") {
      setOtherPlasticWasteCollection(val);
    }
    if (id === "glassWasteCollection") {
      setGlassWasteCollection(val);
    }
    if (id === "milkBagWasteCollection") {
      setMilkBagWasteCollection(val);
    }
    if (id === "paperWasteCollection") {
      setPaperWasteCollection(val);
    }
    if (id === "cardBoardWasteCollection") {
      setCardBoardWasteCollection(val);
    }
    if (id === "othersWasteCollection") {
      setOthersWasteCollection(val);
    }
    if (id === "inertWasteWasteCollection") {
      setInertWasteWasteCollection(val);
    }
    if (id === "daysOfCollectionsInAWeekWasteCollection") {
      setDaysOfCollectionsInAWeekWasteCollection(val);
    }
  };

  const UpdateHandler = async (e) => {
    let flag = false;
    setSpinner(true);
    e.preventDefault();
    for (const field in formDataWCUpdate) {
      if (formDataWCUpdate[field] === null || formDataWCUpdate[field] === "") {
        flag = true;
        break;
      }
    }
    if (flag) {
      swal("Error", "Please fill all the fields", "error");
    } else {
      console.log("Waste Collection Submitted::", formDataWCUpdate);
      //UPDATE API CALLING
      const res = await sendRequest(
        "post",
        "/weeklywastecollection/update",
        formDataWCUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 1) {
        swal("Success", "Updated Successfully", "success");
        route.push("/home/waste-collection-list");

      }
    }
  };

  return !loading ? (
    !spinner ?
      <>
        <Header
          userRole={userRole}
          isOffCanvasVisible={false}
          loadingdata={loadingHeaderData}
        />

        <div className={styles.container}>
          {/* //breadcrumb */}
          <div className={styles.breadcrumb}>
            <Textparser text={"Weekly Waste Collection Update"} />
          </div>
          <div className={styles.ListContainerWasteCollection}>
            <div className={styles.textParser}>
              <Textparser
                text={`Supervisor: ${supervisor}`}
              />
            </div>

            <div className={styles.formcontainer}>
              <Surveyques
                id={"dateWasteCollection"}
                type={"date"}
                labelText={translate?.Date_Waste_Collection}
                value={dateWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />
              {/* 
          <Surveyques
            id={"supervisorWasteCollection"}
            disabled={true}
            type={"text"}
            labelText={translate?.Supervisor_Waste_Collection}
            value={supervisor}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"fieldStaffWasteCollection"}
            type={"text"}
            disabled={true}
            labelText={translate?.Field_Staff_Waste_Collection}
            value={name}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          /> */}

              <Surveyques
                id={"houseNumberWasteCollection"}
                type={"text"}
                labelText={translate?.House_number_Waste_Collection}
                value={houseNumberWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <SurveyDropdown
                id={"mohallaCommiteeWasteCollection"}
                labelText={translate?.Mohalla_Commitee_Waste_Collection}
                value={mohallaCommiteeWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={mohallaName}
              />

              <Surveyques
                id={"nameOfULBBlockWasteCollection"}
                type={"text"}
                labelText={translate?.Name_of_ULB_Block_Waste_Collection}
                value={nameOfULBBlockWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"wardNoGPWasteCollection"}
                type={"text"}
                labelText={translate?.Ward_No_GP_Waste_Collection}
                value={wardNoGPWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />
              <SurveyDropdown
                id={"localityNameVillageWasteCollection"}
                type={"text"}
                labelText={translate?.Locality_Name_Village_Waste_Collection}
                value={localityNameVillageWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
                options={localName}
              />
              <Surveyques
                id={"nameOfResidentWasteCollection"}
                type={"text"}
                labelText={translate?.Name_of_Resident_Waste_Collection}
                value={nameOfResidentWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"compostableWasteCollectedWasteCollection"}
                type={"number"}
                labelText={
                  translate?.Compostable_Waste_Collected_Waste_Collection
                }
                value={compostableWasteCollectedWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"ironWasteCollection"}
                type={"number"}
                labelText={translate?.Iron_Waste_Collection}
                value={ironWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"aluminiumWasteCollection"}
                type={"number"}
                labelText={translate?.Aluminium_Waste_Collection}
                value={aluminiumWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"otherMetalsWasteCollection"}
                type={"number"}
                labelText={translate?.Other_Metals_Waste_Collection}
                value={otherMetalsWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"petBottlesWasteCollection"}
                type={"number"}
                labelText={translate?.Pet_Bottles_Waste_Collection}
                value={petBottlesWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"otherPlasticWasteCollection"}
                type={"number"}
                labelText={translate?.Other_Plastic_Waste_Collection}
                value={otherPlasticWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"glassWasteCollection"}
                type={"number"}
                labelText={translate?.Glass_Waste_Collection}
                value={glassWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"milkBagWasteCollection"}
                type={"number"}
                labelText={translate?.Milk_Bag_Waste_Collection}
                value={milkBagWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"paperWasteCollection"}
                type={"number"}
                labelText={translate?.Paper_Waste_Collection}
                value={paperWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"cardBoardWasteCollection"}
                type={"number"}
                labelText={translate?.Card_Board_Waste_Collection}
                value={cardBoardWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"othersWasteCollection"}
                type={"number"}
                labelText={translate?.Others_Waste_Collection}
                value={othersWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"inertWasteWasteCollection"}
                type={"number"}
                labelText={translate?.Inert_Waste_Waste_Collection}
                value={inertWasteWasteCollection}
                required={true}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <Surveyques
                id={"daysOfCollectionsInAWeekWasteCollection"}
                type={"number"}
                labelText={
                  translate?.Days_of_Collections_in_a_week_Waste_Collection
                }
                value={daysOfCollectionsInAWeekWasteCollection}
                handleVal={(id, val) => handleVal(id, val)}
              />

              <div className={styles.btnContainer}>
                <button className={styles.submitbtn} onClick={UpdateHandler}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </> :
      spinner ?
        <>
          <div className={styles.spinner}>
            <img src="/svg/loader.svg"></img>
          </div>
        </> : <></>
  ) : <>
    <Header
      userRole={userRole}
      isOffCanvasVisible={false}
      loadingdata={loadingHeaderData}

    />

    <div className={styles.container}>
      <div className={styles.breadcrumb}>

        <Skeleton width={200} baseColor="#6fd199" />

      </div>

      <div className={styles.ListContainerWasteCollection}>
        <div className={styles.textParser}>

          <Skeleton width={200} baseColor="#f2d98d" />


        </div>

        <div>
          {[...Array(7)].map((_, index) => (
            <div className={styles.formcontainer} key={index}>
              <Skeleton width={200} height={10} />
              <Skeleton width={"100%"} height={40} />
            </div>
          ))}
        </div>


      </div>
    </div>
  </>

}
