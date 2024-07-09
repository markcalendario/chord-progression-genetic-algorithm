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
        try {
          instrument.triggerAttackRelease(note, chord.duration, time);
        } catch (error) {
          if (note) {
            console.log("No note for:", chord.notes);
          }
        }
      });
    },
    sequence,
    noteSubdivision
  );

  constructedSequence.loop = loop;
  constructedSequence.start(start);

  return constructedSequence;
}
