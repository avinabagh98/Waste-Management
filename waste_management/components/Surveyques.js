import styles from "./surveyques.module.css";

export default function Surveyques({
  id,
  labelText,
  handleVal,
  value,
  type,
  disabled,
  required,
  defaultValue,
}) {


  // Function to get today's date from localStorage or current date if not available
  // const getDefaultDate = () => {
  //   const storedDate = localStorage.getItem("today");
  //   if (storedDate) {
  //     return storedDate;
  //   } else {
  //     const currentDate = new Date().toISOString().split('T')[0];
  //     return currentDate;
  //   }
  // };
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id}>
          {labelText}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
        <input
          id={id}
          type={type}
          value={value || defaultValue}
          onChange={(e) => handleVal(id, e.target.value)}
          className={styles.surveyInput}
          disabled={disabled || false}
        ></input>
      </div>
    </>
  );
}
