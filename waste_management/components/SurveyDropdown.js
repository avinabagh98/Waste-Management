import React from "react";
import styles from "./SurveyDropdown.module.css";

export default function SurveyDropdown({
  id,
  labelText,
  options,
  handleVal,
  required,
  value,
}) {
  return (
    <div className={styles.dropdowncontainer}>
      <label htmlFor={id}>{labelText}</label>
      {required && <span style={{ color: "red" }}>*</span>}
      <select
        id={id}
        onChange={(e) => handleVal(id, e.target.value)}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
