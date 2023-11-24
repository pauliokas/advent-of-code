import { solvePart1, solvePart2 } from './day02';
import parseInput from './day02.input';
import input from './input.txt';
import type { Pair } from './day02.input';

const exampleInput: Pair[] = [
  ['A', 'Y'],
  ['B', 'X'],
  ['C', 'Z'],
];

describe('2022-02', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(15);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(11603);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(12);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(12725);
    });
  });
});
