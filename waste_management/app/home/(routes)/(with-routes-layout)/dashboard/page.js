"use client";

import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import QRCodeScanner from "@/components/QrScanner";

export default function Dashboardpage() {




  //State variables
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [block_name, setBlock_Name] = useState("");
  const [district_name, setDistrict_Name] = useState("");
  const [cameraClicked, setCameraClicked] = useState(false);
  const [image, setImage] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [scanResutlt, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [supervisor, setSupervisor] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: name,
    ward_id: ward_id,
    district_name: district_name,
    block_name: block_name,
    supervisor: supervisor
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
    console.log(showScanner);
    setSupervisor(localStorage.getItem("supervisor"))
    try {
      localStorage.setItem("today", getDate());
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          // get local items
          setName(localStorage.getItem("name"));
          setUserRole(localStorage.getItem("role_name"));
          setBlock_Name(localStorage.getItem("block"));
          setDistrict_Name(localStorage.getItem("district"));
          setWard_id(localStorage.getItem("ward_id"));
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, [userRole]);

  // API Data Fetching

  // Function Declarations

  const camera_button = () => {
    try {
      setCameraClicked(true);
    } catch (error) {
      console.log(error);
    }

  };


  // Handler Functions
  function handleTakePhoto(dataUri) {
    setImage(dataUri);
    setCameraClicked(false);
    console.log(dataUri);
  }

  const handleScan = (data) => {
    setScanResult(data);
    setShowScanner(false);
  }

  //Functions 
  // Date Function
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad with leading zero if less than 10
    const day = date.getDate().toString().padStart(2, '0'); // Pad with leading zero if less than 10
    return `${year}-${month}-${day}`;
  };


  return (userRole === "field-staff" ?
    (cameraClicked ? <Camera
      sizeFactor={0.5}
      imageCompression={0.5}
      isFullscreen={true}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
      onTakePhoto={(dataUri) => {
        handleTakePhoto(dataUri);
      }}
    /> :
      <>
        <Header
          userRole={userRole}
          isOffCanvasVisible={true}
          loadingdata={loadingHeaderData}
        />
        {/* //Body */}
        <div className={styles.bodyContainer}>

          {spinner ? <><div className={styles.spinnerContainer}><img src="/svg/loader.svg" alt="loader"></img></div></> : null}

          {/* first row */}
          <div className={styles.firstRow}>
            <div
              className={styles.card1}
              onClick={() => {
                setSpinner(true)
                route.push("/home/waste-collection-list")
              }}
            >
              <img src="/images/waste_collector.png" alt="waste_collection"></img>
              <p> Weekly Waste Collection</p>
            </div>
            <div
              className={styles.card2}
              onClick={() => {
                setSpinner(true)
                route.push("/home/income-list")
              }}
            >
              <img src="/images/income.png" alt="income"></img>
              <p>Income</p>
            </div>
          </div>

          {/* second row */}
          <div className={styles.secondRow}>
            <div
              className={styles.card3}
              onClick={() => {
                setSpinner(true)
                route.push("/home/household-list")
              }}
            >
              <img src="/images/HH_Survey.png" alt="HH_Survey"></img>
              <p>HH Survey</p>
            </div>
            <div
              className={styles.card4}
              onClick={() => {
                setSpinner(true)
                route.push("/home/mohalla-list")
              }}
            >
              <img
                src="/images/mohalla_commitee.png"
                alt="mohalla_commitee"
              ></img>
              <p>Mohalla Commitee</p>
            </div>
          </div>

          {/* third row */}
          <div className={styles.thirdRow}>
            <div
              className={styles.card5}
              onClick={() => {
                setSpinner(true)
                route.push("/home/livestock-list")
              }}
            >
              <img src="/images/livestock_shed.png" alt="livestock_shed"></img>
              <p>Livestock Shed</p>
            </div>
            <div
              className={styles.card6}
              onClick={() => {
                setSpinner(true)
                route.push("/home/community-clean-list")
              }}
            >
              <img
                src="/images/community_toilet.png"
                alt="community_toilet"
              ></img>
              <p>Community Toilet</p>
            </div>
          </div>
        </div>

        <Footer camera_button={camera_button} />
      </>)
    :
    userRole === "waste-collector" ?
      (cameraClicked ? <Camera
        sizeFactor={0.5}
        imageCompression={0.5}
        isFullscreen={true}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      /> :
        <>
          <Header
            userRole={userRole}
            isOffCanvasVisible={true}
            loadingdata={loadingHeaderData}
          />
          {/* //Body */}
          <div className={styles.bodyContainer}>
            {/* first row */}
            <div className={styles.firstRow}>
              <div
                className={styles.card1}
                onClick={() => {
                  setSpinner(true)
                  setShowScanner(true);
                }}
              >
                <img src="/images/waste_collector.png" alt="waste_collection"></img>
                <p>Scanner</p>
              </div>

              {showScanner ?
                <div id="scannerArea">
                  <QRCodeScanner handleScan={handleScan} />
                  <button onClick={() => {
                    setSpinner(true)
                    setShowScanner(false);
                  }}>Close Scanner
                  </button>
                </div> : <></>}

              {scanResutlt ?
                <div id="scanResult">
                  <p>`Scan QR Code ${scanResutlt}`</p>
                  <button onClick={() => {
                    setSpinner(true)
                    document.getElementById("scanResult").style.display = "none";
                  }}>Back</button>
                </div> : <></>}

            </div>
          </div>



          <Footer camera_button={camera_button} />
        </>) :
      <></>

  )
}
