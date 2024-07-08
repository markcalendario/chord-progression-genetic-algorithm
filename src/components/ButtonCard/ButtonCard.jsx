import styles from "./ButtonCard.module.scss";

export default function ButtonCard({ title, image, onClick }) {
  return (
    <button className={styles.buttonCard} onClick={onClick}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </button>
  );
}
