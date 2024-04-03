import styles from "./surveyques.module.css";

export default function Surveyques({
  id,
  labelText,
  handleVal,
  value,
  disabled,
  required,
}) {
  const handleInvalid = (e) => {
    e.preventDefault();
    const fieldLabel = e.target.labels[0]?.textContent || "";
    alert(`${fieldLabel} is required.`);
  };
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id}>
          {labelText}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
        <input
          id={id}
          type="text"
          value={value || ""}
          onChange={(e) => handleVal(id, e.target.value)}
          className={styles.surveyInput}
          disabled={disabled || false}
        ></input>
      </div>
    </>
  );
}
