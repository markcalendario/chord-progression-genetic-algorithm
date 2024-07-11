import { useEffect, useState } from "react";
import * as Tone from "tone";
import useBass from "../../instruments/useBass.jsx";
import useDrums from "../../instruments/useDrums.jsx";
import useGuitar from "../../instruments/useGuitar.jsx";
import usePiano from "../../instruments/usePiano.jsx";
import AwitGeneticAlgorithm from "../../utilities/awitGeneticAlgorithm.js";
import playSequence from "../../utilities/sequence.js";
import bassPlucks from "./bassPlucks.js";
import drumStrikes from "./drumStrikes.js";
import guitarPlucks from "./guitarPlucks.js";
import pianoChords from "./pianoChords.js";

export default function usePop() {
  const [progression, setProgression] = useState(null);
  const [musicKey, setMusicKey] = useState(null);
  const [fitnessHistory, setFitnessHistory] = useState(null);
  const [currentPlayingChord, setCurrentPlayingChord] = useState(-1);
  const piano = usePiano();
  const drums = useDrums();
  const guitar = useGuitar();
  const bass = useBass();

  const initializePopSequences = () => {
    const drumsSequence = drumStrikes;
    const pianoSequence = [];
    const guitarSequence = [];
    const bassSequence = [];

    for (const chord of progression) {
      pianoSequence.push(...pianoChords[chord]);
      guitarSequence.push(...guitarPlucks[chord]);
      bassSequence.push(...bassPlucks[chord]);
    }

    playSequence(drums, drumsSequence, "8n", 0, true);
    playSequence(piano, pianoSequence, "8n", 0, true);
    playSequence(guitar, guitarSequence, "8n", 0, true);
    playSequence(bass, bassSequence, "8n", 0, true);

    Tone.getTransport().bpm.value = 100;

    // Schedule the increment of currentPlayingChord every 8n
    Tone.getTransport().scheduleRepeat((time) => {
      setCurrentPlayingChord(
        (prevChord) => (prevChord + 1) % progression.length
      );
    }, "1n");
  };

  const generateProgression = async () => {
    const awit = new AwitGeneticAlgorithm();
    setMusicKey(awit.KEY);
    const progression = await awit.start();
    setProgression(progression);
    setFitnessHistory(awit.FITNESS_HISTORY);
  };

  useEffect(() => {
    if (
      !piano ||
      !drums ||
      !bass ||
      !progression ||
      !musicKey ||
      !fitnessHistory
    )
      return;
    initializePopSequences();
  }, [piano, drums, bass, progression, musicKey, fitnessHistory]);

  useEffect(() => {
    generateProgression();
  }, []);

  if (!piano || !drums || !bass || !progression || !musicKey || !fitnessHistory)
    return [null, null, null, null];

  return [progression, musicKey, currentPlayingChord, fitnessHistory];
}
