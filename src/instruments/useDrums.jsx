import { useEffect, useState } from "react";
import * as Tone from "tone";

export default function useDrums() {
  const [drum, setDrum] = useState();

  const initializeDrums = async () => {
    const drum = new Tone.Sampler({
      urls: {
        A0: "HiHat.wav",
        A1: "Kick.wav",
        A2: "Snare.wav"
      },
      release: 1,
      baseUrl: "/assets/drum/"
    }).toDestination();

    await Tone.loaded();
    setDrum(drum);
  };

  useEffect(() => {
    initializeDrums();
  }, []);

  return drum;
}
