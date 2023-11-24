import { solvePart1, solvePart2 } from './day03';
import parseInput from './day03.input';
import input from './input.txt';
import type { RucksackContents } from './day03.input';

const exampleInput = [
  'vJrwpWtwJgWrhcsFMMfFFhFp'.split(''),
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'.split(''),
  'PmmdzqPrVvPwwTWBwg'.split(''),
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn'.split(''),
  'ttgJtRGJQctTZtZT'.split(''),
  'CrZsJsPPZsGzwwsLwLmpwMDw'.split(''),
] as RucksackContents[];

describe('2022-03', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(157);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(7742);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(70);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(2276);
    });
  });
});
