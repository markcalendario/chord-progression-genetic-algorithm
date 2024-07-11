import useJazz from "../useJazz/useJazz.jsx";
import useMelodic from "../useMelodic/useMelodic.jsx";
import usePop from "../usePop/usePop.jsx";

export default function useGenreHook(genre) {
  let genreHook;

  if (genre === "melodic") {
    genreHook = useMelodic;
  } else if (genre === "pop") {
    genreHook = usePop;
  } else if (genre === "jazz") {
    genreHook = useJazz;
  }

  const [progression, key, togglePlay, currentPlayingChord] = genreHook();
  return [progression, key, togglePlay, currentPlayingChord];
}
