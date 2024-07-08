import * as Tone from "tone";
import usePiano from "../../instruments/usePiano.jsx";
import { getTimeFromDurations } from "../../utilities/general.js";
import arrangement from "./pianoChords.js";

export default function usePop() {
  const piano = usePiano();

  const playPop = () => {
    const notes = [];

    const generated = ["F", "Am", "Dm", "Em"];

    notes.push(...arrangement[generated[0]]);
    notes.push(...arrangement[generated[1]]);
    notes.push(...arrangement[generated[2]]);
    notes.push(...arrangement[generated[3]]);

    const notesAndDurations = [...notes].map(getTimeFromDurations);

    const part = new Tone.Part((time, value) => {
      piano.triggerAttackRelease(value.note, value.duration, time);
    }, notesAndDurations).start(0);

    Tone.getTransport().start();
  };

  if (!piano) return null;

  return playPop;
}
