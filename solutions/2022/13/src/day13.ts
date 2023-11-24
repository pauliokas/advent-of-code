import type { PacketData } from './day13.input';

const compareNumbers = (left: number, right: number): number => left - right;

const compareArrays = (left: PacketData[], right: PacketData[]): number => {
  const minIdx = Math.min(left.length, right.length);
  for (let i = 0; i < minIdx; i += 1) {
    const result = compare(left[i], right[i]);
    if (result !== 0) {
      return result;
    }
  }

  return compareNumbers(left.length, right.length);
};

const compare = (left: PacketData, right: PacketData): number => {
  if (typeof left === 'number' && typeof right === 'number') {
    return compareNumbers(left, right);
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return compareArrays(left, right);
  }

  return compare(Array.isArray(left) ? left : [left], Array.isArray(right) ? right : [right]);
};

export const solvePart1 = (transmissions: PacketData[]): number => {
  let idxSum = 0;
  for (let i = 0; i < transmissions.length; i += 2) {
    const comparisonResult = compare(transmissions[i], transmissions[i + 1]);
    if (comparisonResult < 0) {
      idxSum += i / 2 + 1;
    }
  }
  return idxSum;
};

export const solvePart2 = (transmissions: PacketData[]): number => {
  const sortedTransmissions = [...transmissions, [[2]], [[6]]].sort(compare);

  const marker1Idx = sortedTransmissions.findIndex((transmission) => compare(transmission, [[2]]) === 0)!;
  const marker2Idx = sortedTransmissions.findIndex((transmission) => compare(transmission, [[6]]) === 0)!;

  return (marker1Idx + 1) * (marker2Idx + 1);
};
