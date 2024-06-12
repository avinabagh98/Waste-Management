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
