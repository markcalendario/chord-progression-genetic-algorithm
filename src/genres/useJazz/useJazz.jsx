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

export default function useJazz() {
  const [progression, setProgression] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicKey, setMusicKey] = useState(null);
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

    playSequence(drums, drumsSequence, "16n", 0, true);
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

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return Tone.getTransport().pause();
    }

    setIsPlaying(true);
    return Tone.getTransport().start();
  };

  const generateProgression = async () => {
    const awit = new AwitGeneticAlgorithm();
    setMusicKey(awit.KEY);
    const progression = await awit.start();
    setProgression(progression);
  };

  useEffect(() => {
    if (!piano || !drums || !bass || !progression || !musicKey) return;
    initializePopSequences();
  }, [piano, drums, bass, progression, musicKey]);

  useEffect(() => {
    generateProgression();
  }, []);

  if (!piano || !drums || !bass || !progression || !musicKey)
    return [null, null, currentPlayingChord];

  return [progression, musicKey, togglePlay, currentPlayingChord];
}
