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

export const solvePart1 = (input: SpringRow[]): number => {
  let res = 0;
  for (const { springs, checksums } of input) {
    const solutions = getMatchingPatterns(springs, checksums);
    res += solutions.length;
  }
  return res;
};

export const solvePart2 = (input: string[]): number => {
  throw new Error('Not implemented');
};
