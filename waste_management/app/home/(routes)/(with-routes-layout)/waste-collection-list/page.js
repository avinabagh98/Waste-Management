"use client";
import styles from "@/app/home/(routes)/(with-routes-layout)/livestock-list/livestock.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Header from "@/components/Header/Header";
import Textparser from "@/components/Textparser";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function WasteCollectionListPage() {

  //Common States///
  const [userRole, setUserRole] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_wasteCollectionData, setApi_wasteCollectionData] = useState([]);

  //Loading Header Data States
  const [name, setName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");

  const [mohallas, setMohallas] = useState([]);
  const [mohallaName, setMohallaName] = useState([]);

  //loader states
  const [loaderVar1, setLoaderVar1] = useState(false);
  const [loaderVar2, setLoaderVar2] = useState(false);
  const [spinner, setSpinner] = useState(false);



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

  const dropDownBody = {
    token: token,
    wardId: ward_id,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // Common LocalStorage Fetching
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage !== null) {
      try {
        localStorage.setItem("previousPath", "/home/dashboard");
        async function fetchData() {
          const tokeN = localStorage.getItem("token");
          if (!tokeN) {
            route.push("/home/login");
          } else {
            localStorage.removeItem("id");
            setToken(tokeN);
            setUserRole(localStorage.getItem("role_name"));
            setSupervisor(localStorage.getItem("supervisor"));

            //loadingHeaderData from local storage
            setName(localStorage.getItem("name"));
            setDistrictName(localStorage.getItem("district"));
            setBLockName(localStorage.getItem("block"));
            setWard_id(localStorage.getItem("ward_id"));
          }
        }

        fetchData();
      } catch (error) {
        swal("Error", error, "error");
      }
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
        setLoaderVar1(true);
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

  // Mohalla Committee List Dropdown Fetching
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        async function fetchDropdown() {
          const response = await sendRequest(
            "post",
            `/mohollacommittee/List`,
            dropDownBody,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 1) {
            setLoaderVar2(true);
            console.log(response.data.data.lists);
            setMohallas(response.data.data.lists);

            // const mohallas_name = response.data.data.lists.map(
            //   (item) => item.committee_name
            // );
            // setMohallaName(mohallas_name);
          }
        }

        fetchDropdown();
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  const showHandler = (arrayData) => {

    //Date Formatter
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDate(arrayData?.date);
    const mohalla_ID = arrayData?.moholla_committee_id;

    if (mohallas.length > 0) {
      //from ID to Name
      const mohalla = mohallas.filter((item) => item.id === mohalla_ID);
      setMohallaName(mohalla[0]?.committee_name);
      console.log(mohallaName);
    }
    Swal.fire({
      title: "Weekly Waste Collection Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <p style="text-align:left; color:var(--lic-blue)"><strong>Entry Date:</strong> ${formattedDate}</p>
          <p style="text-align:left"><strong>Field Staff:</strong> ${name}</p>
          <p style="text-align:left"><strong>Supervisor:</strong> ${supervisor}</p>
          <p style="text-align:left"><strong>User:</strong> ${name}</p>
          <p style="text-align:left"><strong>Ward Number:</strong> ${arrayData?.ward_no}</p>
          <p style="text-align:left"><strong>House Id:</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>House Number:</strong> ${arrayData?.house_number}</p>
          <p style="text-align:left"><strong>House Name:</strong> ${arrayData?.resident_name}</p>
          <p style="text-align:left"><strong>Locality:</strong> ${arrayData?.locality_id}</p>
          <p style="text-align:left"><strong>Mohalla Committee:</strong> ${mohallaName}</p>
          <p style="text-align:left"><strong>Aluminium (Kg):</strong> ${arrayData?.aluminium}</p>
          <p style="text-align:left"><strong>Cardboard (Kg):</strong> ${arrayData?.card_board}</p>
          <p style="text-align:left"><strong>Compostable Waste Collected (Kg):</strong> ${arrayData?.compostable_waste_collected}</p>
          <p style="text-align:left"><strong>Days of Collection in a Week (days):</strong> ${arrayData?.days_collection_in_week}</p>
          <p style="text-align:left"><strong>Glasss (Kg):</strong> ${arrayData?.glass}</p>
          <p style="text-align:left"><strong>Inert Waste (Kg):</strong> ${arrayData?.inert_waste}</p>
          <p style="text-align:left"><strong>Iron (Kg):</strong> ${arrayData?.iron}</p>         
          <p style="text-align:left"><strong>Milkbag (Kg):</strong> ${arrayData?.milkbag}</p>
          <p style="text-align:left"><strong>Other Metals (Kg):</strong> ${arrayData?.other_metals}</p>
          <p style="text-align:left"><strong>Other Plastic (Kg):</strong> ${arrayData?.other_plastic}</p>
          <p style="text-align:left"><strong>Others (Kg):</strong> ${arrayData?.others}</p>
          <p style="text-align:left"><strong>Paper (Kg):</strong> ${arrayData?.paper}</p>
          <p style="text-align:left"><strong>Pet Bottles (Kg):</strong> ${arrayData?.pet_bottles}</p>
         
          </div>
        </swal-html>`,
    });
  };

  return (
    loaderVar1 && loaderVar2 ?
      !spinner ?
        // Content Load
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

              <div className={styles.textParser}><Textparser text={`Supervisor: ${supervisor}`} /> </div>

              {/* //Table Container */}
              <div className={styles.tableContainer}>

                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Date</th>
                      {/* <th>House Number</th> */}
                      <th>Resident Name</th>
                      {/* <th>Mohalla Committee</th> */}
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

                      return (

                        <tr key={item.id}>
                          <td className={styles.td}>{index + 1}</td>
                          <td className={styles.td}>{formattedDate}</td>
                          {/* <td className={styles.td}>{item.house_number}</td> */}
                          <td className={styles.td}>{item.resident_name}</td>
                          {/* <td className={styles.td}>{item.moholla_committee_id}</td> */}
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
                  setSpinner(true);
                  route.push("/home/waste-collection-add");
                }}
              ></img>
            </div>
          </div>
        </> :
        // Spinner
        <>
          <div className={styles.spinner}>
            <img src="/svg/loader.svg" alt="spinner"></img>
          </div>
        </>
      :
      //Skeleton loader
      <>
        <Header
          loadingdata={loadingHeaderData}
          userRole={userRole}
          isOffCanvasVisible={false}
        />

        <div className={styles.bodyContainer}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Skeleton width={200} height={15} baseColor="#6fd199" borderRadius={20} />
          </div>

          {/* List Container */}
          <div className={styles.ListContainerWasteCollection}>
            <div className={styles.textParser}>
              <Skeleton width={300} height={10} baseColor="#f2d98d" borderRadius={50} />
            </div>

            {/* Table Container */}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th><Skeleton width={25} baseColor="#6b96db" /></th>
                    <th><Skeleton width={50} baseColor="#6b96db" /></th>
                    <th><Skeleton width={100} baseColor="#6b96db" /></th>
                    <th style={{ textAlign: "center" }}><Skeleton width={50} /></th>
                  </tr>
                </thead>
                <tbody className={styles.table_body}>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className={styles.td}><Skeleton width={25} /></td>
                      <td className={styles.td}><Skeleton width={50} /></td>
                      <td className={styles.td}><Skeleton width={100} /></td>
                      <td className="text-center">
                        <Skeleton circle={true} height={30} width={30} />
                        <Skeleton circle={true} height={30} width={30} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Container */}
          <div className={styles.addNewContainer}>
            <Skeleton circle={true} height={50} width={50} baseColor="#6fd199" />
          </div>
        </div>
      </>
  );
}
