export function getTimeFromDurations(value, i, arr) {
  const prevTime = arr[i - 1]?.time;
  value.time = prevTime + arr[i - 1]?.duration || 0;
  return value;
}
