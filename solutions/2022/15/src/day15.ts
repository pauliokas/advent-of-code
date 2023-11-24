import { excludeRange, mergeRanges, sortRanges } from '@aoc-utils/ranges';
import type { Coords } from './day15.input.js';
import type { Range } from '@aoc-utils/ranges';

const getCoverageInRow = (
  scanResults: { sensor: Coords; radius: number }[],
  y: number,
  coordLimits?: Range,
): Range[] => {
  let coveredRanges: Range[] = [];

  for (const { sensor, radius } of scanResults) {
    const remainingRange = radius - Math.abs(y - sensor.y);
    if (remainingRange <= 0) continue;
    coveredRanges.push([sensor.x - remainingRange, sensor.x + remainingRange]);
  }

  coveredRanges = mergeRanges(sortRanges(coveredRanges));

  if (coordLimits?.length) {
    coveredRanges = excludeRange(coveredRanges, [-Infinity, coordLimits[0] - 1]);
    coveredRanges = excludeRange(coveredRanges, [coordLimits[1] + 1, Infinity]);
  }

  return coveredRanges;
};

export const solvePart1 = (scanResults: { sensor: Coords; beacon: Coords; radius: number }[], y: number): number => {
  let coveredRanges = getCoverageInRow(scanResults, y);

  for (const { sensor, beacon } of scanResults) {
    if (sensor.y === y) coveredRanges = excludeRange(coveredRanges, [sensor.x, sensor.x]);
    if (beacon.y === y) coveredRanges = excludeRange(coveredRanges, [beacon.x, beacon.x]);
  }

  return coveredRanges.reduce((acc, [a, b]) => acc + b - a + 1, 0);
};

export const solvePart2 = (scanResults: { sensor: Coords; radius: number }[], coordLimits: Range): number => {
  for (let y = 0; y <= coordLimits[1]; y += 1) {
    const coveredRanges = getCoverageInRow(scanResults, y, coordLimits);

    if (coveredRanges.length > 1) {
      return 4000000 * (coveredRanges[0][1] + 1) + y;
    }
  }

  return -1;
};
