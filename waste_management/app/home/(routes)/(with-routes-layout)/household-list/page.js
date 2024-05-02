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

export default function HouseholdListPage() {
  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [api_householdData, setApi_householdData] = useState([]);

  //Loading Header Data States
  const [name, setName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");

  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: ward_id,
    block_name: block_name,
  };

  const householdlistBody = {
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
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //household List Fetching
  useEffect(() => {
    async function fetchLists() {
      const response_householdlist = await sendRequest(
        "post",
        `/household/list`,
        householdlistBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response_householdlist.status === 1) {
        console.log(
          "API_list_ARRAY::",
          response_householdlist.data.data.house_holds
        );
        setApi_householdData(response_householdlist.data.data.house_holds);
      }
    }

    fetchLists();
  }, [token, ward_id]);

  // Function Declarations

  // Handler Functions
  const editHandler = (id) => {
    localStorage.setItem("id", id);
    route.push("/home/household-update");
  };

  const showHandler = (arrayData) => {
    Swal.fire({
      title: "Household Survey Details",
      html: `<swal-html>
          <div id="livestockDetails">

          <p style="text-align:left; color:var(--lic-blue)"><strong>Entry Date:</strong> ${arrayData?.date
        }</p>
          <p style="text-align:left; color:var(--lic-blue)"><strong>Location:</strong> ${arrayData?.lat
        }, ${arrayData?.longi}</p>
          <p style="text-align:left"><strong>Household Id:</strong> ${arrayData?.id
        }</p>
          <p style="text-align:left"><strong>Supervisor:</strong> ${arrayData?.supervisor
        }</p>
          <p style="text-align:left"><strong>Entry By:</strong> ${arrayData?.entry_by
        }</p>
         
          <p style="text-align:left"><strong>Number of Family Members:</strong> ${arrayData?.family_members
        }</p>
          <p style="text-align:left"><strong>Holding Number:</strong> ${arrayData?.holding_number
        }</p>
          <p style="text-align:left"><strong>Household Name:</strong> ${arrayData?.house_hold_name
        }</p>
          <p style="text-align:left"><strong>Home Base Manage Rate:</strong> ${arrayData?.home_base_manage_rat
        }</p>
          
          <p style="text-align:left"><strong>Doing Home Composting:</strong> ${arrayData?.is_composed === "1"
          ? "Yes"
          : arrayData?.is_composed === "0"
            ? "No"
            : ""
        }
          </p>
          <p style="text-align:left"><strong>Willing to construct individual soak pit:</strong> ${arrayData?.is_construct_individual === "1"
          ? "Yes"
          : arrayData?.is_construct_individual === "0"
            ? "No"
            : ""
        }</p>
       
          <p style="text-align:left"><strong>Doing Kitchen Garden:</strong> ${arrayData?.is_kitchen_garden === "1"
          ? "Yes"
          : arrayData?.is_kitchen_garden === "0"
            ? "No"
            : ""
        }</p>
          <p style="text-align:left"><strong>Is Grey water managed:</strong> ${arrayData?.is_manage_gray_water === "1"
          ? "Yes"
          : arrayData?.is_manage_gray_water === "0"
            ? "No"
            : ""
        }</p>
          <p style="text-align:left"><strong>Mobile Number:</strong> ${arrayData?.mobile_no
        }</p>
          <p style="text-align:left"><strong>Below 18 years child count:</strong> ${arrayData?.number_of_child_below_18_years
        }</p>
          <p style="text-align:left"><strong>Occupation:</strong> ${arrayData?.ocupation
        }</p>
          <p style="text-align:left"><strong>House Ownership Type:</strong> ${arrayData?.owner_type === "1"
          ? "Own"
          : arrayData?.owner_type === "0"
            ? "Rent"
            : ""
        }</p>
          <p style="text-align:left"><strong>Patients:</strong> ${arrayData?.patients
        }</p>
          <p style="text-align:left"><strong>Pets:</strong> ${arrayData?.pets
        }</p>
          <p style="text-align:left"><strong>Road:</strong> ${arrayData?.road_lane
        }</p>
          <p style="text-align:left"><strong>Has Toilet Inside House:</strong> ${arrayData?.toilet_in_house === "1" ? "Yes" : "No"
        }</p>
          <p style="text-align:left"><strong>Segregation Type:</strong> ${arrayData?.type_of_segragation === "0"
          ? "Not Segregated"
          : arrayData?.type_of_segragation === "1"
            ? "Partially Segregated"
            : "Fully Segregated"
        }</p>
          <p style="text-align:left"><strong>User Charge Per Month (Rs.):</strong> ${arrayData?.user_charge_par_month
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
          <Textparser text={"Household survey List"} />
        </div>

        {/* //Lists */}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SL</th>
                <th>Date</th>
                <th>Household Id</th>
                <th>Household Name</th>
                <th>Mohalla Committee</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {api_householdData.map((household, index) => {
                //Date Formatter
                const formatDate = (dateString) => {
                  const [year, month, day] = dateString.split("-");
                  return `${day}/${month}/${year}`;
                };

                const formattedDate = formatDate(household.date);

                return (
                  <tr key={household.id}>
                    <td className={styles.td}>{index + 1}</td>
                    <td className={styles.td}>{formattedDate}</td>
                    <td className={styles.td}>{household.id}</td>
                    <td className={styles.td}>{household.house_hold_name}</td>
                    <td className={styles.td}>{household.mohalla_committe}</td>
                    <td className={styles.actionWaste}>
                      <img
                        onClick={() => {
                          showHandler(household);
                        }}
                        src="/svg/eye.svg"
                        alt="Show_details"
                      ></img>
                      <img
                        onClick={() => {
                          editHandler(household.id);
                        }}
                        src="/svg/edit.svg"
                        alt="update"
                      ></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.addNewContainer}>
          <img
            src="/svg/add_new.svg"
            alt="add_new"
            onClick={() => {
              route.push("/home/household-add");
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
