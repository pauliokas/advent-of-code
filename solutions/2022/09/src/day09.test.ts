import { solvePart1, solvePart2 } from './day09';
import parseInput from './day09.input';
import input from './input.txt';
import type { HeadMovement } from './day09.input';

const exampleInput: HeadMovement[] = [
  { direction: 'R', count: 4 },
  { direction: 'U', count: 4 },
  { direction: 'L', count: 3 },
  { direction: 'D', count: 1 },
  { direction: 'R', count: 4 },
  { direction: 'D', count: 1 },
  { direction: 'L', count: 5 },
  { direction: 'R', count: 2 },
];

const largerExampleInput: HeadMovement[] = [
  { direction: 'R', count: 5 },
  { direction: 'U', count: 8 },
  { direction: 'L', count: 8 },
  { direction: 'D', count: 3 },
  { direction: 'R', count: 17 },
  { direction: 'D', count: 10 },
  { direction: 'L', count: 25 },
  { direction: 'U', count: 20 },
];

describe('2022-09', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(13);
    });

    it('larger example', () => {
      expect(solvePart1(largerExampleInput)).toBe(88);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(6376);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(1);
    });

    it('larger example', () => {
      expect(solvePart2(largerExampleInput)).toBe(36);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(2607);
    });
  });
});
