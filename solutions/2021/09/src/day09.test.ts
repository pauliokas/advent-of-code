import { solvePart1, solvePart2 } from './day09';
import parseInput from './day09.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-09', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(15);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(560);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(1134);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(959136);
    });
  });
});
