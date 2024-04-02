"use client";
import styles from "./home.module.css";

export default function homelayout({ children }) {
  return (
    <>
      <div className={styles.body}>{children}</div>
    </>
  );
}
