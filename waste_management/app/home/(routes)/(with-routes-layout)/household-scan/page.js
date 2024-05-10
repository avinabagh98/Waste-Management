"use client"

import React, { useEffect, useState } from 'react';
import styles from './scan.module.css';
import Header from '@/components/Header/Header';
import Textparser from '@/components/Textparser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function HouseholdScanPage() {


    const [userRole, setUserRole] = useState("");
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [block_name, setBlock_Name] = useState("");
    const [district_name, setDistrict_Name] = useState("");
    const [ward_id, setWard_id] = useState("");
    const [wardName, setWardName] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [qrList, setQrList] = useState([]);

    //form data states
    const [isLock, setIsLock] = useState("0");
    const [wasteGiven, setWasteGiven] = useState("9");
    const [wasteGivenSegregated, setWasteGivenSegregated] = useState("9");
    const [user_id, setUser_id] = useState("");
    const [asyns_id, setAsyns_id] = useState("");
    const [society_id, setSociety_id] = useState("");

    const route = useRouter();

    // State to manage form inputs
    const [formData, setFormData] = useState({
        longitude: '',
        latitude: '',
        name: '',
        familymembers: '',
        date: '',
        slno: '',
        holdingNumber: '',
        ownerType: '',
        wguType: '',
        isLock: isLock,
        wasteGiven: '',
        WasteGivenInSegregateDmanner: '',
        userId: '',
        asynsId: '',
        societyId: '',
        token: '',
    });

    const formDataQR = {
        longitude: qrList.longi,
        latitude: qrList.lat,
        holdingNumber: qrList.holding_number,
        isLock: isLock,
        wasteGiven: wasteGiven,
        WasteGivenInSegregateDmanner: wasteGivenSegregated,
        userId: user_id,
        asynsId: asyns_id,
        societyId: society_id,
        token: token
    }


    //Other declarations
    const loadingHeaderData = {
        name: name,
        ward_id: ward_id,
        district_name: district_name,
        block_name: block_name,
        supervisor: supervisor
    };

    const arrCreated = [];






    useEffect(() => {
        try {
            const Token = localStorage.getItem("token");
            if (!Token) {
                route.push("/home/login");
            }
            else {
                localStorage.setItem("previousPath", "/home/dashboard");
                setToken(Token);
                setName(localStorage.getItem("name"));
                setSupervisor(localStorage.getItem("supervisor"))
                setBlock_Name(localStorage.getItem("block"));
                setDistrict_Name(localStorage.getItem("district"));
                setWard_id(localStorage.getItem("ward_id"));
                setUserRole(localStorage.getItem("role_name"));
                setWardName(localStorage.getItem("ward"));
                setQrList(JSON.parse(localStorage.getItem("qrList")));
                setUser_id(localStorage.getItem("user_id"));
                setAsyns_id(localStorage.getItem("asynsid"));
                setSociety_id(localStorage.getItem("societyId"));


                // get scanned data from local

                arrCreated.push(localStorage.getItem("asynsid"));
                arrCreated.push(localStorage.getItem("societyId"));
                console.log(arrCreated);

                setFormData({
                    ...formData,
                    ["name"]: localStorage.getItem("name"),
                })

            }
        } catch (error) {
            console.log(error);
        }
    }, [])



    const handleSubmitQR = (event) => {
        event.preventDefault();
        console.log(formDataQR);
        try {
            axios.post("https://waste.ebluesys.com/api/qrsurvey/add", formDataQR).then((response) => {

                if (response.data.data.status === "success") {
                    console.log(response.data.data);
                    swal("Success", "Submitted Successfully", "success");
                    console.log("QR Survey Response", response.data.data);
                    route.push("/home/dashboard");
                }
            })
        } catch (error) {
            console.log(error);
        }
    }



    const handleRadioChange = (name, value) => {
        if (name === "wasteGiven") {
            setWasteGiven(value);
        }

        if (name === "wasteGivenS") {
            setWasteGivenSegregated(value);
        }
    };



    return (
        <>
            <Header userRole={userRole} loadingdata={loadingHeaderData} isOffCanvasVisible={false} />
            <div className={styles.text}><Textparser text={"Household Scan"} /></div>
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    {/* //form heading */}
                    <h1 >{wardName ? `Ward: ${wardName}` : ""}</h1>
                    {/* //form fields */}
                    <form onSubmit={handleSubmitQR}>

                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date</label>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                value={qrList.date}
                                disabled={true}


                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={qrList.house_hold_name}

                                disabled={true}

                            />
                        </div>
                        <div className={styles.formGroup}>

                            <label htmlFor="familymembers">Family Members</label>
                            <input
                                type="text"
                                id="familymembers"
                                name="familymembers"
                                value={qrList.family_members}
                                disabled={true}


                            />
                        </div>

                        <div className={styles.formGroup}>

                            <label htmlFor="serialnumber">Serial Number</label>
                            <input
                                type="text"
                                id="serialnumber"
                                name="serialnumber"
                                value={qrList.slr_no}

                                disabled={true}

                            />
                        </div>

                        <div className={styles.formGroup}>

                            <label htmlFor="holdingnumber">Holding Number</label>
                            <input
                                type="text"
                                id="holdingnumber"
                                name="holdingnumber"
                                value={qrList.holding_number}

                                disabled={true}

                            />
                        </div>

                        <div className={styles.formGroup}>

                            <label htmlFor="ownerType">Owner Type</label>
                            <input
                                type="text"
                                id="ownerType"
                                name="ownerType"
                                value={qrList.owner_type}

                                disabled={true}

                            />
                        </div>

                        <div className={styles.formGroup}>

                            <label htmlFor="wgutype">Type of W.G.U</label>
                            <input
                                type="text"
                                id="wgutype"
                                name="wgutype"
                                value={qrList.type_of_wgu}
                                disabled={true}


                            />
                        </div>

                        <div className={styles.locked}>
                            <label htmlFor="isHouseLocked">Is house locked?</label>
                            <input
                                type="checkbox"
                                id='isHouseLocked'
                                name="isHouseLocked"
                                value={"1"}
                                onChange={(e) => {
                                    setIsLock(e.target.checked ? "1" : "0");
                                }}
                            />

                        </div>

                        {
                            isLock === "0" ?
                                <>

                                    <div className={styles.radioInput}>
                                        <span className={styles.textWaste}> <Textparser text={"Wasten Given"} /></span>
                                        <div className={styles.radioInput_Options}>
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="wasteGiven_yes"
                                                    name="wasteGiven"
                                                    value="1"
                                                    checked={wasteGiven === "1"}
                                                    onChange={(e) => {
                                                        handleRadioChange(e.target.name, e.target.value);
                                                    }}
                                                />
                                                <label htmlFor="wasteGiven_yes">Yes</label>
                                            </span>
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="wasteGiven_no"
                                                    name="wasteGiven"
                                                    value="2"
                                                    checked={wasteGiven === "2"}
                                                    onChange={(e) => {
                                                        handleRadioChange(e.target.name, e.target.value);
                                                    }}
                                                />
                                                <label htmlFor="wasteGiven_no">No</label>
                                            </span>

                                            <span>
                                                <input
                                                    type="radio"
                                                    id="wasteGiven_home"
                                                    name="wasteGiven"
                                                    value="3"
                                                    checked={wasteGiven === "3"}
                                                    onChange={(e) => {
                                                        handleRadioChange(e.target.name, e.target.value);
                                                    }}
                                                />
                                                <label htmlFor="wasteGiven_home">Home Based Management</label>
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.radioInput}>
                                        <span className={styles.textWaste}> <Textparser text={"Wasten Given in Segregated Manner"} /></span>
                                        <div className={styles.radioInput_Options}>
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="wasteGivenS_yes"
                                                    name="wasteGivenS"
                                                    value="1"
                                                    checked={wasteGivenSegregated === "1"}
                                                    onChange={(e) => {
                                                        handleRadioChange(e.target.name, e.target.value);
                                                    }}
                                                />
                                                <label htmlFor="wasteGivenS_yes">Yes</label>
                                            </span>
                                            <span>
                                                <input
                                                    type="radio"
                                                    id="wasteGivenS_no"
                                                    name="wasteGivenS"
                                                    value="0"
                                                    checked={wasteGivenSegregated === "0"}
                                                    onChange={(e) => {
                                                        handleRadioChange(e.target.name, e.target.value);
                                                    }}
                                                />
                                                <label htmlFor="wasteGivenS_no">No</label>
                                            </span>


                                        </div>
                                    </div>
                                </> : null
                        }


                        <button className={styles.button} type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </>

    );
}
