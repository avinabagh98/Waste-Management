"use client";
import styles from "./income.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Header from "@/components/Header/Header";
import Textparser from "@/components/Textparser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function IncomeListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [api_incomeData, setApi_incomeData] = useState([]);

  const [mohalla, setMohalla] = useState([]);
  const [locality, setLocality] = useState([]);
  const [wasteCollectors, setWasteCollectors] = useState([]);
  const [supervisor, setSupervisor] = useState([]);

  //Loading Header Data States
  const [name, setName] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [gp, setGp] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");

  //Loader States
  const [isloading, setIsLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: gp,
    block_name: block_name,
    supervisor: supervisor,
  };

  const incomeBody = {
    token: token,
    ward_id: ward_id,
  };

  const dropDownBody = {
    token: token,
    wardId: ward_id,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // Common LocalStorage Fetching -----------------------------
  useEffect(() => {
    localStorage.setItem("previousPath", "/home/dashboard");
    setSupervisor(localStorage.getItem("supervisor"));
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
          setGp(localStorage.getItem("gp"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //Income List Fetching
  useEffect(() => {
    async function fetchLists() {
      const response_income = await sendRequest(
        "post",
        `/income/list`,
        incomeBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_income.status === 1) {
        setIsLoading(false);
        console.log("API_list_ARRAY::", response_income.data.data.incomeList);
        setApi_incomeData(response_income.data.data.incomeList);
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Mohalla Committee By Ward API Calling
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
          console.log(
            `Mohalla lists in ward ${ward_id} from API ::`,
            response.data.data.lists
          );
          setMohalla(response.data.data.lists);
        }
      }

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Waste Collector By Ward API Calling
  useEffect(() => {
    try {
      async function fetchDropdown() {
        const response = await sendRequest(
          "post",
          `/westecollector/List`,
          dropDownBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 1) {
          console.log(
            `Waste Collectors in ward ${ward_id} from API ::`,
            response.data.data.incomeList
          );
          setWasteCollectors(response.data.data.incomeList);
        }
      }

      fetchDropdown();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

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
            `Locality lists in ward ${ward_id} from API ::`,
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

  // Function Declarations -----------------------------------
  //Date Formatter
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const getMohallaName = (array, id) => {
    if (array.length > 0) {
      let mohalla = array.filter((item) => item.id == id);
      return mohalla[0].committee_name;
    }
  };

  const getLocalityName = (array, id) => {
    if (array.length > 0) {
      let locality = array.filter((item) => item.id == id);
      return locality[0].village_name;
    }
  };

  const getWasteCollectorName = (array, id) => {
    if (array.length > 0) {
      console.log("array_testing", array); //testing
      let Collector = array.filter((item) => item.id == id);
      return Collector[0].user_name;
    }
  };

  // Handler Functions ----------------------
  const editHandler = (id) => {
    setSpinner(true);
    localStorage.setItem("id", id);
    route.push("/home/income-update");
  };

  const showHandler = (arrayData) => {
    const mohalla_name = getMohallaName(mohalla, arrayData.mohalla_id);
    const locality_name = getLocalityName(locality, arrayData.locality_id);
    const collector_name = getWasteCollectorName(
      wasteCollectors,
      arrayData.waste_collector
    );
    const formattedDate = formatDate(arrayData.create_date);
    console.log("show");
    Swal.fire({
      title: "Income Details",
      html: `<swal-html>
          <div id="IncomeDetails">

          <p style="text-align:left"><strong>Income Id:</strong> ${arrayData?.id}</p>
          <p style="text-align:left"><strong>Created Date:</strong> ${formattedDate}</p>
          <p style="text-align:left"><strong>Ward:</strong> ${arrayData?.ward_id}</p>
          <p style="text-align:left"><strong>Municipality:</strong> ${arrayData?.municipality_id}</p>
          <p style="text-align:left"><strong >Mohalla:</strong> ${mohalla_name}</p>
          <p style="text-align:left"><strong>Locality:</strong> ${locality_name}</p>
          <p style="text-align:left"><strong>Waste Collector:</strong> ${collector_name}</p>
          <p style="text-align:left"><strong>Income From Recycled Waste:</strong> ${arrayData?.income_of_recylable}</p>
          <p style="text-align:left"><strong>Plastic Sold(Kg):</strong> ${arrayData?.plastic_sold}</p>
          <p style="text-align:left"><strong>Recyclable Waste Sold (Kg):</strong> ${arrayData?.recylable_sold}</p>
          <p style="text-align:left"><strong>Manure Sold(Kg):</strong> ${arrayData?.sale_of_manure}</p>
          </div>
        </swal-html>`,
    });
  };

  return !isloading ? (
    //Content
    <>
      <Header
        loadingdata={loadingHeaderData}
        userRole={userRole}
        isOffCanvasVisible={false}
      />

      <div className={styles.bodyContainer}>
        {spinner ? (
          <>
            <div className={styles.spinnerContainer}>
              <img src="/svg/loader.svg" alt="loader"></img>
            </div>
          </>
        ) : null}

        {/* //breadcrumb */}
        <div className={styles.breadcrumb}>
          <Textparser text={"Income List"} />
        </div>

        {/* //Lists */}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <th>SL</th>
                <th>Recyclable Waste Sold (KG)</th>
                <th>Plastic Sold (KG)</th>
                <th>Recyclable Waste Sales (Rs)</th>
                <th>Manure Sales(Rs)</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {api_incomeData.map((item, index) => (
                <tr key={index}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.recylable_sold}</td>
                  <td className={styles.td}>{item.plastic_sold}</td>
                  <td className={styles.td}>{item.income_of_recylable}</td>
                  <td className={styles.td}>{item.sale_of_manure}</td>
                  <td className={styles.td}>{item.create_date}</td>
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
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.addNewContainer}>
          <img
            src="/svg/add_new.svg"
            alt="add_new"
            onClick={() => {
              setSpinner(true);
              route.push("/home/income-add");
            }}
          ></img>
        </div>
      </div>
    </>
  ) : (
    //Skeleton Loader
    <>
      <Header
        loadingdata={loadingHeaderData}
        userRole={userRole}
        isOffCanvasVisible={false}
      />

      <div className={styles.bodyContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Skeleton width={200} height={10} baseColor="#6fd199" />
        </div>

        {/* Table Container */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <th>
                  <Skeleton width={30} height={10} baseColor="#6b96db" />
                </th>
                <th>
                  <Skeleton width={90} height={10} baseColor="#6b96db" />
                </th>
                <th>
                  <Skeleton width={70} height={10} baseColor="#6b96db" />
                </th>
                <th>
                  <Skeleton width={40} height={10} baseColor="#6b96db" />
                </th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {/* Skeleton loader for table rows */}
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className={styles.td}>
                    <Skeleton width={30} />
                  </td>
                  <td className={styles.td}>
                    <Skeleton width={90} />
                  </td>
                  <td className={styles.td}>
                    <Skeleton width={70} />
                  </td>

                  <td className="text-center">
                    <Skeleton circle={true} width={20} height={20} />
                    <Skeleton circle={true} width={20} height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Container */}
        <div className={styles.addNewContainer}>
          <Skeleton circle={true} width={50} height={50} baseColor=" #6fd199" />
        </div>
      </div>
    </>
  );
}
