"use client";

import styles from "./mlpAdd.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import { sendRequest } from "@/api/sendRequest";
import Textparser from "@/components/Textparser";

export default function MLPAddPage() {

    //State variables
    const [userRole, setUserRole] = useState("");
    const [supervisorId, setSupervisorId] = useState("");
    const [fieldStaffId, setFieldStaffId] = useState("");
    const [token, setToken] = useState("");

    //form-data states
    const [mlpAmount, setMlpAmount] = useState("");
    const [sansadNumber, setSansadNumber] = useState("");
    const [dateMLP, setDateMLP] = useState("");
    const [today, setToday] = useState("");

    //Loading Header Data States
    const [name, setName] = useState("");
    const [ward_id, setWard_id] = useState("");
    const [gp, setGp] = useState("");
    const [district_name, setDistrictName] = useState("");
    const [block_name, setBLockName] = useState("");


    const [locality, setLocality] = useState([]);
    const [localName, setLocalName] = useState([]);
    const [localityId, setLocalityId] = useState([]);

    //Loader States
    const [spinner, setSpinner] = useState(false);

    //Common Other declarations///
    const loadingHeaderData = {
        name: name,
        district_name: district_name,
        ward_id: gp,
        block_name: block_name,
        supervisor: supervisorId,
    };



    const route = useRouter();
    const translate = LanguageFetcher();

    // LocalStorage Fetching
    useEffect(() => {
        try {

            localStorage.setItem("previousPath", "/home/mlp-list");
            setToday(localStorage.getItem("today"));
            async function fetchData() {

                console.log("//////////////////////", loadingHeaderData);
                const token = localStorage.getItem("token");
                if (!token) {
                    route.push("/home/login");
                } else {
                    setUserRole(localStorage.getItem("role_name"));
                    setFieldStaffId(localStorage.getItem("user_id"));
                    setToken(token);

                    //loadingHeaderData from local storage
                    setName(localStorage.getItem("name"));
                    setDistrictName(localStorage.getItem("district"));
                    setBLockName(localStorage.getItem("block"));
                    setWard_id(localStorage.getItem("ward_id"));
                    setGp(localStorage.getItem("gp"));
                }
            }
            fetchData();
        } catch (error) {
            swal("Error", error.message, "error");
        }
    }, []);



    // Handler Functions
    const handleVal = (id, val) => {
        if (id === "supervisorIncome") {
            setSupervisorId(val);
        }
        if (id === "fieldStaffIncome") {
            setFieldStaffId(val);
        }

    };

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     let flag = false;
    //     for (const field in formDataIncome) {
    //         if (formDataIncome[field] === null || formDataIncome[field] === "") {
    //             flag = true;
    //             break;
    //         }
    //     }
    //     if (flag) {
    //         swal("Error", "Please fill all the fields", "error");
    //     } else {
    //         console.log("Income Added Submitted::", formDataIncome);
    //         try {
    //             setSpinner(true);
    //             const res = await sendRequest("post", "/income/add", formDataIncome, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             if (res.status === 1) {
    //                 swal("Successfully", "Income Added", "success");
    //                 route.push("/home/income-list");
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // };

    return (
        <>
            <Header
                userRole={userRole}
                isOffCanvasVisible={false}
                loadingdata={loadingHeaderData}
            />

            <div className={styles.container}>
                {/* //breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Textparser text={"Multi Layer Plastic Add"} />
                </div>

                {/* //spinner */}
                {spinner ? (
                    <>
                        <div className={styles.spinnerContainer}>
                            <img src="/svg/loader.svg" alt="loader"></img>
                        </div>
                    </>
                ) : null}

                {/* //form */}
                <div className={styles.formcontainer}>
                    <div className={styles.quescontainer}>


                        <Surveyques
                            id="date_mlp"
                            labelText={translate?.date_mlp}
                            value={today}
                            handleVal={(id, value) => handleVal(id, value)}
                            type="date"

                        />


                        <Surveyques
                            id="mlp_taking_point"
                            labelText={translate?.mlp_dumped_MLP}
                            value={mlpAmount}
                            handleVal={(id, value) => handleVal(id, value)}
                            type="text"

                        />


                        <Surveyques
                            id="mlp_taking_point"
                            labelText={translate?.mlp_sold_MLP}
                            value={mlpAmount}
                            handleVal={(id, value) => handleVal(id, value)}
                            type="text"

                        />


                        <SurveyDropdown
                            id="dropdown1"
                            labelText={translate?.mlp_taken_from_MLP}
                            value={"dropdown1"}
                            handleVal={(id, value) => handleVal(id, value)}
                            options={["Select", "Option 1", "Option 2", "Option 3"]}

                        />

                        <div className={styles.btnContainer}>
                            <button className={styles.submitbtn} onClick={() => { swal("Success", "MLP Adding Demo", "success") }}>
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
