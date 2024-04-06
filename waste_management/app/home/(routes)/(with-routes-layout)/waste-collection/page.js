"use client";

import styles from "./waste.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";

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
        </div>
      </div>
    </>
  );
}
