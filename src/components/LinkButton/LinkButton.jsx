import styles from "./LinkButton.module.scss";

export default function LinkButton({ id, className, href, children }) {
  return (
    <a
      id={id}
      className={styles.linkButton + (className ? className : "")}
      href={href}>
      {children}
    </a>
  );
}
