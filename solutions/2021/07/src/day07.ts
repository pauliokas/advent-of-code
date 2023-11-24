const calculateTotalFuel =
  (fuelFn: (f: number) => number) =>
  (input: number[]): number => {
    const min = Math.min(...input);
    const max = Math.max(...input);

    let minFuelUsed = Infinity;
    for (let i = min; i <= max; i += 1) {
      const fuelUsed = input.reduce((acc, position) => acc + fuelFn(Math.abs(position - i)), 0);

      if (fuelUsed < minFuelUsed) {
        minFuelUsed = fuelUsed;
      }
    }

    return minFuelUsed;
  };

export const solvePart1 = calculateTotalFuel((change) => change);

export const solvePart2 = calculateTotalFuel((change) => (change * (1 + change)) / 2);
