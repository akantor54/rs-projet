import styles from "../styles/components/AuthForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import axios from "axios";

const schema = zod.object({
  name: zod.string().min(6),
  email: zod.string().email(),
  password: zod.string().min(11),
  date: zod.string(),
  age: zod.string(),
});

const Register = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await axios
      .post("/api/register", data)
      .then((res) => console.log(res.data))
      .catch((err) => {
        setError("user", { type: "custom", message: err.response.data.error });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {errors.user && <p>{errors.user.message?.toString()}</p>}
      {errors.name && <p>votre pseudo doit faire entre 6 et 16 caractere</p>}
      <input
        className={
          errors.name ? styles.input + " " + styles.error : styles.input
        }
        type="text"
        placeholder="Entrez votre pseudo"
        {...register("name")}
      />
      {errors.email && <p>votre adresse mail est invalid</p>}
      <input
        className={
          errors.email ? styles.input + " " + styles.error : styles.input
        }
        type="email"
        placeholder="Entrez votre adresse mail"
        {...register("email")}
      />
      {errors.password && (
        <p>votre mot de passe doit faire minimum 11 caractere</p>
      )}
      <input
        className={
          errors.password ? styles.input + " " + styles.error : styles.input
        }
        type="password"
        placeholder="Entrez votre mot de passe"
        {...register("password")}
      />
      <input
        className={
          errors.password ? styles.input + " " + styles.error : styles.input
        }
        type="date"
        {...register("date")}
      />
      <input
        className={
          errors.password ? styles.input + " " + styles.error : styles.input
        }
        type="number"
        placeholder="Entrez votre  age"
        {...register("age")}
      />
      <button type="submit" className={styles.button}>
        Inscription
      </button>
    </form>
  );
};

export default Register;
