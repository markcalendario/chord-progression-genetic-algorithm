import romanNumeralEquivalent from "../../utilities/musicToRomanNumerals.js";
import styles from "./Chord.module.scss";

export default function Chord({ chord, musicKey, active }) {
  return (
    <div className={styles.chord + (active ? " " + styles.active : "")}>
      <p className={styles.chordValue}>{chord}</p>
      <p className={styles.roman}>{romanNumeralEquivalent(chord, musicKey)}</p>
    </div>
  );
}
