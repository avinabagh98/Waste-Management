"use client";

import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import FooterDesign from "@/components/FooterDesign";

export default function LoginPage() {

  //Login state variables

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role_name, setRoleName] = useState();
  const [role_id, setRole_id] = useState();

  //Other declations
  const loginData = {
    user_name: username,
    password: password,
    role_id: role_id,
  };

  const loadingHeaderData = {
    name: role_name,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const route = useRouter();
  const translate = LanguageFetcher();

  //Localstorage fetching on page load
  useEffect(() => {
    localStorage.setItem("previousPath", "/home")
    setRole_id(localStorage.getItem("role_id"));
    setRoleName(localStorage.getItem("role_name"));
  }, [role_id, role_name]);

  //Handler Functions
  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        loginData
      );

      if (res.data.status === "success") {
        //Setting user details to localstorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("user_id", res.data.user_id)
        localStorage.setItem("user_contact", res.data.user_contact);
        localStorage.setItem("user_type", res.data.user_type_name);
        localStorage.setItem("block", res.data.block);
        localStorage.setItem("block_id", res.data.block_id);
        localStorage.setItem("gp", res.data.gp);
        localStorage.setItem("gp_id", res.data.gp_id);
        localStorage.setItem("district", res.data.district);
        localStorage.setItem("district_id", res.data.district_id);
        localStorage.setItem("ward_id", res.data.ward_id);
        localStorage.setItem("ward", res.data.ward_name);
        localStorage.setItem("supervisor", res.data.supervisor);
        localStorage.setItem("supervisor_id", res.data.supervisor_id);

        //message
        swal("Successfully", "logged in", "success");
        //redirecting
        route.push("/home/dashboard");
      }
    } catch (error) {
      if (error.name === "AxiosError") {
        swal("Login Error", "Please enter valid credentials", "error");
      }
      if (error.name === "ReferenceError") {
        swal("Error", "Something Wrong happend", "error");
      }
    }
  };

  return (
    <>
      <Header isOffCanvasVisible={false} loadingdata={loadingHeaderData} />
      <div className={styles.loginContainer}>
        <h2>{translate?.user_login}</h2>
        <div className={styles.loginForm}>
          <span>
            <label htmlFor="username">{translate?.user_name}</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
            ></input>
          </span>
          <span>
            <label htmlFor="password">{translate?.password}</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            ></input>
          </span>
          <button onClick={loginHandler}>{translate?.login}</button>
          <a href="#">
            <p>{translate?.forgot_your_password}</p>
          </a>
        </div>
        <FooterDesign />
      </div>
    </>
  );
}
