"use client";

import { Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Textparser from "@/components/Textparser";

export default function Header({
  defaultHeader,
  isOffCanvasVisible,
  userRole,
}) {
  const route = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nameValue, setNameValue] = useState("");
  const [municipality_name, setMunicipality_name] = useState("");
  const [ward_name, setWard_name] = useState("");
  const [team_num, setTeam_num] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNameValue(localStorage.getItem("name") || "");
      setMunicipality_name(localStorage.getItem("municipality_name") || "");
      setWard_name(localStorage.getItem("ward_name") || "");
      setTeam_num(localStorage.getItem("team_number") || "");
    }
  }, []);

  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "You want to logout!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // localStorage.removeItem("token");
        localStorage.clear();
        route.push("/home");
        setShow(false);
        swal("You have successfully logged out", {
          icon: "success",
        });
      } else {
      }
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className={styles.rowContainer}>
        <div className={defaultHeader ? styles.defaultHeader : styles.header}>
          <div
            className={
              isOffCanvasVisible
                ? styles.headerContent
                : isOffCanvasVisible === false
                ? styles.offcanvas_false_headerContent
                : styles.defaultHeader
            }
          >
            {isOffCanvasVisible ? (
              <>
                {userRole === "supervisor" || userRole === "vct-supervisor" ? (
                  <>
                    <div className={styles.headerOffcanvaBtn}>
                      <a onClick={handleShow}>
                        <img
                          src="/images/top_menu_drawer.png"
                          alt="logo1"
                        ></img>
                      </a>
                    </div>

                    <Offcanvas
                      show={show}
                      onHide={handleClose}
                      style={{ width: "75%" }}
                    >
                      <Offcanvas.Header className={styles.offCanvasHeader}>
                        <div className={styles.offCanvasHeaderLogo}>
                          <img
                            src="/images/west_bengal_biswa_bangla_logo.png"
                            alt="logo1"
                          ></img>
                          <div className={styles.offCanvasHeaderLogoText}>
                            <p>VCM</p>
                          </div>
                        </div>
                      </Offcanvas.Header>

                      <Offcanvas.Body className={styles.offCanvasBody}>
                        <div className={styles.offCanvasBodyMenu}>
                          <div className={styles.MenuLink}>
                            <img src="/images/dashbord_menu_icon.png"></img>
                            DASH BOARD
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/schedule");
                              setShow(false);
                            }}
                          >
                            <img src="/images/schedule_menu_icon.png"></img>
                            SCHEDULE
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/dailysurveyreport");
                              setShow(false);
                            }}
                          >
                            <img src="/images/daily_survey_report_icon.png"></img>
                            DAILY SURVEY REPORT
                          </div>
                        </div>

                        <div className={styles.offCanvasBodyMenuFooter}>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("#");
                              setShow(false);
                            }}
                          >
                            <img src="/images/settings_menu_icon.png"></img>
                            KNOWLEDGE CENTER
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/settings");
                              setShow(false);
                            }}
                          >
                            <img src="/images/settings_menu_icon.png"></img>
                            SETTINGS
                          </div>

                          <div
                            className={styles.MenuLink}
                            onClick={handleLogout}
                          >
                            <img src="/images/logout_menu_icon.png"></img>
                            LOG OUT
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </>
                ) : userRole === "hth-member" ? (
                  <>
                    <div className={styles.headerOffcanvaBtn}>
                      <a onClick={handleShow}>
                        <img
                          src="/images/top_menu_drawer.png"
                          alt="logo1"
                        ></img>
                      </a>
                    </div>

                    <Offcanvas
                      show={show}
                      onHide={handleClose}
                      style={{ width: "75%" }}
                    >
                      <Offcanvas.Header className={styles.offCanvasHeader}>
                        <div className={styles.offCanvasHeaderLogo}>
                          <img
                            src="/images/west_bengal_biswa_bangla_logo.png"
                            alt="logo1"
                          ></img>
                          <div className={styles.offCanvasHeaderLogoText}>
                            <p>VCM</p>
                          </div>
                        </div>
                      </Offcanvas.Header>

                      <Offcanvas.Body className={styles.offCanvasBody}>
                        <div className={styles.offCanvasBodyMenu}>
                          <div className={styles.MenuLink}>
                            <img src="/images/dashbord_menu_icon.png"></img>
                            DASH BOARD
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/schedule");
                              setShow(false);
                            }}
                          >
                            <img src="/images/schedule_menu_icon.png"></img>
                            SCHEDULE
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/dailysurveyreport");
                              setShow(false);
                            }}
                          >
                            <img src="/images/daily_survey_report_icon.png"></img>
                            PERMENANT RISK/BREEDING
                          </div>

                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/dailysurveyreport");
                              setShow(false);
                            }}
                          >
                            <img src="/images/daily_survey_report_icon.png"></img>
                            RISK/BREEDING SITES LIST
                          </div>
                        </div>

                        <div className={styles.offCanvasBodyMenuFooter}>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("#");
                              setShow(false);
                            }}
                          >
                            <img src="/images/settings_menu_icon.png"></img>
                            KNOWLEDGE CENTER
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/settings");
                              setShow(false);
                            }}
                          >
                            <img src="/images/settings_menu_icon.png"></img>
                            SETTINGS
                          </div>

                          <div
                            className={styles.MenuLink}
                            onClick={handleLogout}
                          >
                            <img src="/images/logout_menu_icon.png"></img>
                            LOG OUT
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : isOffCanvasVisible === false ? (
              <>
                <div className={styles.headerOffcanvaBtn}>
                  <a onClick={handleBack}>
                    <img src="/svgs/Back Button.svg" alt="back-button"></img>
                  </a>
                </div>
              </>
            ) : (
              <></>
            )}

            <div
              className={defaultHeader ? styles.defaultHeaderLogo : styles.logo}
            >
              <img
                src="/images/west_bengal_biswa_bangla_logo.png"
                alt="logo1"
              ></img>
              <div className={styles.logoText}>
                <p>VCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {defaultHeader ? (
        <></>
      ) : (
        <>
          {name !== null ? (
            <div className={styles.container}>
              <div className={styles.namebar}>
                <span>
                  <Textparser text={`${nameValue}(${userRole})`} />
                  <br />
                  <Textparser text={`${municipality_name} Ward-${ward_name}`} />
                </span>
                {team_num ? <span>{`Team-${team_num}`}</span> : <></>}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
