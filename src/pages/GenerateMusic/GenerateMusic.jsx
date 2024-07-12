import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Chord from "../../components/Chord/Chord.jsx";
import LinkButton from "../../components/LinkButton/LinkButton.jsx";
import useGenreHook from "../../genres/useGenreHook/useGenreHook.jsx";
import AwitGeneticAlgorithm from "../../utilities/awitGeneticAlgorithm.js";
import DisplayResult from "../Result/Result.jsx";
import styles from "./GenerateMusic.module.scss";

export default function GenerateMusicCompiled() {
  const [progression, setProgression] = useState(null);
  const [musicKey, setMusicKey] = useState(null);
  const [fitnessHistory, setFitnessHistory] = useState(null);

  const generateProgression = async () => {
    const awit = new AwitGeneticAlgorithm();
    const progression = await awit.start();

    setMusicKey(awit.KEY);
    setProgression(progression);
    setFitnessHistory(awit.FITNESS_HISTORY);
  };

  useEffect(() => {
    generateProgression();
  }, []);

  if (!progression) return "Loading";

  return (
    <Fragment>
      <MusicPlayer musicKey={musicKey} progression={progression} />
      <DisplayResult dataPoints={fitnessHistory} />
    </Fragment>
  );
}

MusicPlayer.propTypes;

function MusicPlayer({ musicKey, progression }) {
  const { genre } = useParams();
  const [isPlaying, togglePlay, currentPlayingChord] = useGenreHook(genre, progression);

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

  useEffect(() => {
    const validGenres = ["pop", "melodic", "jazz"];
    if (!validGenres.includes(genre)) {
      window.location.href = "/compose";
    }
  }, [genre]);

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
              {!togglePlay && <Button>Please Wait...</Button>}
              {togglePlay && !isPlaying ? 
                <Button 
                  className={styles.playBtn} 
                  onClick={togglePlay}>
                  Play
                </Button> : ""
              }
              {togglePlay && isPlaying ? 
                <Button 
                  className={styles.pauseBtn}
                  onClick={togglePlay}>
                  Pause
                </Button> : ""
              }
              <LinkButton href={`/compose/${genre}`}>Generate New Chord Set</LinkButton>
              <LinkButton href="/compose/">Select Genre</LinkButton>
            </div>

            <div className={styles.chords}>{renderProgressionChords()}</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
