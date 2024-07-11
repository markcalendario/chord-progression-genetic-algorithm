import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Tone from "tone";
import Button from "../../components/Button/Button.jsx";
import Chord from "../../components/Chord/Chord.jsx";
import LinkButton from "../../components/LinkButton/LinkButton.jsx";
import useGenreHook from "../../genres/useGenreHook/useGenreHook.jsx";
import DisplayResult from "../Result/Result.jsx";
import styles from "./GenerateMusic.module.scss";

export default function GenerateMusicCompiled() {
  return <GenerateMusic />;
}

function GenerateMusic() {
  const { genre } = useParams();
  const [progression, musicKey, togglePlay, playingChord, fitnessHistory] =
    useGenreHook(genre);

  const renderProgressionChords = () => {
    return progression.map((chord, index) => (
      <Chord
        key={index}
        chord={chord}
        musicKey={musicKey}
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
    <Fragment>
      <section id={styles.generateMusic}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.texts}>
              <h1>
                Your <span className={styles.genre}>{genre}</span> music is
                ready.
              </h1>
            </div>

            <div className={styles.controls}>
              <Button
                onClick={() => {
                  Tone.getTransport().start();
                }}>
                Play / Stop
              </Button>
              <LinkButton href="/compose">Select Genre</LinkButton>
            </div>

            <div className={styles.chords}>{renderProgressionChords()}</div>
          </div>
        </div>
      </section>
      <DisplayResult dataPoints={fitnessHistory} />
    </Fragment>
  );
}
