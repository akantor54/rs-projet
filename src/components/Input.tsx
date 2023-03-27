import styles from "../styles/components/Input.module.css";

const Input = ({ value, onChange, holder, label }: any) => {
  return (
    <>
      <textarea
        className={styles.input}
        rows={8}
        value={value}
        onChange={onChange}
        placeholder={holder}
        id={label}
      />
    </>
  );
};

export default Input;
