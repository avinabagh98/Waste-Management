"use client";

import styles from "./income.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";

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

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const formData = {
    dateIncome,
    supervisorIncome,
    fieldStaffIncome,
    mohallaCommiteeIncome,
    wardNoGpIncome,
    localityNameVillageIncome,
    wasteCollectorNameIncome,
    recyclableSoldIncome,
    plasticRecyclableSoldIncome,
    incomeFromSaleOfRecyclableIncome,
    saleOfManureIncome,
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
            id={"dateIncome"}
            labelText={translate?.Date_income}
            value={dateIncome}
            required={true}
            handleVal={(id, val) => handleVal(id, val)}
          />
        </div>
      </div>
    </>
  );
}
