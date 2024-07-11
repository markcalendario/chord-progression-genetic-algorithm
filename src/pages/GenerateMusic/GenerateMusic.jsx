import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Chord from "../../components/Chord/Chord.jsx";
import useGenreHook from "../../genres/useGenreHook/useGenreHook.jsx";
import styles from "./GenerateMusic.module.scss";

export default function GenerateMusicCompiled() {
  return <GenerateMusic />;
}

function GenerateMusic() {
  const { genre } = useParams();
  const [progression, togglePlay, playingChord] = useGenreHook(genre, "C");

  const renderProgressionChords = () => {
    return progression.map((chord, index) => (
      <Chord
        key={index}
        chord={chord}
        musicKey={"C"}
        active={index === playingChord}
      />
    ));
  };

  useEffect(() => {
    const validGenres = ["pop", "melodic", "jazz"];
    if (!validGenres.includes(genre)) {
      window.location.href = "/compose";
    }
  }, [genre]);

  if (!progression) {
    return "Loading";
  }

  return (
    <section id={styles.generateMusic}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <h1>
              Your <span className={styles.genre}>{genre}</span> music is ready.
            </h1>
          </div>

          <div className={styles.controls}>
            <Button onClick={togglePlay}>Play / Stop</Button>
            <Button>Select Genre</Button>
            <Button>Generate New</Button>
          </div>

          <div className={styles.chords}>{renderProgressionChords()}</div>
        </div>
      </div>
    </section>
  );
}
