import { solvePart1, solvePart2 } from './day11';
import parseInput from './day11.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-11', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(1656);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(1755);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(195);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(212);
    });
  });
});
