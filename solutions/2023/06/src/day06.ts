const countWaysToWin = (time: number, distance: number) => {
  let waysToWin = 0;
  for (let i = 1; i < time; i += 1) {
    const travelDistance = (time - i) * i;
    if (travelDistance > distance) waysToWin += 1;
  }

  return waysToWin;
};

export const solvePart1 = ([timeLine, distanceLine]: [string, string]): number => {
  const times = timeLine.split(/\s+/).map(Number);
  const distances = distanceLine.split(/\s+/).map(Number);

  let result = 1;
  for (let i = 0; i < times.length; i += 1) {
    result *= countWaysToWin(times[i], distances[i]);
  }

  return result;
};

export const solvePart2 = ([timeLine, distanceLine]: [string, string]): number => {
  return countWaysToWin(Number(timeLine.replaceAll(/\s+/g, '')), Number(distanceLine.replaceAll(/\s+/g, '')));
};
