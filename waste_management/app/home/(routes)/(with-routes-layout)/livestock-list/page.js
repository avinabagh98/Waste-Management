"use client";
import styles from "./livestock.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Listcard from "@/components/Listcard";

export default function LivestockListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_livestockData, setApi_livestockData] = useState([]);

  //Common Other declarations///
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const livestocklistBody = {
    token: token,
    wardId: ward_id,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // Common LocalStorage Fetching
  useEffect(() => {
    try {
      async function fetchData() {
        const tokeN = await localStorage.getItem("token");
        if (!tokeN) {
          route.push("/home/login");
        } else {
          setToken(tokeN);
          setWard_id(localStorage.getItem("ward_id"));
          setUserRole(localStorage.getItem("role_name"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //Livestock List Fetching
  useEffect(() => {
    async function fetchLists() {
      const response_livestocklist = await sendRequest(
        "post",
        `/livestockShed/list`,
        livestocklistBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_livestocklist.status === 1) {
        console.log(
          "API_list_ARRAY::",
          response_livestocklist.data.data.livestockShedlist
        );
        setApi_livestockData(
          response_livestocklist.data.data.livestockShedlist
        );
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Function Declarations

  // Handler Functions

  return (
    <>
      <Header
        loadingdata={loadingHeaderData}
        userRole={userRole}
        isOffCanvasVisible={false}
      />

      {api_livestockData ? (
        api_livestockData.map((livestock) => {
          return (
            <Listcard
              key={livestock.id}
              livestock_name={livestock?.name_of_live_shed}
              livestock_type={livestock?.livestock_type}
              livestock_status={
                livestock?.is_approve === "0" ? "Not approved" : "Approved"
              }
              owner_name={livestock.name_of_owner}
              owner_contact={livestock.contact_number}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}
