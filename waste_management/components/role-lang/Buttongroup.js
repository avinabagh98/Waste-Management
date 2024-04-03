"use client";

import styles from "./Buttongroup.module.css";
import { Row, Col } from "react-bootstrap";

export default function Buttongroup({ handleUsertypeBtn }) {
  return (
    <>
      <div className={styles.container}>
        <Row className={styles.userTypeContainer}>
          <Col xs={6} className={styles.btnCol}>
            {/* Supervisor card */}
            <span
              className={styles.card_supervisor}
              name="supervisor"
              id="1"
              onClick={(e) => handleUsertypeBtn(e)}
            >
              <a href="#">
                <img
                  className={styles.cardImage}
                  src="/images/supervisor.png"
                  alt="supervisor-img"
                />
                <div className={styles.cardContent_supervisor}>
                  <p className={styles.cardText}>Supervisor</p>
                </div>
              </a>
            </span>
            {/* Field staff card */}
            <span
              className={styles.card_fieldstaff}
              name="field-staff"
              id="2"
              onClick={(e) => handleUsertypeBtn(e)}
            >
              <a href="#">
                <img
                  className={styles.cardImage}
                  src="/images/field_staff.png"
                  alt="field-staff img"
                />
                <div className={styles.cardContent_fieldstaff}>
                  <p className={styles.cardText}>Field Staff</p>
                </div>
              </a>
            </span>
            {/* Waste collector card */}
            <span
              className={styles.card_wastecollector}
              name="waste-collector"
              id="3"
              onClick={(e) => handleUsertypeBtn(e)}
            >
              <a href="#">
                <img
                  className={styles.cardImage}
                  src="/images/waste_collector.png"
                  alt="waste-collector img"
                />
                <div className={styles.cardContent_wastecollector}>
                  <p className={styles.cardText}>Waste Collector</p>
                </div>
              </a>
            </span>
          </Col>
        </Row>
      </div>
    </>
  );
}
