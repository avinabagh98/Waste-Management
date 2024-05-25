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
import MyQrScanner from "@/components/MyQrScanner";
import axios from "axios";

export default function Dashboardpage() {
  //State variables
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [block_name, setBlock_Name] = useState("");
  const [district_name, setDistrict_Name] = useState("");
  const [cameraClicked, setCameraClicked] = useState(false);
  const [image, setImage] = useState("");
  const [ward_id, setWard_id] = useState("");
  const [gp, setGp] = useState("");
  const [scanResutlt, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [supervisor, setSupervisor] = useState("");
  const [qrType, setQrType] = useState("");
  const [householdIdQr, setHouseholdIdQr] = useState("");
  const [token, setToken] = useState("");
  const [nirmalsathiId, setNirmalsathiId] = useState("");
  const [assignId, setAssignId] = useState("");
  const [damagedQr, setDamagedQr] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [scanType, setScanType] = useState("");

  //Other declarations
  const loadingHeaderData = {
    name: name,
    ward_id: gp,
    district_name: district_name,
    block_name: block_name,
    supervisor: supervisor,
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  // LocalStorage Fetching
  useEffect(() => {
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
          setGp(localStorage.getItem("gp"));
          setSupervisor(localStorage.getItem("supervisor"));
          setToken(token);

          if (userRole === "waste-collector") {
            setNirmalsathiId(localStorage.getItem("user_id"));
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, [userRole]);

  // API Data Fetching

  //QR Code Effector
  useEffect(() => {
    let clr = localStorage.getItem("HTML5_QRCODE_DATA");
    if (clr !== null || clr !== "") {
      localStorage.removeItem("HTML5_QRCODE_DATA");
      localStorage.removeItem("qrType");
      localStorage.removeItem("householdIdQr");
      setAssignId(localStorage.getItem("asynsid"));
    }

    if (scanResutlt) {
      scanedDataHandler(scanResutlt).then((Qr_promisedata) => {
        if (Qr_promisedata.qrType === "collection") {
          try {
            setSpinner(true);
            axios
              .post("https://waste.ebluesys.com/api/qrsurveyInfo/id", {
                token: token,
                householdId: Qr_promisedata.houseId,
                nirmalsathiId: nirmalsathiId,
              })
              .then((res) => {
                console.log(
                  "response from api promise 'qrsurveyInfo/id' ",
                  res.data.data
                );

                if (res.data.data.status === "success") {
                  localStorage.setItem("asynsid", res.data.data.asynsid);
                  localStorage.setItem("societyId", res.data.data.society_id);
                  localStorage.setItem(
                    "qrList",
                    JSON.stringify(res.data.data.list)
                  );
                  route.push("/home/household-scan");
                } else {
                  setSpinner(false);
                  swal("Error", "Data not found", "error");
                }
              })
              .catch((error) => {
                console.log("error catching at collection promise", error);

                if (error.name === "AxiosError") {
                  setSpinner(false);
                  swal("Error", "Wrong Collection QR", "error");
                }
              });
          } catch (error) {
            console.log("Error at qrsurveyId api", error);
          }
        }

        if (
          Qr_promisedata.qrType === "dumping" &&
          assignId !== "" &&
          assignId !== null
        ) {
          try {
            axios
              .post("https://waste.ebluesys.com/api/workTrip", {
                token: token,
                assignId: assignId,
                nirmalsathiId: nirmalsathiId,
              })
              .then((res) => {
                console.log("response from api promise", res.data.data);

                if (res.data.data.status === "success") {
                  swal("Success", "Trip Added Successfully", "success");
                } else {
                  swal("Error", "Error at QR Code", "error");
                }
              })
              .catch((error) => {
                console.log("error catching at dumping promise ", error);
                if (error.name === "AxiosError") {
                  setSpinner(false);
                  swal("Error", "Wrong Dumping QR", "error");
                }
              });
          } catch (error) {
            console.log("Error at worktrip api", error);
          }
        }

        if (Qr_promisedata.qrType === undefined) {
          swal("Error", "Wrong QR Code", "error");
        }
      });
    }
  }, [scanResutlt]);
  // Function Declarations

  const camera_button = () => {
    try {
      setCameraClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Functions

  // Date Function
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Pad with leading zero if less than 10
    const day = date.getDate().toString().padStart(2, "0"); // Pad with leading zero if less than 10
    return `${year}-${month}-${day}`;
  };

  //qrString genetor
  const generateQrString = (qrCode, scanType) => {
    const qrString = `${qrCode}|0|0|0|0|${scanType}`;

    return Promise.resolve(qrString);
  };

  // Handler Functions
  function handleTakePhoto(dataUri) {
    setImage(dataUri);
    setCameraClicked(false);
    console.log(dataUri);
  }

  const handleScan = (data) => {
    console.log("type of scanned data", typeof data); //tessting
    setScanResult(data);
    setShowScanner(false);
  };

  const scanedDataHandler = (data) => {
    let arr = data.split("|");
    setQrType(arr[5]);
    setHouseholdIdQr(arr[0]);
    localStorage.setItem("qrType", arr[5]);
    localStorage.setItem("householdIdQr", arr[0]);
    return Promise.resolve({ houseId: arr[0], qrType: arr[5] });
  };

  const handleQrSubmit = async (qc, st) => {
    if (st === "") {
      swal("Warning", "Please fill all the fields", "warning");
    } else {
      await generateQrString(qc, st).then((Qr_promisedstr) => {
        handleScan(Qr_promisedstr);
        console.log(Qr_promisedstr);
      });
    }
  };

  return userRole === "field-staff" ? (
    cameraClicked ? (
      <Camera
        sizeFactor={0.5}
        imageCompression={0.5}
        isFullscreen={true}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    ) : (
      <>
        <Header
          userRole={userRole}
          isOffCanvasVisible={true}
          loadingdata={loadingHeaderData}
        />
        {/* //Body */}
        <div className={styles.bodyContainer}>
          {spinner ? (
            <>
              <div className={styles.spinnerContainer}>
                <img src="/svg/loader.svg" alt="loader"></img>
              </div>
            </>
          ) : null}

          {/* first row */}
          <div className={styles.firstRow}>
            <div
              className={styles.card1}
              onClick={() => {
                setSpinner(true);
                route.push("/home/waste-collection-list");
              }}
            >
              <img
                src="/images/waste_collector.png"
                alt="waste_collection"
              ></img>
              <p> Waste Collection</p>
            </div>
            <div
              className={styles.card2}
              onClick={() => {
                setSpinner(true);
                route.push("/home/income-list");
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
                setSpinner(true);
                route.push("/home/household-list");
              }}
            >
              <img src="/images/HH_survey.png" alt="HH_Survey"></img>
              <p>HH Survey</p>
            </div>
            <div
              className={styles.card4}
              onClick={() => {
                // setSpinner(true);
                // route.push("/home/mohalla-list");
              }}
            >
              <img
                src="/images/mohalla_commitee.png"
                alt="mohalla_commitee"
              ></img>
              <p>Community Meetings</p>
            </div>
          </div>

          {/* third row */}
          <div className={styles.thirdRow}>
            <div
              className={styles.card5}
              onClick={() => {
                // setSpinner(true);
                // route.push("/home/livestock-list");
              }}
            >
              <img src="/images/livestock_shed.png" alt="livestock_shed"></img>
              <p>Multi Layer Plastic (MLP)</p>
            </div>
            {/* <div
              className={styles.card6}
              onClick={() => {
                setSpinner(true);
                route.push("/home/community-clean-list");
              }}
            >
              <img
                src="/images/community_toilet.png"
                alt="community_toilet"
              ></img>
              <p>Community Toilet</p>
            </div> */}
          </div>
        </div>

        <Footer camera_button={camera_button} />
      </>
    )
  ) : userRole === "waste-collector" ? (
    cameraClicked ? (
      <Camera
        sizeFactor={0.5}
        imageCompression={0.5}
        isFullscreen={true}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    ) : (
      <>
        {spinner ? (
          <>
            <div className={styles.spinnerContainer}>
              <img src="/svg/loader.svg" alt="loader"></img>
            </div>
          </>
        ) : null}
        <Header
          userRole={userRole}
          isOffCanvasVisible={true}
          loadingdata={loadingHeaderData}
        />
        {/* //Body */}
        <div className={styles.bodyContainer}>
          {/* <>

                <div id="scannerArea" className={styles.scannerArea}>
                  <QRCodeScanner handleScan={(data) => { handleScan(data) }} />/
                  <button className={styles.closeScanner} onClick={() => {
                    setShowScanner(false);
                  }}>Close Scanner
                  </button>

                </div>

              </> */}

          {showScanner ? (
            <>
              <div id="scannerArea" className={styles.scannerArea}>
                <MyQrScanner handleScan={handleScan} />
                <button
                  className={styles.closeScanner}
                  onClick={() => {
                    setShowScanner(false);
                  }}
                >
                  Close Scanner
                </button>
              </div>
            </>
          ) : (
            <>
              {/* first row */}
              <div className={styles.firstRow}>
                <div
                  className={styles.scannercard1}
                  onClick={() => {
                    setShowScanner(true);
                  }}
                >
                  <img src="/svg/scanner.svg" alt="scanner-img"></img>
                  <p>Scanner</p>
                </div>
              </div>
              {/* Second row - checkbutton*/}
              <div className={styles.secondRow}>
                <div className={styles.damagedQr}>
                  <label htmlFor="damagedQr">Damaged QR Code ?</label>
                  <input
                    type="checkbox"
                    id="damagedQr"
                    onChange={(e) => setDamagedQr(e.target.checked)}
                  ></input>
                </div>
              </div>

              {/* third row - QR Code input*/}
              {damagedQr ? (
                <>
                  <div className={styles.qrCodeManual}>
                    <label htmlFor="qrCode">Enter QR Code ID</label>
                    <input
                      type="text"
                      id="qrCodeId"
                      name="qrCodeId"
                      onChange={(e) => {
                        setQrCode(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className={styles.dropdownContainer}>
                    <label htmlFor="scanType">Select scan type</label>
                    <select
                      id="scanType"
                      value={scanType}
                      className={styles.dropdown}
                      onChange={(e) => setScanType(e.target.value)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="collection">Collection</option>
                      <option value="dumping">Dumping</option>
                    </select>
                  </div>

                  <button
                    className={styles.submitQRButton}
                    onClick={() => {
                      handleQrSubmit(qrCode, scanType);
                    }}
                  >
                    Submit
                  </button>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        <Footer camera_button={camera_button} />
      </>
    )
  ) : (
    <></>
  );
}
