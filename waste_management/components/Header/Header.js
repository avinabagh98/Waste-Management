"use client";

import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Textparser from "@/components/Textparser";

export default function Header({
  defaultHeader,
  isOffCanvasVisible,
  userRole,
  supervisor,
  loadingdata,
}) {
  const route = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  //loader-state
  const [spinner, setSpinner] = useState(false);

  const name = loadingdata?.name || null;
  const district_name = loadingdata?.district_name || null;
  const block_name = loadingdata?.block_name || null;
  const ward_id = loadingdata?.ward_id || null;

  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "You want to logout!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
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
    setSpinner(true);
    const prevPath = localStorage.getItem("previousPath");
    route.push(prevPath);
    console.log(prevPath);
  };
  return (
    <>

      {/* //loader */}
      {spinner ? <><div className={styles.spinnerContainer}><img src="/svg/loader.svg" alt="loader"></img></div></> : null}
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
                {userRole === "supervisor" || userRole === "field-staff" || userRole === "waste-collector" ? (
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
                            className={styles.licLogo}
                            src="/images/lic_logo.png"
                            alt="lic_logo"
                          ></img>
                          <img
                            className={styles.licLogo}
                            src="/images/bitan_logo.png"
                            alt="bitan_logo"
                          ></img>
                        </div>
                      </Offcanvas.Header>

                      <Offcanvas.Body className={styles.offCanvasBody}>
                        <div className={styles.offCanvasBodyMenu}>
                          <div className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              route.push("/home/dashboard");
                              setShow(false);
                            }}>

                            <img src="/svg/dashboard.svg"></img>
                            DASH BOARD
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              // route.push("/home/schedule");
                              setShow(false);
                            }}
                          >
                            <img src="/svg/schedule.svg"></img>
                            SCHEDULE
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
                            <img src="/svg/knowledge_center.svg"></img>
                            KNOWLEDGE CENTER
                          </div>
                          <div
                            className={styles.MenuLink}
                            onClick={(e) => {
                              e.preventDefault();
                              // route.push("/home/settings");
                              setShow(false);
                            }}
                          >
                            <img src="/svg/settings.svg"></img>
                            SETTINGS
                          </div>

                          <div
                            className={styles.MenuLink}
                            onClick={handleLogout}
                          >
                            <img src="/svg/logout.svg"></img>
                            LOG OUT
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </>
                ) : userRole === "waste-collector" ? (
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
                              // route.push("/home/schedule");
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
                              // route.push("/home/dailysurveyreport");
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
                              // route.push("/home/settings");
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
                    <img src="/images/back_button.png" alt="back-button"></img>
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
                className={styles.licLogo}
                src="/images/lic_logo.png"
                alt="lic-logo"
              ></img>
              <img
                className={styles.bitanLogo}
                src="/images/bitan_logo.png"
                alt="bitan-logo"
              ></img>
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
                  {userRole ? (
                    <>
                      <Textparser text={`${name}(${userRole})`} />
                      <Textparser text={`(${supervisor})`} />
                    </>

                  ) : (
                    <span className={styles.userRoleSelected}>
                      <Textparser text={` ${name} `} />
                    </span>
                  )}
                  <br />
                  {district_name ? (
                    <Textparser text={`${district_name} Block-${block_name}`} />
                  ) : (
                    <></>
                  )}
                </span>
                {ward_id ? <span>{`Ward-${ward_id}`}</span> : <></>}
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
