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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { marketList } from "@/api/responseStore";

export default function HouseholdListPage() {





  //Common States///
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [gp, setGp] = useState("");
  const [api_householdData, setApi_householdData] = useState([]);
  const [filterSelected, setFilterSelected] = useState("1");

  //Loading Header Data States
  const [name, setName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [block_name, setBLockName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  //loading states
  const [isLoading, setIsLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [typeOfWGU, setTypeOfWGU] = useState("1");
  const [allMarkets, setAllMarkets] = useState("");
  const [marketName, setMarketName] = useState("");
  const [locality, setLocality] = useState([]);



  // ////////////////////////////////******************************************///////////////////////////////// /
  //Common Other declarations///
  const loadingHeaderData = {
    name: name,
    district_name: district_name,
    ward_id: gp,
    block_name: block_name,
    supervisor: supervisor,
  };

  const householdlistBody = {
    token: token,
    wardId: ward_id,
    typeOfWGU: typeOfWGU,
  };

  //Any Key names in Swal Show Handler API response should be in this Object
  const ApiResponse_keyDescriptions = {
    addahar_no: "Aadhaar Number",
    all_shopkeepers_agree: "All Shopkeepers Agree",
    amount_of_waste_generation: "Amount of Waste Generation",
    appx_time: "Approximate Time",
    bio_degradable_waste_in_day: "Biodegradable Waste in a Day",
    biodegradable_waste: "Biodegradable Waste",
    bulk_entry_id: "Bulk Entry ID",
    caste: "Caste",
    daily_bio_degradable_waste: "Daily Biodegradable Waste (Kg)",
    daily_hazardous_waste: "Daily Hazardous Waste(Kg)",
    daily_nonbio_degradable_waste: "Daily Non-biodegradable Waste(Kg)",
    daily_sanatary_waste: "Daily Sanitary Waste(Kg)",
    daily_waste_generate: "Daily Waste Generate(Kg)",
    daily_waste_manage: "Daily Waste Manage(Kg)",
    daily_waste_managed_here: "Daily Waste Managed Here(Kg)",
    date: "Date",
    entry_by: "Entry By",
    entry_date: "Entry Date",
    family_members: "Family Members",
    holding_number: "Holding Number",
    home_base_manage_rat: "Home Base Manage Rate",
    house_hold_name: "Household Name",
    how_many_animal: "Number of Animals",
    how_many_patient: "Number of Patients",
    id: "ID",
    identification_number: "Identification Number",
    institution_name: "Institution Name",
    is_bulk: "Is Bulk",
    is_composed: "Is Composed",
    is_construct_individual: "Is Construct Individual",
    is_delete: "Is Delete",
    is_gram_panchayat_garbage_collects: "Is Gram Panchayat Collects Garbage",
    is_kitchen_garden: "Is Kitchen Garden",
    is_lock: "Is Lock",
    is_manage_gray_water: "Is Manage Grey Water",
    is_managing_black_water: "Is Managing Black Water",
    is_school_have_garden: "Is School Have Garden",
    is_school_manage_biodegradable: "Is School Manage Biodegradable",
    is_waste_collection_services_charge: "Is Waste Collection Services Charge",
    lat: "Latitude",
    locality: "Locality",
    longi: "Longitude",
    market_committee_presence: "Market Committee Presence",
    market_name: "Market Name",
    midday_meal_scheme: "Midday Meal Scheme",
    mobile_no: "Mobile Number",
    mohalla_committe: "Mohalla Committee",
    name_of_owner: "Name of Owner",
    name_of_resident: "Name of Resident",
    name_of_shop: "Name of Shop",
    nature_of_house: "Nature of House",
    nonbio_degradable_waste_in_day: "Non-biodegradable Waste in a Day",
    number_of_child_below_18_years: "Number of Children Below 18 Years",
    ocupation: "Occupation",
    owner_type: "Owner Type",
    ownership_of_house: "Ownership of House",
    patients: "Patients",
    pets: "Pets",
    religion: "Religion",
    road: "Road",
    road_lane: "Road Lane",
    sansad_no: "Sansad Number",
    select_type_of_id: "Select Type of ID",
    shop_located: "Shop Located",
    slr_no: "SLR Number",
    status: "Status",
    sub_type: "Sub Type",
    supervisor: "Supervisor",
    toilet_in_house: "Toilet in House",
    total_bio_degradable_waste_in_daily: "Total Biodegradable Waste Daily(Kg)",
    total_boys_no: "Total Number of Boys",
    total_girls_no: "Total Number of Girls",
    total_hazardous_waste_in_daily: "Total Hazardous Waste Daily(Kg)",
    total_no_fish_shop: "Total Number of Fish Shops",
    total_no_foods_shop: "Total Number of Food Shops",
    total_no_grocerys_shop: "Total Number of Grocery Shops",
    total_no_hotels: "Total Number of Hotels",
    total_no_meat_shop: "Total Number of Meat Shops",
    total_no_other_shop: "Total Number of Other Shops",
    total_no_restaurants: "Total Number of Restaurants",
    total_no_vegetables_shop: "Total Number of Vegetable Shops",
    total_nonbio_degradable_waste_in_daily:
      "Total Non-biodegradable Waste Daily(Kg)",
    total_shop_no: "Total Number of Shops",
    total_students_no: "Total Number of Students",
    total_waste_generate_in_daily: "Total Waste Generated Daily(Kg)",
    type_of_institutions: "Type of Institutions",
    type_of_segragation: "Type of Segregation",
    type_of_shop: "Type of Shop",
    type_of_toilet: "Type of Toilet",
    type_of_wgu: "Type of WGU",
    user_charge_par_month: "User Charge Per Month",
    user_id: "User ID",
    waste_collection_services_charge: "Waste Collection Services Charge",
    which_district: "District",
    which_municipalty: "Municipality",
    which_state: "State",
    which_word: "Word",
    will_want_to_pay: "Will Want to Pay",
    willing_to_manage_by_own: "Willing to Manage by Own",
    your_daily_waste: "How you manage daily waste",
  };

  const filterObject = (obj) => {
    const filteredObj = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value !== "-1") {
        filteredObj[key] = value;
      }
    }

    return filteredObj;
  };

  const dropDownBody = {
    token: token,
    wardId: ward_id,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // ////////////////////////////////******************************************///////////////////////////////// /
  // Common LocalStorage Fetching
  useEffect(() => {
    localStorage.setItem("previousPath", "/home/dashboard");
    setSupervisor(localStorage.getItem("supervisor"));
    setToken(localStorage.getItem("token"));
    const tokeN = localStorage.getItem("token");
    const ward_id = localStorage.getItem("ward_id");

    try {
      async function fetchData() {
        const tokeN = localStorage.getItem("token");
        setToken(tokeN);
        if (!tokeN) {
          route.push("/home/login");
        } else {
          localStorage.removeItem("id");
          setWard_id(localStorage.getItem("ward_id"));
          setUserRole(localStorage.getItem("role_name"));

          //loadingHeaderData from local storage
          setName(localStorage.getItem("name"));
          setDistrictName(localStorage.getItem("district"));
          setBLockName(localStorage.getItem("block"));
          setGp(localStorage.getItem("gp"));

          //set data to the body initially
          householdlistBody.token = tokeN;
          householdlistBody.wardId = localStorage.getItem("ward_id");
          householdlistBody.typeOfWGU = "1";

          //Market Api calling
          const data_MarketARR = await marketList({ token: tokeN });

          setMarketName(data_MarketARR);
        }
      }

      //Locality Fetching
      async function fetchLocality() {
        const response = await sendRequest(
          "post",
          `/localitylist/List`,
          {
            token: tokeN,
            wardId: ward_id
          },
          {
            headers: {
              Authorization: `Bearer ${tokeN}`,
            },
          }
        );
        console.log("Api-response locality ###", response);
        if (response.status === 1) {
          console.log(
            `Locality lists in ward ${ward_id} from API ::`,
            response.data.data.incomeList
          );
          setLocality(response.data.data.incomeList);
          localStorage.setItem("LocalityList", JSON.stringify(response.data.data.incomeList));
        }
      }

      fetchData();
      fetchLocality();
    } catch (error) {
      swal("Error", error, "error");
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchLists() {
        marketList({ token: token }).then((res) => {
          setAllMarkets(res);
          localStorage.setItem("allMarkets", JSON.stringify(res));
        });

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
        console.log("Api-body", householdlistBody); //testing
        console.log(`Api-response at ${typeOfWGU}`, response_householdlist); //testing
        if (response_householdlist.status === 1) {
          setIsLoading(false);
          console.log(
            "API_HouseholdLists_ARRAY::",
            response_householdlist.data.data.house_holds
          );
          setApi_householdData(response_householdlist.data.data.house_holds);
        }
        if (
          response_householdlist.status === 0 &&
          api_householdData.length === 0
        ) {
          setIsLoading(false);
          swal("info", "No Data Present", "info");
        }
      }

      fetchLists();
    } catch (error) {
      console.log(error);
    }
  }, [typeOfWGU]);

  // ////////////////////////////////******************************************///////////////////////////////// /
  const editHandler = (id) => {
    // setSpinner(true);
    localStorage.setItem("id", id);
    route.push("/home/household-update");
  };

  const showHandler = (arrayData) => {
    const generateSurveyDetailsHTML = (arrayData, SpecialObj) => {
      let keYY = null;
      let detailsHTML = `
        <div id="survey_Details">
          <p style="text-align:left; color:var(--lic-blue)"><strong>Entry Date:</strong> ${arrayData?.date}</p>
          <p style="text-align:left; color:var(--lic-blue)"><strong>Latitude:</strong> ${arrayData?.lat}</p>
          <p style="text-align:left; color:var(--lic-blue)"><strong>Longitude:</strong> ${arrayData?.longi}</p>
      `;

      //If Any Key Should Not be Displayed - add it here
      for (const [key, value] of Object.entries(SpecialObj)) {
        if (
          key === "lat" ||
          key === "longi" ||
          key === "status" ||
          key === "date" ||
          key === "user_id" ||
          key === "supervisor" ||
          key === "mohalla_committee" ||
          key === "entry_date" ||
          key === "entry_by" ||
          key === "nature_of_house" ||
          key === "longi" ||
          key === "type_of_wgu" ||
          key === "id" ||
          key === "which_district" ||
          key === "which_municipalty" ||
          key === "which_word" ||
          key === "owner_type" ||
          key === "is_delete"
        ) {
          continue;
        }

        const specificKeysForYesNo = [
          "all_shopkeepers_agree",
          "is_composed",
          "is_construct_individual",
          "is_gram_panchayat_garbage_collects",
          "is_kitchen_garden",
          "is_manage_gray_water",
          "is_managing_black_water",
          "is_school_have_garden",
          "is_school_manage_biodegradable",
          "is_waste_collection_services_charge",
          "market_committee_presence",
          "midday_meal_scheme",
          "will_want_to_pay",
          "willing_to_manage_by_own",
          "toilet_in_house",
        ];

        //Locality name
        let locality_name = NameFetcher({
          useFor: "locality",
          matchingParam: arrayData?.locality,
          mainDataArr: locality
        })

        console.log("locality_name", locality_name);

        //Name change as per the Object Array
        if (key in ApiResponse_keyDescriptions) {
          keYY = ApiResponse_keyDescriptions[key];
        }

        detailsHTML += `
          <p style="text-align:left"><strong>${keYY ?? key}:</strong> ${specificKeysForYesNo.includes(key)
            ? value === "1"
              ? "Yes"
              : value === "0"
                ? "No"
                : ""
            : key == "ownership_of_house" || key == "owner_type"
              ? value === "1"
                ? "Own"
                : "Rent"
              : key == "locality" ? locality_name
                : value
          }</p>
        `;
      }

      detailsHTML += `</div>`;
      return detailsHTML;
    };

    const houseObjForShowHandlerData = filterObject(arrayData);

    Swal.fire({
      title: "Household Survey Details",
      html: generateSurveyDetailsHTML(arrayData, houseObjForShowHandlerData),
    });

    console.log("arrayData", arrayData);
  };







  // ////////////////////////////////******************************************///////////////////////////////// /

  //Market Name Fetcher from Id
  function NameFetcher({ matchingParam, mainDataArr, useFor }) {

    if (useFor == "market") {
      let name = mainDataArr?.filter((item) => item.market_id === matchingParam);
      return name[0]?.market_name;
    }

    if (useFor == "locality") {
      let locality = mainDataArr?.filter((item) => item.id == matchingParam);
      return locality[0]?.village_name;
    }
  }

  // ////////////////////////////////******************************************///////////////////////////////// /
  return !isLoading ? (
    //Content
    <>
      {/* //Spinner */}
      {spinner ? (
        <>
          <div className={styles.spinnerContainer}>
            <img src="/svg/loader.svg" alt="loader"></img>
          </div>
        </>
      ) : null}

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

        <div className={styles.filter}>
          {/* //Filtered - Households */}
          <div
            onClick={() => {
              setFilterSelected("1");
              setTypeOfWGU("1");
            }}
            className={
              filterSelected === "1"
                ? styles.householdTypeSelected
                : styles.householdType
            }
          >
            <span>Household</span>
          </div>

          {/* //Filtered - Shops */}
          <div
            onClick={() => {
              setFilterSelected("2");
              setTypeOfWGU("2");
            }}
            className={
              filterSelected === "2"
                ? styles.householdTypeSelected
                : styles.householdType
            }
          >
            <span>Shop</span>
          </div>

          {/* //Filtered - Market */}
          <div
            onClick={() => {
              setFilterSelected("3");
              setTypeOfWGU("3");
            }}
            className={
              filterSelected === "3"
                ? styles.householdTypeSelected
                : styles.householdType
            }
          >
            <span>Market</span>
          </div>

          {/* //Filtered - Institute */}
          <div
            onClick={() => {
              setFilterSelected("4");
              setTypeOfWGU("4");
            }}
            className={
              filterSelected === "4"
                ? styles.householdTypeSelected
                : styles.householdType
            }
          >
            <span>Institution</span>
          </div>
        </div>

        {
          //Household List
          typeOfWGU === "1" ? (
            <>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Date</th>
                      <th>Household Id</th>
                      <th>Household Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className={styles.table_body}>
                    {api_householdData.map((household, index) => {
                      let approved = household.status === "1" ? true : false;
                      //Date Formatter
                      const formatDate = (dateString) => {
                        if (
                          dateString !== null &&
                          dateString !== "" &&
                          dateString !== undefined
                        ) {
                          const [year, month, day] = dateString?.split("-");
                          return `${day}/${month}/${year}`;
                        }
                      };

                      const formattedDate = formatDate(household.date);

                      return (
                        <tr key={household.id}>
                          <td
                            className={approved ? styles.tdApproved : styles.td}
                          >
                            {index + 1}
                          </td>
                          <td
                            className={approved ? styles.tdApproved : styles.td}
                          >
                            {formattedDate}
                          </td>
                          <td
                            className={approved ? styles.tdApproved : styles.td}
                          >
                            {household.id}
                          </td>
                          <td
                            className={approved ? styles.tdApproved : styles.td}
                          >
                            {household.house_hold_name}
                          </td>
                          <td
                            className={
                              approved
                                ? styles.actionWasteApproved
                                : styles.actionWaste
                            }
                          >
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
            </>
          ) : //Shop List
            typeOfWGU === "2" ? (
              <>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Date</th>
                        <th>Shop Name</th>
                        <th>Located At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className={styles.table_body}>
                      {api_householdData.map((household, index) => {
                        let approved = household.status === "1" ? true : false;
                        //Date Formatter
                        const formatDate = (dateString) => {
                          if (
                            dateString !== null &&
                            dateString !== "" &&
                            dateString !== undefined
                          ) {
                            const [year, month, day] = dateString?.split("-");
                            return `${day}/${month}/${year}`;
                          }
                        };

                        const formattedDate = formatDate(household.date);

                        return (
                          <tr key={household.id}>
                            <td
                              className={approved ? styles.tdApproved : styles.td}
                            >
                              {index + 1}
                            </td>
                            <td
                              className={approved ? styles.tdApproved : styles.td}
                            >
                              {formattedDate}
                            </td>
                            <td
                              className={approved ? styles.tdApproved : styles.td}
                            >
                              {household.name_of_shop}
                            </td>
                            <td
                              className={approved ? styles.tdApproved : styles.td}
                            >
                              {household.shop_located === "1"
                                ? "Para"
                                : household.shop_located === "2"
                                  ? "Market"
                                  : ""}
                            </td>
                            <td className={approved
                              ? styles.actionWasteApproved
                              : styles.actionWaste}>
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
              </>
            ) : //Market List
              typeOfWGU === "3" ? (
                <>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Date</th>
                          <th>Market Name</th>
                          <th>Sansad Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className={styles.table_body}>
                        {api_householdData.map((household, index) => {
                          let approved = household.status === "1" ? true : false;
                          //Date Formatter
                          const formatDate = (dateString) => {
                            if (
                              dateString !== null &&
                              dateString !== "" &&
                              dateString !== undefined
                            ) {
                              const [year, month, day] = dateString?.split("-");
                              return `${day}/${month}/${year}`;
                            }
                          };

                          const formattedDate = formatDate(household.date);

                          let market_namee = NameFetcher({
                            useFor: "market",
                            matchingParam: household.market_name,
                            mainDataArr: marketName,
                          });

                          return (
                            <tr key={household.id}>
                              <td
                                className={approved ? styles.tdApproved : styles.td}
                              >
                                {index + 1}
                              </td>
                              <td
                                className={approved ? styles.tdApproved : styles.td}
                              >
                                {formattedDate}
                              </td>
                              <td
                                className={approved ? styles.tdApproved : styles.td}
                              >
                                {market_namee}
                              </td>
                              <td
                                className={approved ? styles.tdApproved : styles.td}
                              >
                                {household.sansad_no}
                              </td>
                              <td className={approved
                                ? styles.actionWasteApproved
                                : styles.actionWaste}>
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
                </>
              ) : //Institution List
                typeOfWGU === "4" ? (
                  <>
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Date</th>
                            <th>Institute Name</th>
                            <th>Sansad Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                          {api_householdData.map((household, index) => {
                            let approved = household.status === "1" ? true : false;
                            //Date Formatter
                            const formatDate = (dateString) => {
                              if (
                                dateString !== null &&
                                dateString !== "" &&
                                dateString !== undefined
                              ) {
                                const [year, month, day] = dateString?.split("-");
                                return `${day}/${month}/${year}`;
                              }
                            };

                            const formattedDate = formatDate(household.date);

                            return (
                              <tr key={household.id}>
                                <td
                                  className={approved ? styles.tdApproved : styles.td}
                                >
                                  {index + 1}
                                </td>
                                <td
                                  className={approved ? styles.tdApproved : styles.td}
                                >
                                  {formattedDate}
                                </td>
                                <td
                                  className={approved ? styles.tdApproved : styles.td}
                                >
                                  {household.institution_name}
                                </td>
                                <td
                                  className={approved ? styles.tdApproved : styles.td}
                                >
                                  {household.sansad_no}
                                </td>
                                <td className={approved
                                  ? styles.actionWasteApproved
                                  : styles.actionWaste}>
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
                  </>
                ) : (
                  <></>
                )
        }

        <div className={styles.addNewContainer}>
          <img
            src="/svg/add_new.svg"
            alt="add_new"
            onClick={() => {
              setSpinner(true);
              route.push("/home/household-add");
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

        {/* Skeleton Container */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <Skeleton width={30} height={10} baseColor="#6b96db" />
                </th>
                <th>
                  <Skeleton width={60} height={10} baseColor="#6b96db" />
                </th>
                <th>
                  <Skeleton width={90} height={10} baseColor="#6b96db" />
                </th>
                <th className="text-center">
                  <Skeleton width={30} height={10} baseColor="#6b96db" />
                </th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className={styles.td}>
                    <Skeleton width={30} height={10} />
                  </td>
                  <td className={styles.td}>
                    <Skeleton width={60} height={10} />
                  </td>
                  <td className={styles.td}>
                    <Skeleton width={90} height={10} />
                  </td>

                  <td className="text-center">
                    <Skeleton circle={true} height={15} width={15} />
                    <Skeleton circle={true} height={15} width={15} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Container */}
        <div className={styles.addNewContainer}>
          <Skeleton circle={true} height={50} width={50} baseColor="#6fd199" />
        </div>
      </div>
    </>
  );
}
