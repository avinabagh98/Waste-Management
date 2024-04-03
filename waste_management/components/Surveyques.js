import styles from "./surveyques.module.css";

export default function Surveyques({
  id,
  labelText,
  handleVal,
  value,
  disabled,
}) {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          value={value || ""}
          onChange={(e) => handleVal(id, e.target.value)}
          className={styles.surveyInput}
          disabled={disabled || false}
        ></input>
      </div>
    </>
  );
}
