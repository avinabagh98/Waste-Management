"use client";

import styles from "./waste.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";

export default function Wastecollectionpage() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  //form-data states
  const [dateWasteCollection, setDateWasteCollection] = useState("");
  const [supervisorWasteCollection, setSupervisorWasteCollection] =
    useState("");
  const [fieldStaffWasteCollection, setFieldStaffWasteCollection] =
    useState("");
  const [houseNumberWasteCollection, setHouseNumberWasteCollection] =
    useState("");
  const [mohallaCommiteeWasteCollection, setMohallaCommiteeWasteCollection] =
    useState("");
  const [nameOfULBBlockWasteCollection, setNameOfULBBlockWasteCollection] =
    useState("");
  const [wardNoGPWasteCollection, setWardNoGPWasteCollection] = useState("");
  const [
    localityNameVillageWasteCollection,
    setLocalityNameVillageWasteCollection,
  ] = useState("");
  const [nameOfResidentWasteCollection, setNameOfResidentWasteCollection] =
    useState("");
  const [
    compostableWasteCollectedWasteCollection,
    setCompostableWasteCollectedWasteCollection,
  ] = useState("");
  const [ironWasteCollection, setIronWasteCollection] = useState("");
  const [aluminiumWasteCollection, setAluminiumWasteCollection] = useState("");
  const [otherMetalsWasteCollection, setOtherMetalsWasteCollection] =
    useState("");
  const [petBottlesWasteCollection, setPetBottlesWasteCollection] =
    useState("");
  const [otherPlasticWasteCollection, setOtherPlasticWasteCollection] =
    useState("");
  const [glassWasteCollection, setGlassWasteCollection] = useState("");
  const [milkBagWasteCollection, setMilkBagWasteCollection] = useState("");
  const [paperWasteCollection, setPaperWasteCollection] = useState("");
  const [cardBoardWasteCollection, setCardBoardWasteCollection] = useState("");
  const [othersWasteCollection, setOthersWasteCollection] = useState("");
  const [inertWasteWasteCollection, setInertWasteWasteCollection] =
    useState("");
  const [
    daysOfCollectionsInAWeekWasteCollection,
    setDaysOfCollectionsInAWeekWasteCollection,
  ] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formData = {
    dateWasteCollection,
    supervisorWasteCollection,
    fieldStaffWasteCollection,
    houseNumberWasteCollection,
    mohallaCommiteeWasteCollection,
    nameOfULBBlockWasteCollection,
    wardNoGPWasteCollection,
    localityNameVillageWasteCollection,
    nameOfResidentWasteCollection,
    compostableWasteCollectedWasteCollection,
    ironWasteCollection,
    aluminiumWasteCollection,
    otherMetalsWasteCollection,
    petBottlesWasteCollection,
    otherPlasticWasteCollection,
    glassWasteCollection,
    milkBagWasteCollection,
    paperWasteCollection,
    cardBoardWasteCollection,
    othersWasteCollection,
    inertWasteWasteCollection,
    daysOfCollectionsInAWeekWasteCollection,
  };

  const mohallaOptions = ["select"];

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

  const handleVal = (id, val) => {};
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
            id={"dateWasteCollection"}
            labelText={translate?.Date_Waste_Collection}
            value={dateWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"supervisorWasteCollection"}
            labelText={translate?.Supervisor_Waste_Collection}
            value={supervisorWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"fieldStaffWasteCollection"}
            labelText={translate?.Field_Staff_Waste_Collection}
            value={fieldStaffWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"houseNumberWasteCollection"}
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
            options={mohallaOptions}
          />

          <Surveyques
            id={"nameOfULBBlockWasteCollection"}
            labelText={translate?.Name_of_ULB_Block_Waste_Collection}
            value={nameOfULBBlockWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"wardNoGPWasteCollection"}
            labelText={translate?.Ward_No_GP_Waste_Collection}
            value={wardNoGPWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"localityNameVillageWasteCollection"}
            labelText={translate?.Locality_Name_Village_Waste_Collection}
            value={localityNameVillageWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
          <Surveyques
            id={"nameOfResidentWasteCollection"}
            labelText={translate?.Name_of_Resident_Waste_Collection}
            value={nameOfResidentWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"compostableWasteCollectedWasteCollection"}
            labelText={translate?.Compostable_Waste_Collected_Waste_Collection}
            value={compostableWasteCollectedWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"ironWasteCollection"}
            labelText={translate?.Iron_Waste_Collection}
            value={ironWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"aluminiumWasteCollection"}
            labelText={translate?.Aluminium_Waste_Collection}
            value={aluminiumWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"otherMetalsWasteCollection"}
            labelText={translate?.Other_Metals_Waste_Collection}
            value={otherMetalsWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"petBottlesWasteCollection"}
            labelText={translate?.Pet_Bottles_Waste_Collection}
            value={petBottlesWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"otherPlasticWasteCollection"}
            labelText={translate?.Other_Plastic_Waste_Collection}
            value={otherPlasticWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"glassWasteCollection"}
            labelText={translate?.Glass_Waste_Collection}
            value={glassWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"milkBagWasteCollection"}
            labelText={translate?.Milk_Bag_Waste_Collection}
            value={milkBagWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"paperWasteCollection"}
            labelText={translate?.Paper_Waste_Collection}
            value={paperWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"cardBoardWasteCollection"}
            labelText={translate?.Card_Board_Waste_Collection}
            value={cardBoardWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"othersWasteCollection"}
            labelText={translate?.Others_Waste_Collection}
            value={othersWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"inertWasteWasteCollection"}
            labelText={translate?.Inert_Waste_Waste_Collection}
            value={inertWasteWasteCollection}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />

          <Surveyques
            id={"daysOfCollectionsInAWeekWasteCollection"}
            labelText={
              translate?.Days_of_Collections_in_a_week_Waste_Collection
            }
            value={daysOfCollectionsInAWeekWasteCollection}
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
