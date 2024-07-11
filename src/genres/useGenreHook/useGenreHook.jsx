import useJazz from "../useJazz/useJazz.jsx";
import useMelodic from "../useMelodic/useMelodic.jsx";
import usePop from "../usePop/usePop.jsx";

export default function useGenreHook(genre, progression) {
  let genreHook;

  if (genre === "melodic") {
    genreHook = useMelodic;
  } else if (genre === "pop") {
    genreHook = usePop;
  } else if (genre === "jazz") {
    genreHook = useJazz;
  }

  const [togglePlay, currentPlayingChord] = genreHook(progression);
  return [togglePlay, currentPlayingChord];
}
