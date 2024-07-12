import { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Chord from "../../components/Chord/Chord.jsx";
import LinkButton from "../../components/LinkButton/LinkButton.jsx";
import useGenreHook from "../../genres/useGenreHook/useGenreHook.jsx";
import styles from "./GenerateUgly.module.scss";

export default function GenerateUglyCompiled() {
  const [progression, setProgression] = useState(null);
  const [musicKey, setMusicKey] = useState(null);

  const generateProgression = async () => {
    const progression = ["E", "Em", "G#m", "G", "E", "B", "F", "Em"];

    setMusicKey("X");
    setProgression(progression);
  };

  useEffect(() => {
    generateProgression();
  }, []);

  if (!progression) return "Loading";

  return (
    <Fragment>
      <MusicPlayer musicKey={musicKey} progression={progression} />
    </Fragment>
  );
}

function MusicPlayer({ musicKey, progression }) {
  const [isPlaying, togglePlay, currentPlayingChord] = useGenreHook(
    "pop",
    progression
  );

  const renderProgressionChords = () => {
    return progression.map((chord, index) => (
      <Chord
        key={index}
        chord={chord}
        musicKey={musicKey}
        active={index === currentPlayingChord}
      />
    ));
  };

  return (
    <Fragment>
      <section id={styles.generateMusic}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.texts}>
              <h1>
                Your <span className={styles.genre}>ugly</span> music is ready.
              </h1>
            </div>

            <div className={styles.controls}>
              {!togglePlay && <Button>Please Wait...</Button>}
              {togglePlay && !isPlaying ? (
                <Button className={styles.playBtn} onClick={togglePlay}>
                  Play
                </Button>
              ) : (
                ""
              )}
              {togglePlay && isPlaying ? (
                <Button className={styles.pauseBtn} onClick={togglePlay}>
                  Pause
                </Button>
              ) : (
                ""
              )}
              <LinkButton href={`/compose/ugly`}>
                Generate New Chord Set
              </LinkButton>
              <LinkButton href="/compose/">Select Genre</LinkButton>
            </div>

            <div className={styles.chords}>{renderProgressionChords()}</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
