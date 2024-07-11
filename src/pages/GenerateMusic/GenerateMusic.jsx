import Button from "../../components/Button/Button.jsx";
import Chord from "../../components/Chord/Chord.jsx";
import usePop from "../../genres/usePop/usePop.jsx";
import styles from "./GenerateMusic.module.scss";

export default function GenerateMusicCompiled() {
  return <GenerateMusic />;
}

function GenerateMusic() {
  const [progression, togglePlayPop, currentPlayingChord] = usePop("C");

  const renderProgressionChords = () => {
    return progression.map((chord, index) => (
      <Chord
        key={index}
        chord={chord}
        musicKey={"C"}
        active={index === currentPlayingChord}
      />
    ));
  };

  if (!progression) {
    return "Loading";
  }

  return (
    <section id={styles.generateMusic}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <h1>Your melodic music is ready.</h1>
          </div>

          <div className={styles.controls}>
            <Button onClick={togglePlayPop}>Play / Stop</Button>
            <Button>Select Genre</Button>
            <Button>Generate New</Button>
          </div>

          <div className={styles.chords}>{renderProgressionChords()}</div>
        </div>
      </div>
    </section>
  );
}
