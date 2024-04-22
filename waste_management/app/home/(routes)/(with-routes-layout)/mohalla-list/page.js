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

export default function MohallaListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_mohallaData, setApi_mohallaData] = useState([]);

  const [mohallas, setMohallas] = useState([]);
  const [mohallaName, setMohallaName] = useState([]);
  const [mohallaId, setMohallaId] = useState("");
  const [userId, setUserId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [locality, setLocality] = useState([]);
  const [localName, setLocalName] = useState([]);
  const [localityId, setLocalityId] = useState([]);


  //Loading Header Data States
  const [name, setName] = useState("");
  const [wardId, setWardId] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: wardId,
    block_name: block_name,
  };

  const mohallalistBody = {
    token: token,
  };

  const dropDownBody = {
    token: token,
    wardId: wardId,
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
          setWardId(localStorage.getItem("ward_id"));

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
        "/mohollaCommitteemeeting/list",
        mohallalistBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_mohallalist.status === 1) {
        console.log("API_list_ARRAY::", response_mohallalist.data.data.lists);
        setApi_mohallaData(response_mohallalist.data.data.lists);
      }
    }

    fetchLists();
  }, [token]);


  // Mohalla Committee List Dropdown Fetching
  useEffect(() => {
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
          console.log(response.data.data.lists);

          setMohallas(response.data.data.lists);
          const mohallas_name = response.data.data.lists.map(
            (item) => item.committee_name
          );
          setMohallaName(mohallas_name);
        }
      }

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Mohalla Committee List Dropdown State Update
  useEffect(() => {
    if (mohallas.length > 0) {
      const mohallaNames = mohallas.map((mohalla) => mohalla.committee_name);
      setMohallaName(mohallaNames);
      setMohallaId(mohallas[0].id);
    }
  }, [mohallas]);

  // Locality By Ward API Calling
  useEffect(() => {
    try {
      async function fetchDropdown() {
        const response = await sendRequest(
          "post",
          `/localitylist/List`,
          dropDownBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            `Locality lists in ward ${wardId} from API ::`,
            response.data.data.incomeList
          );
          setLocality(response.data.data.incomeList);
        }
      }

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Locality List Dropdown State Update
  useEffect(() => {
    if (locality.length > 0) {
      const localityaNames = locality.map((locality) => locality.village_name);
      setLocalName(localityaNames);
      setLocalityId(locality[0].id);
    }
  }, [locality]);



  // Handler Functions
  const editHandler = () => {
    route.push("/home/mohalla-edit");
  };

  const showHandler = (arrayData) => {
    console.log("show");
    Swal.fire({
      title: "Mohalla Details",
      html: `<swal-html>
            <div id="Mohalla Committee Details">
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

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <th>SL</th>
                <th>Date of Meeting</th>
                <th>Locality</th>
                <th>Mohalla</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {api_mohallaData.map((item, index) => {


                //Date Formatter
                const formatDate = (dateString) => {
                  const [year, month, day] = dateString.split('-');
                  return `${day}/${month}/${year}`;
                };

                // Mohalla Name Picker
                let getMohalla = mohallas.filter((item1) => (item1.id === item.moholla_committee_id));
                //Location Name Picker
                let getLocality = locality.filter((item1) => (item1.id === item.locality_id));

                const formattedDate = formatDate(item.date_of_meeting);
                return (
                  <tr key={index}>
                    <td className={styles.td}>{index + 1}</td>
                    <td className={styles.td}>{formattedDate}</td>
                    <td className={styles.td}>{getLocality[0]?.village_name}</td>
                    <td className={styles.td}>{getMohalla[0]?.committee_name}</td>
                    <td className={styles.actionWaste}>
                      <img
                        onClick={() => {
                          showHandler(item);
                        }}
                        src="/svg/eye.svg"
                        alt="Show_details"
                      ></img>
                      <img
                        onClick={() => {
                          editHandler(item.id);
                        }}
                        src="/svg/edit.svg"
                        alt="update"
                      ></img>
                    </td>
                  </tr>
                )
              }


              )}
            </tbody>
          </table>
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
