import { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";
import useBass from "../../instruments/useBass.jsx";
import useDrums from "../../instruments/useDrums.jsx";
import useGuitar from "../../instruments/useGuitar.jsx";
import usePiano from "../../instruments/usePiano.jsx";
import playSequence from "../../utilities/sequence.js";
import bassPlucks from "./bassPlucks.js";
import drumStrikes from "./drumStrikes.js";
import guitarPlucks from "./guitarPlucks.js";
import pianoChords from "./pianoChords.js";

export default function useMelodic(progression) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingChord, setCurrentPlayingChord] = useState(-1);
  const piano = usePiano();
  const drums = useDrums();
  const guitar = useGuitar();
  const bass = useBass();

  const initializeMelodicSequences = useCallback(() => {
    const drumsSequence = drumStrikes;
    const pianoSequence = [];
    const guitarSequence = [];
    const bassSequence = [];

    for (const chord of progression) {
      pianoSequence.push(...pianoChords[chord]);
      guitarSequence.push(...guitarPlucks[chord]);
      bassSequence.push(...bassPlucks[chord]);
    }

    // playSequence(drums, drumsSequence, "8n", 0, true);
    playSequence(piano, pianoSequence, "16n", 0, true);
    playSequence(guitar, guitarSequence, "1n", 0, true);
    playSequence(bass, bassSequence, "8n", 0, true);

    Tone.getTransport().bpm.value = 50;

    // Schedule the increment of currentPlayingChord every 8n
    Tone.getTransport().scheduleRepeat(() => {
      setCurrentPlayingChord(
        (prevChord) => (prevChord + 1) % progression.length
      );
    }, "1n");
  }, [bass, drums, guitar, piano, progression]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return Tone.getTransport().pause();
    }

    setIsPlaying(true);
    return Tone.getTransport().start();
  };

  useEffect(() => {
    if (!piano || !drums || !bass) return;
    initializeMelodicSequences();
  }, [piano, drums, bass, initializeMelodicSequences]);

  if (!piano || !drums || !bass) return [null, null];

  return [togglePlay, currentPlayingChord];
}
