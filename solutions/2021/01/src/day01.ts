const countIncreases = (windowSize: number) => {
  return (input: number[]): number => {
    const sums = new Array(input.length - windowSize + 1).fill(0);
    for (let i = 0; i < input.length - windowSize + 1; i += 1) {
      for (let j = 0; j < windowSize; j += 1) {
        sums[i] += input[i + j];
      }
    }

    let timesIncreased = 0;
    for (let i = 1; i < sums.length; i += 1) {
      if (sums[i] > sums[i - 1]) {
        timesIncreased += 1;
      }
    }

    return timesIncreased;
  };
};

export const solvePart1 = countIncreases(1);

export const solvePart2 = countIncreases(3);
