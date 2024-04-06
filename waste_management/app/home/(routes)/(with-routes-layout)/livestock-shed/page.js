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

export default function Livestockpage() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
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

  //Other declarations

  const route = useRouter();
  const translate = LanguageFetcher();

  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formData = {
    supervisorLivestock,
    fieldStaffLivestock,
    dateOfReportingLivestock,
    wardNoGPLivestock,
    localityNameVillageLivestock,
    registorNumberLivestock,
    nameOfLivestockShedLivestock,
    nameOfOwnerLivestock,
    contactNumberLivestock,
    numberOfLivestockLivestock,
    compostableWasteTransferredLivestock,
  };

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
            id={"supervisorLivestock"}
            labelText={translate?.Supervisor_Livestock}
            value={supervisorLivestock}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
        </div>
      </div>
    </>
  );
}
