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

export default function useMelodic(musicKey) {
  const [progression, setProgression] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(musicKey);
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

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return Tone.getTransport().pause();
    }

    setIsPlaying(true);
    return Tone.getTransport().start();
  };

  const generateProgression = async () => {
    const awit = new AwitGeneticAlgorithm(key);
    const progression = await awit.start();
    setProgression(progression);
  };

  useEffect(() => {
    if (!piano || !drums || !bass || !progression) return;
    initializePopSequences();
  }, [piano, drums, bass, progression]);

  useEffect(() => {
    generateProgression();
  }, []);

  // If piano or drums are not initialized, return null
  if (!piano || !drums || !bass || !progression)
    return [null, null, currentPlayingChord];

  // Return the playPop function to be used externally
  return [progression, togglePlay, currentPlayingChord];
}
