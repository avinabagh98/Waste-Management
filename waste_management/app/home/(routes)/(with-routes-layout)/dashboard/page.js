"use client";

import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import SurveyDropdown from "@/components/SurveyDropdown";
import Footer from "@/components/Footer";

export default function page() {
  //State variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [municipality_name, setMunicipality_name] = useState("");
  const [team_num, setTeam_num] = useState("");
  const [ward_name, setWard_name] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    setUserRole(localStorage.getItem("role_name"));
    console.log(userRole);
    // try {
    //   async function fetchData() {
    //     const token = await localStorage.getItem("token");
    //     if (!token) {
    //       route.push("/home/login");
    //     } else {
    //       setUserRole(localStorage.getItem("role_name"));
    //       setToken(token);

    //       //Fetching user details
    //       const user_details_response = await sendRequest(
    //         "get",
    //         "/user-details",
    //         null,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );

    //       if (user_details_response.status === 1) {
    //         // console.log("User Details Response ::", user_details_response.data);
    //         setAPI_Data_userDetails(user_details_response.data);
    //       }
    //     }
    //   }
    //   fetchData();
    // } catch (error) {
    //   swal("Error", error.message, "error");
    // }
  }, [userRole]);

  // API Data Fetching

  // Function Declarations

  // Handler Functions

  return (
    <>
      <Header
        userRole={userRole}
        isOffCanvasVisible={true}
        loadingdata={loadingHeaderData}
      />
      <Footer />
    </>
  );
}
