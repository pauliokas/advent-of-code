import { solvePart1, solvePart2 } from './day17';
import parseInput from './day17.input';
import input from './input.txt';

const exampleInput = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>';

describe('2022-17', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(3068);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(3102);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(1514285714288);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(1539823008825);
    });
  });
});
