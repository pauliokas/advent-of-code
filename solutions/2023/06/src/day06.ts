export const solvePart1 = ([timeLine, distanceLine]: [string, string]): number => {
  const times = timeLine.split(/\s+/).map(Number);
  const distances = distanceLine.split(/\s+/).map(Number);

  let result = 1;
  for (let i = 0; i < times.length; i += 1) {
    let waysToWin = 0;
    for (let j = 1; j < times[i]; j += 1) {
      const travelDistance = (times[i] - j) * j;
      if (travelDistance > distances[i]) waysToWin += 1;
    }
    result *= waysToWin;
  }
  return result;
};

export const solvePart2 = ([timeLine, distanceLine]: [string, string]): number => {
  const time = Number(timeLine.replaceAll(/\s+/g, ''));
  const distance = Number(distanceLine.replaceAll(/\s+/g, ''));

  let waysToWin = 0;
  for (let i = 1; i < time; i += 1) {
    const travelDistance = (time - i) * i;
    if (travelDistance > distance) waysToWin += 1;
  }

  return waysToWin;
};
