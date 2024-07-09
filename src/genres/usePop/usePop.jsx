import * as Tone from "tone";
import useDrums from "../../instruments/useDrums.jsx";
import useGuitar from "../../instruments/useGuitar.jsx";
import usePiano from "../../instruments/usePiano.jsx";
import playSequence from "../../utilities/sequence.js";
import drumStrikes from "./drumStrikes.js";
import guitarPlucks from "./guitarPlucks.js";
import pianoChords from "./pianoChords.js";

export default function usePop() {
  const piano = usePiano();
  const drums = useDrums();
  const guitar = useGuitar();

  const playPop = () => {
    if (!piano || !drums) return;

    const drumsSequence = drumStrikes;
    const pianoSequence = [
      ...pianoChords["C"],
      ...pianoChords["G"],
      ...pianoChords["Am"],
      ...pianoChords["F"]
    ];
    const guitarSequence = [
      ...guitarPlucks["C"],
      ...guitarPlucks["G"],
      ...guitarPlucks["Am"],
      ...guitarPlucks["F"]
    ];

    playSequence(drums, drumsSequence, "8n", 0, true);
    playSequence(piano, pianoSequence, "4n", 0, true);
    playSequence(guitar, guitarSequence, "8n", 0, true);

    Tone.getTransport().bpm.value = 100;
    Tone.getTransport().start();
  };

  // If piano or drums are not initialized, return null
  if (!piano || !drums) return null;

  // Return the playPop function to be used externally
  return playPop;
}
