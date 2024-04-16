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

export default function MohallaListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_mohallaData, setApi_mohallaData] = useState([]);

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



  const mohallalistBody = {
    token: token,
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

  //Mohalla List Fetching
  useEffect(() => {
    async function fetchLists() {
      const response_mohallalist = await sendRequest(
        "post",
        '/mohollaCommitteemeeting/list',
        mohallalistBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_mohallalist.status === 1) {
        console.log("API_list_ARRAY::", response_mohallalist.data.data);
        // setApi_mohallaData(response_mohallalist.data.data.lists);
      }
    }

    fetchLists();
  }, [token]);

  // Function Declarations

  // Handler Functions
  const editHandler = () => {
    route.push("/home/mohalla-edit");
  };

  const showHandler = (arrayData) => {
    console.log("show");
    Swal.fire({
      title: "Mohalla Details",
      html: `<swal-html>
            <div id="MohallaDetails">
            <p style="text-align:left"><strong>Id:</strong> ${arrayData?.id}</p>
            <p style="text-align:left"><strong>Registor No:</strong> ${arrayData?.regester_no
        }</p>
            <p style="text-align:left"><strong>Ward:</strong> ${arrayData?.ward
        }</p>
            <p style="text-align:left"><strong>Municipality:</strong> ${arrayData?.municipality_id
        }</p>
            <p style="text-align:left"><strong>Location:</strong> ${arrayData?.latitude
        }, ${arrayData?.longitude}</p>
            <p style="text-align:left"><strong >Mohalla Name:</strong> ${arrayData?.name_of_live_shed
        }</p>
            <p style="text-align:left"><strong>Mohalla Type:</strong> ${arrayData?.Mohalla_type
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
          <Textparser text={"Mohalla Committee List"} />
        </div>

        {/* //List */}
        <div className={styles.listContainer}>
          {api_mohallaData ? (
            api_mohallaData.map((mohalla) => {
              return (
                <Listcard
                  key={mohalla.id}
                  name={mohalla.household_mc}
                  type={mohalla.Mohalla_type}
                  owner_name={mohalla.supervisor_id}
                  owner_contact={mohalla.contact_number}
                  editHandler={editHandler}
                  ShowHandler={(e) => {
                    showHandler(mohalla);
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
              route.push("/home/mohalla-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
