import { useEffect, useState } from "react";
import * as Tone from "tone";

export default function useBass() {
  const [bass, setBass] = useState();

  const initializeBass = async () => {
    const bass = new Tone.Sampler({
      urls: {
        E0: "e0.mp3",
        E1: "d3.mp3",
        E2: "g10.mp3",
        F0: "e2.mp3",
        "F#0": "e3.mp3",
        F1: "d4.mp3",
        "F#1": "d5.mp3",
        F2: "g11.mp3",
        "F#2": "g12.mp3",
        G0: "e4.mp3",
        "G#0": "e5.mp3",
        G1: "g0.mp3",
        "G#1": "g2.mp3",
        G2: "g13.mp3",
        "G#2": "g14.mp3",
        A0: "a0.mp3",
        "A#0": "a2.mp3",
        A1: "g3.mp3",
        "A#1": "g4.mp3",
        B0: "a3.mp3",
        B1: "g5.mp3",
        C0: "a4.mp3",
        "C#0": "a5.mp3",
        C1: "g6.mp3",
        "C#1": "g7.mp3",
        D0: "d0.mp3",
        "D#0": "d2.mp3",
        D1: "g8.mp3",
        "D#1": "g9.mp3"
      },
      release: 1,
      baseUrl: "/assets/bass/"
    }).toDestination();

    bass.volume.value = -10;
    await Tone.loaded();
    setBass(bass);
  };

  useEffect(() => {
    initializeBass();
  }, []);

  return bass;
}
