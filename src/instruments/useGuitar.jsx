import { useEffect, useState } from "react";
import * as Tone from "tone";

export default function usePiano() {
  const [piano, setPiano] = useState();

  const initializePiano = async () => {
    const piano = new Tone.Sampler({
      urls: {
        A2: "A2.mp3",
        A3: "A3.mp3",
        A4: "A4.mp3",
        As2: "A2.mp3",
        As3: "A2.mp3",
        As4: "A2.mp3",
        As4: "A2.mp3",
        As4: "A2.mp3",
        As4: "A2.mp3",
        As4: "A2.mp3"
      },
      release: 1,
      baseUrl: "/assets/guitar/"
    }).toDestination();

    await Tone.loaded();
    setPiano(piano);
  };

  useEffect(() => {
    initializePiano();
  }, []);

  return piano;
}
