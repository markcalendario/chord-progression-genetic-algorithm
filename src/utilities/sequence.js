import * as Tone from "tone";

export default function playSequence(
  instrument,
  sequence,
  noteSubdivision,
  start,
  loop
) {
  const constructedSequence = new Tone.Sequence(
    (time, chord) => {
      // Trigger all notes in the current sequence entry simultaneously
      chord.notes.forEach((note) => {
        instrument.triggerAttackRelease(note, chord.duration, time);
      });
    },
    sequence,
    noteSubdivision
  );

  constructedSequence.loop = loop;
  constructedSequence.start(start);

  return constructedSequence;
}
