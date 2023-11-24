import { solvePart1, solvePart2 } from './day20';
import parseInput from './day20.input';
import input from './input.txt';

const exampleInput = [1, 2, -3, 3, -2, 0, 4];

describe('2022-20', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(exampleInput)).toBe(3);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(4151);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(exampleInput)).toBe(1623178306);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(7848878698663);
    }, 20000);
  });
});
