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

export default function WasteCollectionListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_wasteCollectionData, setApi_wasteCollectionData] = useState([]);

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
  const wasteCollectionlistBody = {
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

  //Weekly waste collection List Fetching
  useEffect(() => {
    async function fetchLists() {
      const response_wasteCollectionlist = await sendRequest(
        "post",
        `/weeklywastecollection/data`,
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
          response_wasteCollectionlist.data.data.wastecollection_list
        );
        setApi_wasteCollectionData(
          response_wasteCollectionlist.data.data.wastecollection_list
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
            <p style="text-align:left"><strong>Registor No:</strong> ${arrayData?.regester_no
        }</p>
            <p style="text-align:left"><strong>Ward:</strong> ${arrayData?.ward
        }</p>
            <p style="text-align:left"><strong>Municipality:</strong> ${arrayData?.municipality_id
        }</p>
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
          <Textparser text={"Weekly Waste Collection List"} />
        </div>


        <div className={styles.ListContainerWasteCollection}>

          <div className={styles.textParser}><Textparser text={`Supervisor: ${localStorage.getItem("supervisor")}`} /> </div>

          {/* //Table Container */}
          <div className={styles.tableContainer}>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>House Number</th>
                  <th>Resident Name</th>
                  <th>Mohalla Committee</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody className={styles.table_body}>
                {api_wasteCollectionData.map((item, index) => {

                  //Date Formatter
                  const formatDate = (dateString) => {
                    const [year, month, day] = dateString.split('-');
                    return `${day}/${month}/${year}`;
                  };

                  const formattedDate = formatDate(item.date);
                  console.log("inside map function");

                  return (

                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{item.house_number}</td>
                      <td>{item.resident_name}</td>
                      <td>{item.moholla_committee_id}</td>
                      <td onClick={() => { showHandler(item) }}><img src="/svg/eye.svg" alt="eye_show"></img></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.addNewContainer}>
          <img
            src="/svg/add_new.svg"
            alt="add_new"
            onClick={() => {
              route.push("/home/waste-collection-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
