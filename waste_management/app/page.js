"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    }
    else {
      setTimeout(() => {
        router.push("/home/dashboard");
      }, 3000);
    }

  });

  return (
    <>
      <div className={styles.body}>
        <img
          className={styles.logoimage}
          src="images/logo.png"
          alt="waste_management"
        />
      </div>
    </>
  );
}
