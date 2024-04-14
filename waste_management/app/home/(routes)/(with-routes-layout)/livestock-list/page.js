"use client";
import styles from "./livestock.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Swal from "sweetalert2";
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
  const editHandler = () => {
    route.push("/home/livestock-edit");
  };

  const showHandler = (arrayData) => {
    console.log("show");
    Swal.fire({
      title: "Livestock Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <div style="display:flex; align-items:center; gap:10px">
          <p style="text-align:left"><strong>Livestock Id:</strong> ${
            arrayData?.id
          }</p>
          <p style="text-align:left"><strong>Registor No:</strong> ${
            arrayData?.regester_no
          }</p>
          </div>
          
          <div style="display:flex; align-items:center;gap:10px">
          <p style="text-align:left"><strong>Ward:</strong> ${
            arrayData?.ward
          }</p>
          <p style="text-align:left"><strong>Municipality:</strong> ${
            arrayData?.municipality_id
          }</p>
          </div>

          <p style="text-align:left"><strong>Location:</strong> ${
            arrayData?.latitude
          }, ${arrayData?.longitude}</p>
          <p style="text-align:left"><strong >Livestock Name:</strong> ${
            arrayData?.name_of_live_shed
          }</p>
          <p style="text-align:left"><strong>Livestock Type:</strong> ${
            arrayData?.livestock_type
          }</p>
          <p style="text-align:left"><strong>Name of Owner:</strong> ${
            arrayData?.name_of_owner
          }</p>
          <p style="text-align:left"><strong>Contact Number:</strong> ${
            arrayData?.contact_number
          }</p>
          <p style="text-align:left"><strong>Compostable Waste (KG):</strong> ${
            arrayData?.compostable_waste
          }</p>
          <p style="text-align:left"><strong>Is Approved:</strong> ${
            arrayData?.is_approve === 0 ? "Not approved" : "Approved"
          }</p>
          </div>
        </swal-html>`,
    });
  };

  return (
    <>
      <Header
        loadingdata={loadingHeaderData}
        userRole={userRole}
        isOffCanvasVisible={false}
      />

      <div className={styles.bodyContainer}>
        <div className={styles.listContainer}>
          {api_livestockData ? (
            api_livestockData.map((livestock) => {
              return (
                <Listcard
                  key={livestock.id}
                  name={livestock?.name_of_live_shed}
                  type={livestock?.livestock_type}
                  status={
                    livestock?.is_approve === "0" ? "Not approved" : "Approved"
                  }
                  owner_name={livestock.name_of_owner}
                  owner_contact={livestock.contact_number}
                  editHandler={editHandler}
                  ShowHandler={(e) => {
                    showHandler(livestock);
                  }}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className={styles.addNewContainer}>
          <img
            src="/svg/add_new.svg"
            alt="add_new"
            onClick={() => {
              route.push("/home/livestock-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
