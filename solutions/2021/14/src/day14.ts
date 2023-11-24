const addCounts = (totalCounts: Record<string, number>, counts: Record<string, number>) => {
  Object.entries(counts).forEach(([letter, count]) => {
    // eslint-disable-next-line no-param-reassign
    totalCounts[letter] = (totalCounts[letter] || 0) + count;
  });

  return totalCounts;
};

const initializeEngine = (rules: Record<string, string>, steps: number) => {
  const cache: Record<string, Record<string, number>> = {};
  const getCharacterCounts = (leftCh: string, rightCh: string, step = 0): Record<string, number> => {
    const cacheKey = `${leftCh}${rightCh}-${step}`;

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const newCh = rules[`${leftCh}${rightCh}`];

    const counts = { [newCh]: 1 };
    if (step < steps - 1) {
      addCounts(counts, getCharacterCounts(leftCh, newCh, step + 1));
      addCounts(counts, getCharacterCounts(newCh, rightCh, step + 1));
    }

    cache[cacheKey] = counts;

    return counts;
  };

  return getCharacterCounts;
};

const iterate =
  (steps: number) =>
  ({ template, rules }: { template: string[]; rules: Record<string, string> }): number => {
    const getCharacterCounts = initializeEngine(rules, steps);

    const counts = template.reduce((acc, letter) => addCounts(acc, { [letter]: 1 }), {} as Record<string, number>);
    for (let i = 0; i < template.length - 1; i += 1) {
      addCounts(counts, getCharacterCounts(template[i], template[i + 1]));
    }

    return Math.max(...Object.values(counts)) - Math.min(...Object.values(counts));
  };

export const solvePart1 = iterate(10);

export const solvePart2 = iterate(40);
