const countDifferences = (a: string, b: string): number => {
  let differences = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) differences += 1;
  }
  return differences;
};

const findMirror = (pattern: string[], smudgeTolerance: number) => {
  outer: for (let i = 0; i < pattern.length - 1; i += 1) {
    let smudges = 0;
    for (let j = 0; j < Math.min(i + 1, pattern.length - 1 - i); j += 1) {
      smudges += countDifferences(pattern[i - j], pattern[i + j + 1]);
      if (smudges > smudgeTolerance) continue outer;
    }

    if (smudges !== smudgeTolerance) continue;
    return i + 1;
  }

  return 0;
};

const transpose = (pattern: string[]): string[] => {
  const newPattern: string[] = [];
  for (let i = 0; i < pattern[0].length; i += 1) {
    const zzz = pattern.map((line) => line[i]);
    newPattern.push(zzz.join(''));
  }

  return newPattern;
};

const solve = (smudgeTolerance: number) => (input: string[][]) => {
  let result = 0;
  for (const pattern of input) {
    let mirrorIdx = findMirror(pattern, smudgeTolerance);
    let multiplier = 100;
    if (!mirrorIdx) {
      mirrorIdx = findMirror(transpose(pattern), smudgeTolerance);
      multiplier = 1;
    }

    result += multiplier * mirrorIdx;
  }

  return result;
};

export const solvePart1 = solve(0);

export const solvePart2 = solve(1);
