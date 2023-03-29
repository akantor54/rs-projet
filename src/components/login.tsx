import styles from "../styles/components/AuthForm.module.css";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const route = useRouter();

  const login = useCallback(async () => {
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then(async ({ ok, error }: any) => {
      if (ok) {
        await route.push("/");
      } else if (error) {
        setErrorLogin("mauvais email et/ou password");
        console.log("une erreur de connexion");
      }
    });
  }, [email, password, route]);

  return (
    <form className={styles.form}>
      {errorLogin && errorLogin}
      <input
        className={styles.input}
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
        className={styles.button}
      >
        Connexion
      </button>
    </form>
  );
};

export default Login;
