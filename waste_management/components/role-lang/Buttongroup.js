"use client";

import styles from "./Buttongroup.module.css";
import { Row, Col } from "react-bootstrap";

export default function Buttongroup({ handleUsertypeBtn }) {
  return (
    <>
      <div className={styles.container}>
        <Row className={styles.userTypeContainer}>
          <Col xs={4} className={styles.btnCol}>
            <span
              className={styles.card}
              name="supervisor"
              id="1"
              onClick={(e) => handleUsertypeBtn(e)}
            >
              <a href="#">
                <img
                  className={styles.cardImage}
                  src="/images/supervisor.png"
                  alt="Supervisor Img"
                />
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>Supervisor</p>
                </div>
              </a>
            </span>
          </Col>
        </Row>
      </div>
    </>
  );
}
