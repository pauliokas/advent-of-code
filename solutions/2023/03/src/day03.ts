import type { Coords, Part, PartNumber } from './day03.input.js';

const neighbourOffsets = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
] as const;

const getNeighbours = (center: Coords): Coords[] =>
  neighbourOffsets.map(({ x, y }) => ({ x: center.x + x, y: center.y + y }));

const pair = ({ x, y }: Coords): number => (x << 8) | y;

const solve =
  ({
    partFilter,
    processPartNumbers,
  }: {
    partFilter: (part: Part['part']) => boolean;
    processPartNumbers: (part: PartNumber[]) => number;
  }) =>
  (input: (Part | PartNumber)[]): number => {
    const coordsHash = new Map<number, Part | PartNumber>();

    for (const obj of input) {
      if (obj.type === 'part') {
        coordsHash.set(pair(obj.coords), obj);
        continue;
      }

      for (let { x } = obj.coordsStart; x <= obj.coordsEnd.x; x += 1) {
        coordsHash.set(pair({ x, y: obj.coordsStart.y }), obj);
      }
    }

    let partSum = 0;

    for (const obj of input) {
      if (obj.type !== 'part' || !partFilter(obj.part)) continue;

      const nearbyPartNumbers = getNeighbours(obj.coords)
        .filter((coords) => coordsHash.get(pair(coords))?.type === 'number')
        .map((coords) => coordsHash.get(pair(coords)) as PartNumber)
        .filter((partNumber, idx, array) => array.indexOf(partNumber) === idx);

      partSum += processPartNumbers(nearbyPartNumbers);
    }

    return partSum;
  };

export const solvePart1 = solve({
  partFilter: () => true,
  processPartNumbers: (partNumbers) => partNumbers.reduce((sum, { number }) => sum + number, 0),
});

export const solvePart2 = solve({
  partFilter: (part) => part === '*',
  processPartNumbers: (partNumbers) => {
    if (partNumbers.length !== 2) return 0;
    return partNumbers.reduce((product, { number }) => product * number, 1);
  },
});
