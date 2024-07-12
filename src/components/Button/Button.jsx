import styles from "./Button.module.scss";

export default function Button({ id, className, onClick, children }) {
  return (
    <button
      id={id}
      className={styles.button + (className ? " " + className : "")}
      onClick={onClick}>
      {children}
    </button>
  );
}
