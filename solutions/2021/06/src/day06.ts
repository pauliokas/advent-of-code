const cooldown = 7;
const penalty = 2;

const simulatePopulation =
  (days: number) =>
  (school: number[]): number => {
    const groupedByDays = school.reduce(
      (counts, d) => {
        // eslint-disable-next-line no-param-reassign
        counts[d] += 1;
        return counts;
      },
      new Array(cooldown + penalty).fill(0),
    );

    for (let i = 0; i < days; i += 1) {
      // const xxx = groupedByDays[cooldown + penalty - 1];
      // const yyy = groupedByDays[cooldown - 1];
      const [zzz] = groupedByDays;

      for (let j = 0; j < groupedByDays.length - 1; j += 1) {
        groupedByDays[j] = groupedByDays[j + 1];
      }

      groupedByDays[cooldown + penalty - 1] = zzz;
      groupedByDays[cooldown - 1] += zzz;
    }

    return groupedByDays.reduce((acc, count) => acc + count, 0);
  };

export const solvePart1 = simulatePopulation(80);

export const solvePart2 = simulatePopulation(256);
