import styles from "./Chord.module.scss";

export default function Chord({ chord, active }) {
  return (
    <div className={styles.chord + (active ? " " + styles.active : "")}>
      <p>{chord}</p>
    </div>
  );
}
