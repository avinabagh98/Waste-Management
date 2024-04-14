"use client";
import styles from "@/app/home/(routes)/(with-routes-layout)/livestock-list/livestock.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Header from "@/components/Header/Header";
import Listcard from "@/components/Listcard";

export default function WasteCollectionListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_wasteCollectionData, setApi_wasteCollectionData] = useState([]);

  //Common Other declarations///
  const loadingHeaderData = {
    name: userRole,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const wasteCollectionlistBody = {
    token: token,
    ward_id: ward_id,
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
      const response_wasteCollectionlist = await sendRequest(
        "post",
        `/weeklywastecollection/list`,
        wasteCollectionlistBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_wasteCollectionlist.status === 1) {
        console.log(
          "API_list_ARRAY::",
          response_wasteCollectionlist.data.data.lists
        );
        setApi_wasteCollectionData(
          response_wasteCollectionlist.data.data.lists
        );
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Function Declarations

  // Handler Functions
  const editHandler = () => {
    route.push("/home/wasteCollection-edit");
  };

  const showHandler = (arrayData) => {
    console.log("show");
    Swal.fire({
      title: "wasteCollection Details",
      html: `<swal-html>
            <div id="livestockDetails">
            <p style="text-align:left"><strong>Id:</strong> ${arrayData?.id}</p>
            <p style="text-align:left"><strong>Registor No:</strong> ${
              arrayData?.regester_no
            }</p>
            <p style="text-align:left"><strong>Ward:</strong> ${
              arrayData?.ward
            }</p>
            <p style="text-align:left"><strong>Municipality:</strong> ${
              arrayData?.municipality_id
            }</p>
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
          {api_wasteCollectionData ? (
            api_wasteCollectionData.map((wasteCollection) => {
              return (
                <Listcard
                  key={wasteCollection.id}
                  name={wasteCollection.household_mc}
                  type={wasteCollection.livestock_type}
                  owner_name={wasteCollection.supervisor_id}
                  owner_contact={wasteCollection.contact_number}
                  editHandler={editHandler}
                  ShowHandler={(e) => {
                    showHandler(wasteCollection);
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
