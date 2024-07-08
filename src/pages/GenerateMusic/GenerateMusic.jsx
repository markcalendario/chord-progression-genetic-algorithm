import Button from "../../components/Button/Button.jsx";
import Chord from "../../components/Chord/Chord.jsx";
import styles from "./GenerateMusic.module.scss";

export default function GenerateMusicCompiled() {
  return <GenerateMusic />;
}

function GenerateMusic() {
  return (
    <section id={styles.generateMusic}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <h1>Your melodic music is ready.</h1>
          </div>

          <div className={styles.controls}>
            <Button>Play</Button>
            <Button>Select Genre</Button>
            <Button>Generate New</Button>
          </div>

          <div className={styles.chords}>
            <Chord chord="G" active />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="G" />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="G" />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="G" />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="F" />
            <Chord chord="C" />
            <Chord chord="G" />
            <Chord chord="Am" />
            <Chord chord="F" />
            <Chord chord="C" />
          </div>
        </div>
      </div>
    </section>
  );
}
