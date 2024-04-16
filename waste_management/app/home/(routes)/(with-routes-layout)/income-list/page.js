"use client";
import styles from "./income.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Header from "@/components/Header/Header";
import Listcard from "@/components/Listcard";
import Textparser from "@/components/Textparser";

export default function IncomeListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_incomeData, setApi_incomeData] = useState([]);

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


  const incomeBody = {
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
        console.log("API_list_ARRAY::", response_income.data.data.incomeList);
        setApi_incomeData(response_income.data.data.incomeList);
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Function Declarations

  // Handler Functions
  const editHandler = () => {
    route.push("/home/income-edit");
  };

  const showHandler = (arrayData) => {
    console.log("show");
    Swal.fire({
      title: "Income Details",
      html: `<swal-html>
          <div id="IncomeDetails">

          <div style="display:flex; align-items:center; gap:10px">
          <p style="text-align:left"><strong>Income Id:</strong> ${arrayData?.id
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
          <p style="text-align:left"><strong >Income Name:</strong> ${arrayData?.name_of_live_shed
        }</p>
          <p style="text-align:left"><strong>Income Type:</strong> ${arrayData?.Income_type
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
          <Textparser text={"Income List"} />
        </div>

        {/* //Lists */}
        {/* <div className={styles.listContainer}>
          {api_incomeData ? (
            api_incomeData.map((income) => {
              return (
                <Listcard
                  key={income.id}
                  name={income?.name_of_live_shed}
                  type={income?.Income_type}
                  status={
                    income?.is_approve === "0" ? "Not approved" : "Approved"
                  }
                  owner_name={income.name_of_owner}
                  owner_contact={income.contact_number}
                  editHandler={editHandler}
                  ShowHandler={() => {
                    showHandler(income);
                  }}
                />
              );
            })
          ) : (
            <></>
          )}
        </div> */}

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
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {api_incomeData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.recylable_sold}</td>
                  <td>{item.plastic_sold}</td>
                  <td>{item.income_of_recylable}</td>
                  <td>{item.sale_of_manure}</td>
                  <td>{item.create_date}</td>
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
              route.push("/home/income-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
