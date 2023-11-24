import { solvePart1, solvePart2 } from './day12';
import parseInput from './day12.input';
import input from './input.txt';

const exampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('2022-12', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(31);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(528);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(29);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(522);
    });
  });
});
