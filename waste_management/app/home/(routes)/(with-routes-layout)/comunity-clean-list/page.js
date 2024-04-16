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
import Textparser from "@/components/Textparser";

export default function ComunityCleanListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_comunityCleanData, setApi_comunityCleanData] = useState([]);
  //Loading Header Data States
  const [name, setName] = useState("");
  const [wardName, setWardName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");


  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_name: wardName,
    block_name: block_name,
  };

  const comunityCleanBody = {
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
          //loadingHeaderData from local storage
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setWardName(localStorage.getItem("ward_id"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //Comunity Clean List Fetching
  useEffect(() => {
    async function fetchLists() {
      const response_comunityClean = await sendRequest(
        "post",
        `/cleaningcommunityToilettype/list`,
        comunityCleanBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_comunityClean.status === 1) {
        console.log("API_list_ARRAY::", response_comunityClean.data.data.ctoilet_list);
        //   setApi_comunityCleanData(
        //     response_comunityClean.data.data.comunityCleanList
        //   );
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Function Declarations

  // Handler Functions
  const editHandler = () => {
    route.push("/home/comunity-clean-edit");
  };

  const showHandler = (arrayData) => {
    console.log("show");
    Swal.fire({
      title: "comunityClean Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <div style="display:flex; align-items:center; gap:10px">
          <p style="text-align:left"><strong>Livestock Id:</strong> ${arrayData?.id
        }</p>
          <p style="text-align:left"><strong>Registor No:</strong> ${arrayData?.regester_no
        }</p>
          </div>
          
          <div style="display:flex; align-items:center;gap:10px">
          <p style="text-align:left"><strong>Ward:</strong> ${arrayData?.ward
        }</p>
          <p style="text-align:left"><strong>Municipality:</strong> ${arrayData?.municipality_id
        }</p>
          </div>

          <p style="text-align:left"><strong>Location:</strong> ${arrayData?.latitude
        }, ${arrayData?.longitude}</p>
          <p style="text-align:left"><strong >Livestock Name:</strong> ${arrayData?.name_of_live_shed
        }</p>
          <p style="text-align:left"><strong>Livestock Type:</strong> ${arrayData?.livestock_type
        }</p>
          <p style="text-align:left"><strong>Name of Owner:</strong> ${arrayData?.name_of_owner
        }</p>
          <p style="text-align:left"><strong>Contact Number:</strong> ${arrayData?.contact_number
        }</p>
          <p style="text-align:left"><strong>Compostable Waste (KG):</strong> ${arrayData?.compostable_waste
        }</p>
          <p style="text-align:left"><strong>Is Approved:</strong> ${arrayData?.is_approve === 0 ? "Not approved" : "Approved"
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

        {/* //breadcrumb */}
        <div className={styles.breadcrumb}>
          <Textparser text={"Community Toilet List"} />
        </div>

        {/* //Lists */}
        <div className={styles.listContainer}>
          {api_comunityCleanData ? (
            api_comunityCleanData.map((comunityClean) => {
              return (
                <Listcard
                  key={comunityClean.id}
                  name={comunityClean?.name_of_live_shed}
                  type={comunityClean?.livestock_type}
                  status={
                    comunityClean?.is_approve === "0"
                      ? "Not approved"
                      : "Approved"
                  }
                  owner_name={comunityClean.name_of_owner}
                  owner_contact={comunityClean.contact_number}
                  editHandler={editHandler}
                  ShowHandler={() => {
                    showHandler(comunityClean);
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
              route.push("/home/comunity-clean-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
