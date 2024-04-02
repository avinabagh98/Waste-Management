"use client";

import React from "react";
import { useEffect, useState } from "react";
import Buttongroup from "@/components/role-lang/Buttongroup";
import Checkbutton from "@/components/role-lang/Checkbutton";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import styles from "./home.module.css";

export default function page() {
  const [language, setLanguage] = useState("en");
  const [roleValue, setRoleValue] = useState("");
  const [rolenName, setRolenName] = useState("");

  const route = useRouter();

  const data = {
    language: language,
    role_id: roleValue,
    role_name: rolenName,
  };
  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("role_name", rolenName);
    localStorage.setItem("role_id", roleValue);
    console.log("In home page role set to", roleValue);
  }, [data, roleValue, rolenName]);

  const handleRadioChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleUsertypeBtn = (event) => {
    setRoleValue(event.target.id);
    setRolenName(event.target.name);
    route.push("/home/login");
  };
  return (
    <>
      <div className={styles.pageContainer}>
        <Header defaultHeader={true} />
        <span className={styles.languageContainer}>
          <h2>SELECT LANGUAGE</h2>
          <Checkbutton
            handleRadioChange={handleRadioChange}
            radioValue={language}
          />
        </span>
        <span className={styles.roleContainer}>
          <h2>SELECT USER ROLE</h2>
          <Buttongroup handleUsertypeBtn={handleUsertypeBtn} />
        </span>
      </div>
    </>
  );
}
