import { solvePart1, solvePart2 } from './day23';
import parseInput from './day23.input';
import input from './input.txt';

const exampleInput = [].join('\n');

describe('2022-23', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(-1);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(-1);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(-1);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(-1);
    });
  });
});
