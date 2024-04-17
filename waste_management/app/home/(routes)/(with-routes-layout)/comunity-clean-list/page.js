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
  const editHandler = () => {
    route.push("/home/comunity-clean-edit");
  };

  const showHandler = (arrayData) => {
    Swal.fire({
      title: "Comunity Toilet Clean Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <p style="text-align:left; color:var(--lic-blue)"><strong>Entry Date:</strong> ${arrayData?.all_doors_close}</p>
          <p style="text-align:left"><strong>Community Toilet :</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>Supervisor:</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>Field Staff:</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>Mohalla Committee:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Cleaning Status:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Cleaning Material:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Sweeper Charge(Rs.):</strong> ${arrayData?.all_doors_close}</p>
          <p style="text-align:left"><strong>All Doors Close:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Electricity:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Is Hygine Training Taken:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Is Major Repair Done:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Is Minor Repair Done:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>O&M Collector:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Is O&M Register Maintained:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Is Sanatary Waste Managed:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Is Special Day Celebrated:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Boundary Wall:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Bulb:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Overheadtank:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Pump:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Roof:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Septictank:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Tiles:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Condition of Washbasin:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Total Number of House:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>User Charges per user (Rs.):</strong> ${arrayData?.ward_id}</p>
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
                      <td>{index + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{comunityToilet.community_toilet_id}</td>
                      <td>{comunityToilet.moholla_committee}</td>
                      <td>{comunityToilet.cleaning_status}</td>
                      <td onClick={() => { showHandler(comunityToilet) }}>Action</td>
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
              route.push("/home/comunity-clean-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
