import type { Direction } from './day17.input';

type Shape = '-' | '|' | '+' | '#' | 'J';

const Generator = <T>(elements: T[]): (() => T) => {
  let idx = -1;
  return () => {
    idx = (idx + 1) % elements.length;
    return elements[idx];
  };
};

const shapes: Record<Shape, number[]> = {
  '-': [0b0011110],
  '|': [0b0010000, 0b0010000, 0b0010000, 0b0010000],
  '+': [0b0001000, 0b0011100, 0b0001000],
  J: [0b0011100, 0b0000100, 0b0000100],
  '#': [0b0011000, 0b0011000],
};

/* eslint-disable no-bitwise */

const shift = (number: number, dir: Direction): number => (dir === '<' ? number << 1 : number >> 1);

const buildTower = (jets: Direction[], rounds: number): number[] => {
  const nextShape = Generator(['-', '+', 'J', '|', '#'] as Shape[]);
  const nextJet = Generator(jets);

  const grid: number[] = [];
  const heightIncreases: number[] = [];

  const staysInBounds = (row: number, jet: Direction) =>
    (jet === '<' && !(row & 0b1000000)) || (jet === '>' && !(row & 0b0000001));

  const canBePlaced = (row: number, y: number): boolean => !(row & grid[y]);

  for (let i = 0; i < rounds; i += 1) {
    let shapeY = grid.length + 3;
    let shape = shapes[nextShape()];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const jetStream = nextJet();
      if (shape.every((row, y) => staysInBounds(row, jetStream) && canBePlaced(shift(row, jetStream), shapeY + y))) {
        shape = shape.map((row) => shift(row, jetStream));
      }

      if (shapeY === 0 || shape.some((row, y) => !canBePlaced(row, shapeY + y - 1))) {
        break;
      }

      shapeY -= 1;
    }

    const heightIncreasedBy = shapeY + shape.length - grid.length;
    heightIncreases.push(heightIncreasedBy);
    grid.push(...Array(Math.max(heightIncreasedBy, 0)).fill(0));
    shape.forEach((row, y) => {
      grid[shapeY + y] |= row;
    });
  }

  return heightIncreases;
};

const findRepeatingPattern = (numbers: number[]): { prefix: number; length: number } => {
  for (let prefix = 0; prefix < numbers.length - 5 * 10; prefix += 1) {
    const maxLength = Math.ceil((numbers.length - prefix) / 5);

    /* eslint-disable no-labels */
    lengthLoop: for (let length = 1; length < maxLength; length += 1) {
      for (let c = prefix + length; c < numbers.length; c += 1) {
        if (numbers[c] !== numbers[prefix + ((c - prefix) % length)]) continue lengthLoop;
      }

      return { prefix, length };
    }
    /* eslint-enable no-labels */
  }

  throw new Error('No pattern found');
};

const deduceTowerLength = (jets: Direction[], rounds: number) => {
  const heightChanges = buildTower(jets, Math.min(jets.length * 5, rounds));

  if (heightChanges.length === rounds) {
    return heightChanges.filter((change) => change > 0).reduce((acc, change) => acc + change, 0);
  }

  const { prefix, length } = findRepeatingPattern(heightChanges);

  const prefixSum = heightChanges
    .slice(0, prefix)
    .filter((change) => change > 0)
    .reduce((acc, change) => acc + change, 0);

  const patternSum = heightChanges
    .slice(prefix, prefix + length)
    .filter((change) => change > 0)
    .reduce((acc, change) => acc + change, 0);

  const remainderSum = heightChanges
    .slice(prefix, prefix + ((rounds - prefix) % length))
    .filter((change) => change > 0)
    .reduce((acc, change) => acc + change, 0);

  const patternRepetitions = Math.floor((rounds - prefix) / length);
  return prefixSum + patternSum * patternRepetitions + remainderSum;
};

export const solvePart1 = (jets: Direction[]): number => deduceTowerLength(jets, 2022);

export const solvePart2 = (jets: Direction[]): number => deduceTowerLength(jets, 1000000000000);
