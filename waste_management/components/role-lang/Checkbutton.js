"use client";

import React from "react";
import styles from "./Checkbutton.module.css";

export default function Checkbutton({ handleRadioChange, radioValue }) {
  return (
    <>
      <div className={styles.checkbuttonContainer}>
        {/* <form > */}
        <span
          className={`${
            radioValue === "en" ? styles.btnSpanchecked_en : styles.btnSpan_en
          }`}
        >
          <div>
            <input
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="en"
              className={styles.radio}
              checked={radioValue === "en"}
              onChange={handleRadioChange}
            />
            <label
              htmlFor="flexRadioDefault1"
              className={`${
                radioValue === "en"
                  ? styles.btnSpanLabelchecked_en
                  : styles.btnSpanLabel_en
              }`}
            >
              ENGLISH
            </label>
          </div>
          <div className={styles.languageImg}>
            <img src="/images/engLetter.png" alt="eng-letter"></img>
          </div>
          <div
            className={`${radioValue === "en" ? styles.checkedBar_en : null}`}
          ></div>
        </span>

        <span
          className={`${
            radioValue === "bn" ? styles.btnSpanchecked_bn : styles.btnSpan_bn
          }`}
        >
          <div>
            <input
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="bn"
              className={styles.radio}
              checked={radioValue === "bn"}
              onChange={handleRadioChange}
            />
            <label
              htmlFor="flexRadioDefault2"
              className={`${
                radioValue === "bn"
                  ? styles.btnSpanLabelchecked_bn
                  : styles.btnSpanLabel_bn
              }`}
            >
              BENGALI
            </label>
          </div>
          <div className={styles.languageImg}>
            <img src="/images/bengLetter.png" alt="beng-letter"></img>
          </div>
          <div
            className={`${radioValue === "bn" ? styles.checkedBar_bn : null}`}
          ></div>
        </span>

        <span
          className={`${
            radioValue === "hi" ? styles.btnSpanchecked_hi : styles.btnSpan_hi
          }`}
        >
          <div>
            <input
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
              value="hi"
              className={styles.radio}
              checked={radioValue === "hi"}
              onChange={handleRadioChange}
            />
            <label
              htmlFor="flexRadioDefault3"
              className={`${
                radioValue === "hi"
                  ? styles.btnSpanLabelchecked_hi
                  : styles.btnSpanLabel_hi
              }`}
            >
              HINDI
            </label>
          </div>
          <div className={styles.languageImg}>
            <img src="/images/hindiLetter.png" alt="eng-letter"></img>
          </div>
          <div
            className={`${radioValue === "hi" ? styles.checkedBar_hi : null}`}
          ></div>
        </span>

        {/* <span
            className={`${radioValue === "nepali" ? styles.btnSpanchecked : styles.btnSpan
              }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                value="nepali"
                className={styles.radio}
                checked={radioValue === "nepali"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault4"
                className={`${radioValue === "nepali"
                  ? styles.btnSpanLabelchecked
                  : styles.btnSpanLabel
                  }`}
              >
                NEPALI
              </label>
            </div>
             <div className={styles.languageImg}>
              <img src="/images/engLetter.png" alt="eng-letter"></img>
            </div>
          </span> */}
        {/* </form> */}
      </div>
    </>
  );
}
