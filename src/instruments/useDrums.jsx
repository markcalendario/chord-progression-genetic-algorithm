import { useEffect, useState } from "react";
import * as Tone from "tone";

export default function useDrums() {
  const [drum, setDrum] = useState();

  const initializeDrums = async () => {
    const drum = new Tone.Sampler({
      urls: {
        A0: "bass.mp3",
        A1: "crash.mp3",
        A2: "floor-tom.mp3",
        A3: "hithat-foot.mp3",
        A4: "hithat-open.mp3",
        A5: "hithat.mp3",
        A6: "ride.mp3",
        A7: "snare-drum.mp3",
        B0: "snare-stick.mp3",
        B1: "tom1.mp3",
        B2: "tom2.mp3"
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
