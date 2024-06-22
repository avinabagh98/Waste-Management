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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MLPPage() {


    //Common States///
    const [userRole, setUserRole] = useState("");
    const [token, setToken] = useState("");
    const [ward_id, setWard_id] = useState("");
    const [gp, setGp] = useState("");
    const [api_livestockData, setApi_livestockData] = useState([]);

    //Loading Header Data States
    const [name, setName] = useState("");
    const [district_name, setDistrictName] = useState("");
    const [block_name, setBLockName] = useState("");
    const [supervisor, setSupervisor] = useState("");

    //loader states
    const [isLoading, setIsLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);

    //Common Other declarations///
    const loadingHeaderData = {
        name: name,
        district_name: district_name,
        ward_id: gp,
        block_name: block_name,
        supervisor: supervisor,
    };

    const livestocklistBody = {
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
                    setSupervisor(localStorage.getItem("supervisor"));

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

    //Livestock List Fetching
    useEffect(() => {
        async function fetchLists() {
            const response_livestocklist = await sendRequest(
                "post",
                `/livestockShed/list`,
                livestocklistBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response_livestocklist.status === 1) {
                console.log(
                    "API_list_ARRAY::",
                    response_livestocklist.data.data.livestockShedlist
                );
                setIsLoading(false);
                setApi_livestockData(
                    response_livestocklist.data.data.livestockShedlist
                );
            }
        }

        fetchLists();
    }, [token, ward_id]);

    // Function Declarations

    // Handler Functions
    const editHandler = (id) => {
        // setSpinner(true);
        localStorage.setItem("id", id);
        // route.push("/home/livestock-update");
    };

    const showHandler = (arrayData) => {
        console.log("show");
        Swal.fire({
            title: "Livestock Details",
            html: `<swal-html>
          <div id="livestockDetails">

          <div style="display:flex; align-items:center; gap:10px">
          <p style="text-align:left"><strong>Livestock Id:</strong> ${arrayData?.id
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
          <p style="text-align:left"><strong>Is Approved:</strong> ${arrayData?.is_approve === "0" ? "Not approved" : "Approved"
                }</p>
          </div>
        </swal-html>`,
        });
    };

    return !isLoading ? (
        <>
            {/* //Spinner */}
            {spinner ? (

                <>
                    <div className={styles.spinnerContainer}>
                        <img src="/svg/loader.svg" alt="loader"></img>
                    </div>
                </>
            ) : null}

            {/* //Content */}
            <Header
                loadingdata={loadingHeaderData}
                userRole={userRole}
                isOffCanvasVisible={false}
            />

            <div className={styles.bodyContainer}>
                {/* //breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Textparser text={"Multilayer Plastic List"} />
                </div>

                {/* //Lists */}
                <div className={styles.listContainer}>
                    {api_livestockData ? (
                        api_livestockData.map((livestock) => {
                            return (
                                <Listcard
                                    key={livestock.id}
                                    name={livestock?.name_of_live_shed}
                                    type={livestock?.livestock_type}
                                    status={
                                        livestock?.is_approve === "0" ? "Not approved" : "Approved"
                                    }
                                    owner_name={livestock.name_of_owner}
                                    owner_contact={livestock.contact_number}
                                    editHandler={() => {
                                        editHandler(livestock.id);
                                    }}
                                    ShowHandler={(e) => {
                                        showHandler(livestock);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>

                {/* //Add New Button */}
                <div className={styles.addNewContainer}>
                    <img
                        src="/svg/add_new.svg"
                        alt="add_new"
                        onClick={() => {
                            setSpinner(true);
                            route.push("/home/mlp-add");
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
            {[...Array(3)].map(() => {
                return (
                    <div className={styles.skeletonCard}>
                        <Skeleton height={100} />
                        <div className={styles.skeletoncardContent}>
                            <h3 className={styles.skeletoncardTitle}>
                                <Skeleton width={100} />
                            </h3>
                            <p className={styles.skeletoncardDescription}>
                                <Skeleton count={3} />
                            </p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
