import styles from "./LinkButtonCard.module.scss";

export default function LinkButtonCard({ title, image, href }) {
  return (
    <a className={styles.linkButtonCard} href={href}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </a>
  );
}
