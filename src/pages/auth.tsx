import Input from "@/components/Input";
import { useCallback, useState } from "react";
import styles from "../styles/Auth.module.css";

import Register from "@/components/register";
import Login from "@/components/login";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: NextPageContext) => {
  const userIsAuthenticated = await getSession(context); // TODO: check if user is authenticated
  if (userIsAuthenticated) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Auth = () => {
  const [login, setLogin] = useState("login");

  const toggleLogin = () => {
    setLogin((i) => (i === "login" ? "register" : "login"));
  };

  return (
    <div className={styles.auth}>
      <div className={styles.content}>
        <div className={styles.form}>
          <h1 className={styles.title}>
            {login === "login" ? "Connexion" : "Inscription"}
          </h1>
          {login === "login" ? <Login /> : <Register />}
          <p className={styles.text}>
            {login === "login"
              ? "Vous ne possédez pas de "
              : "Vous possédez déja un "}
            <span onClick={toggleLogin} className={styles.lien}>
              Compte
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
