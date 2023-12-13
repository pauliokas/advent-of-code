const findMirror = (pattern: string[]) => {
  outer: for (let i = 0; i < pattern.length - 1; i += 1) {
    for (let j = 0; j < Math.min(i + 1, pattern.length - 1 - i); j += 1) {
      if (pattern[i - j] !== pattern[i + j + 1]) {
        continue outer;
      }
    }

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

export const solvePart1 = (input: string[][]): number => {
  let result = 0;
  for (const pattern of input) {
    let mirrorIdx = findMirror(pattern);
    let multiplier = 100;
    if (!mirrorIdx) {
      mirrorIdx = findMirror(transpose(pattern));
      multiplier = 1;
    }

    result += multiplier * mirrorIdx;
  }

  return result;
};

export const solvePart2 = (input: string[][]): number => {
  throw new Error('Not implemented');
};
