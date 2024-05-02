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
  const [filteredData, setFilteredData] = useState([]);

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
    localStorage.setItem("previousPath", "/home/dashboard");
    try {
      async function fetchData() {
        const tokeN = await localStorage.getItem("token");
        if (!tokeN) {
          route.push("/home/login");
        } else {
          localStorage.removeItem("id");
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
        console.log(
          "API_list_ARRAY::",
          response_comunityClean.data.data.ctoilet_list
        );
        setApi_comunityCleanData(response_comunityClean.data.data.ctoilet_list);
        setFilteredData(response_comunityClean.data.data.ctoilet_list);
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Function Declarations
  const filterPending = () => {
    const pendingData = api_comunityCleanData.filter(item => item.cleaning_status === "0")
    setFilteredData(pendingData);
  }

  const resetFilter = () => {
    setFilteredData(api_comunityCleanData);
  }



  // Handler Functions
  const editHandler = (item) => {
    localStorage.setItem("id", item.id);
    route.push("/home/community-clean-update");
  };

  const showHandler = (arrayData) => {
    Swal.fire({
      title: "Comunity Toilet Clean Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <p style="text-align:left; color:var(--lic-blue)"><strong>Entry Date:</strong> ${arrayData?.entry_date}</p>
          <p style="text-align:left"><strong>Community Toilet :</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>Supervisor:</strong> ${arrayData?.supervisor_id}</p>
          <p style="text-align:left"><strong>Field Staff:</strong> ${arrayData?.field_staff}</p>
          <p style="text-align:left"><strong>Mohalla Committee:</strong> ${arrayData?.moholla_committee}</p>
          <p style="text-align:left"><strong>Cleaning Status:</strong> ${arrayData?.cleaning_status}</p>
          <p style="text-align:left"><strong>Cleaning Material:</strong> ${arrayData?.cleaning_materials}</p>
          <p style="text-align:left"><strong>Sweeper Charge(Rs.):</strong> ${arrayData?.swiper_charge}</p>
          <p style="text-align:left"><strong>All Doors Close:</strong> ${arrayData?.all_doors_close}</p>
          <p style="text-align:left"><strong>Electricity:</strong> ${arrayData?.electricity}</p>
          <p style="text-align:left"><strong>Is Hygine Training Taken:</strong> ${arrayData?.htgentrain_undertaken}</p>
          <p style="text-align:left"><strong>Is Major Repair Done:</strong> ${arrayData?.major_repair}</p>
          <p style="text-align:left"><strong>Is Minor Repair Done:</strong> ${arrayData?.minor_repair}</p>
          <p style="text-align:left"><strong>O&M Collector:</strong> ${arrayData?.om_collector}</p>
          <p style="text-align:left"><strong>Is O&M Register Maintained:</strong> ${arrayData?.om_register_maintained}</p>
          <p style="text-align:left"><strong>Is Sanatary Waste Managed:</strong> ${arrayData?.sanitary_waste_managed}</p>
          <p style="text-align:left"><strong>Is Special Day Celebrated:</strong> ${arrayData?.special_day_celebrated}</p>
          <p style="text-align:left"><strong>Condition of Boundary Wall:</strong> ${arrayData?.condition_of_boundarywall}</p>
          <p style="text-align:left"><strong>Condition of Bulb:</strong> ${arrayData?.condition_of_bulb}</p>
          <p style="text-align:left"><strong>Condition of Overheadtank:</strong> ${arrayData?.condition_of_overheadtank}</p>
          <p style="text-align:left"><strong>Condition of Pump:</strong> ${arrayData?.condition_of_pump}</p>
          <p style="text-align:left"><strong>Condition of Roof:</strong> ${arrayData?.condition_of_roof}</p>
          <p style="text-align:left"><strong>Condition of Septictank:</strong> ${arrayData?.condition_of_septictank}</p>
          <p style="text-align:left"><strong>Condition of Tiles:</strong> ${arrayData?.condition_of_tiles}</p>
          <p style="text-align:left"><strong>Condition of Washbasin:</strong> ${arrayData?.condition_of_washbasin}</p>
          <p style="text-align:left"><strong>Total Number of House:</strong> ${arrayData?.total_house_mc_no}</p>
          <p style="text-align:left"><strong>User Charges per user (Rs.):</strong> ${arrayData?.total_usercharge_collect}</p>
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
        <div className={styles.tableContainer}>
          <>
            <div className={styles.table_filter}>

              <div className={styles.table_filter_all} onClick={resetFilter} >
                All
              </div>

              <div className={styles.table_filter_pending} onClick={filterPending}>
                Pending
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Entry_date</th>
                  <th>Community Toilet</th>
                  <th>Mohalla Committee</th>
                  <th>Cleaning Status</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody className={styles.table_body}>
                {filteredData.map((comunityToilet, index) => {

                  //Date Formatter
                  const formatDate = (dateString) => {
                    const [year, month, day] = dateString.split('-');
                    return `${day}/${month}/${year}`;
                  };

                  const formattedDate = formatDate(comunityToilet.entry_date);
                  console.log("inside map function");

                  return (

                    <tr key={comunityToilet.id}>
                      <td className={styles.td}>{index + 1}</td>
                      <td className={styles.td}>{formattedDate}</td>
                      <td className={styles.td}>{comunityToilet.community_toilet_id}</td>
                      <td className={styles.td}>{comunityToilet.moholla_committee}</td>
                      <td className={styles.td}>{comunityToilet.cleaning_status}</td>
                      <td className={styles.actionWaste} >
                        <img onClick={() => { showHandler(comunityToilet) }} src="/svg/eye.svg" alt="Show_details"></img>
                        <img onClick={() => { editHandler(comunityToilet) }} src="/svg/edit.svg" alt="update"></img></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        </div>
        <div className={styles.addNewContainer}>
          <img
            src="/svg/add_new.svg"
            alt="add_new"
            onClick={() => {
              route.push("/home/community-clean-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
