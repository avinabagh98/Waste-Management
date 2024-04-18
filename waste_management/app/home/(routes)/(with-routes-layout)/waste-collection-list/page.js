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
    ward_id: ward_id,
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
          localStorage.removeItem("id")
          setToken(tokeN);
          setUserRole(localStorage.getItem("role_name"));


          //loadingHeaderData from local storage
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setWard_id(localStorage.getItem("ward_id"));
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


  // Handler Functions
  const editHandler = (item) => {
    localStorage.setItem("id", item?.id);
    route.push("/home/waste-collection-update");
  };

  const showHandler = (arrayData) => {
    Swal.fire({
      title: "Weekly Waste Collection Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <p style="text-align:left; color:var(--lic-blue)"><strong>Entry Date:</strong> ${arrayData?.date}</p>
          <p style="text-align:left"><strong>Aluminium:</strong> ${arrayData?.aluminium}</p>
          <p style="text-align:left"><strong>Cardboard:</strong> ${arrayData?.card_board}</p>
          <p style="text-align:left"><strong>Compostable Waste Collected:</strong> ${arrayData?.compostable_waste_collected}</p>
          <p style="text-align:left"><strong>Days of Collection in a Week :</strong> ${arrayData?.days_collection_in_week}</p>
          <p style="text-align:left"><strong>Glasss:</strong> ${arrayData?.glass}</p>
          <p style="text-align:left"><strong>House Id:</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>House Number:</strong> ${arrayData?.house_number}</p>
          <p style="text-align:left"><strong>House Name:</strong> ${arrayData?.resident_name}</p>
          <p style="text-align:left"><strong>Inert Waste:</strong> ${arrayData?.inert_waste}</p>
          <p style="text-align:left"><strong>Iron:</strong> ${arrayData?.iron}</p>
          <p style="text-align:left"><strong>Locality:</strong> ${arrayData?.locality_id}</p>
          <p style="text-align:left"><strong>Milkbag:</strong> ${arrayData?.milkbag}</p>
          <p style="text-align:left"><strong>Mohalla Committee:</strong> ${arrayData?.moholla_committee_id}</p>
          <p style="text-align:left"><strong>Other Metals:</strong> ${arrayData?.other_metals}</p>
          <p style="text-align:left"><strong>Other Plastic:</strong> ${arrayData?.other_plastic}</p>
          <p style="text-align:left"><strong>Others:</strong> ${arrayData?.others}</p>
          <p style="text-align:left"><strong>Paper:</strong> ${arrayData?.paper}</p>
          <p style="text-align:left"><strong>Pet Bottles :</strong> ${arrayData?.pet_bottles}</p>
          <p style="text-align:left"><strong>Field Staff:</strong> ${arrayData?.field_staff_id}</p>
          <p style="text-align:left"><strong>Supervisor:</strong> ${arrayData?.user_id}</p>
          <p style="text-align:left"><strong>User:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Ward Number:</strong> ${arrayData?.ward_no}</p>
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
                  <th style={{ textAlign: "center" }}>Action</th>

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
                      <td className={styles.td}>{index + 1}</td>
                      <td className={styles.td}>{formattedDate}</td>
                      <td className={styles.td}>{item.house_number}</td>
                      <td className={styles.td}>{item.resident_name}</td>
                      <td className={styles.td}>{item.moholla_committee_id}</td>
                      <td className={styles.actionWaste}>
                        <img onClick={() => { showHandler(item) }} src="/svg/eye.svg" alt="Show_details"></img>
                        <img onClick={() => { editHandler(item) }} src="/svg/edit.svg" alt="update"></img>
                      </td>
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
