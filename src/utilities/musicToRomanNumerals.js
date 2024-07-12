import AwitGeneticAlgorithm from "./awitGeneticAlgorithm.js";

export default function romanNumeralEquivalent(chord, musicKey) {
  if (musicKey === "X") return "X";

  const romanEquivalent = ["I", "ii", "iii", "IV", "V", "vi"];
  const awit = new AwitGeneticAlgorithm(musicKey);
  const chordsList = awit.getAllChordsOfKey(musicKey);
  return romanEquivalent[chordsList.indexOf(chord)];
}
