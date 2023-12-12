import type { SpringRow } from './day12.input.js';

const isValid = (springs: string, checksums: number[]): boolean => {
  let groupLength = 0;
  let groupIdx = 0;
  for (let i = 0; i <= springs.length; i += 1) {
    const chr = i < springs.length ? springs[i] : '.';
    if (chr === '#') {
      groupLength += 1;
      continue;
    }

    if (groupLength > 0) {
      if (checksums.length <= groupIdx) return false;
      if (checksums[groupIdx] !== groupLength) return false;
      groupIdx += 1;
      groupLength = 0;
    }
  }

  return groupIdx === checksums.length;
};

export const getMatchingPatterns = (springs: string, checksums: number[]): string[] => {
  const nextUnknownIdx = springs.indexOf('?');
  if (nextUnknownIdx === -1) {
    return isValid(springs, checksums) ? [springs] : [];
  }

  return [
    ...getMatchingPatterns(
      `${springs.substring(0, nextUnknownIdx)}#${springs.substring(nextUnknownIdx + 1)}`,
      checksums,
    ),
    ...getMatchingPatterns(
      `${springs.substring(0, nextUnknownIdx)}.${springs.substring(nextUnknownIdx + 1)}`,
      checksums,
    ),
  ];
};

type Xxx = {
  springs: string;
  checksum: number;
};

function* tokenize(springs: string, [firstChecksum, ...otherChecksums]: number[]): Generator<Xxx[]> {
  if (firstChecksum === undefined) return;
  // if (otherChecksums.length === 0) {
  //   const possibleSpringsTotal = 0;
  //   let possibleSpringsGroup = 0;
  //   for (let i = 0; i < springs.length; i += 1) {
  //     const chr = springs[i];
  //     if (chr === '#' || chr === '?') {
  //       possibleSprings += 1;
  //     } else if (chr === '.') {
  //       asdfasdfasdfasd = Math.max(possibleSprings, asdfasdfasdfasd);
  //       possibleSprings = 0;
  //     }
  //   }
  //
  //   return;
  // }

  const endLength = otherChecksums.reduce((acc, cur) => acc + cur, 0);

  let possibleSprings = 0;
  for (let i = 0; i < springs.length - endLength; i += 1) {
    const chr = springs[i];

    if (chr === '#' || chr === '?') possibleSprings += 1;
    else if (chr === '.') possibleSprings = 0;

    if (possibleSprings < firstChecksum && possibleSprings < firstChecksum) continue;
    if (chr === '#' && springs[i + 1] === '#') continue;

    for (const otherTokens of tokenize(springs.substring(i + 1), otherChecksums)) {
      yield [{ springs: springs.substring(0, i + 1), checksum: firstChecksum }, ...otherTokens];
    }
  }
}

const solve = (input: SpringRow[]) => {
  let res = 0;
  for (const { springs, checksums } of input) {
    const solutions = getMatchingPatterns(springs, checksums);
    res += solutions.length;
  }
  return res;
};

export const solvePart1 = solve;

export const solvePart2 = (input: SpringRow[]): number => {
  for (const tokens of tokenize('?#?#?#?#?#?#?#?', [1, 3, 1, 6])) {
    // for (const tokens of tokenize('???.###', [1, 1, 3])) {
    console.log(tokens);
  }
};
