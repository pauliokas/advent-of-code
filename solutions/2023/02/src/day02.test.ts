import { solvePart1, solvePart2 } from './day02';
import parseInput from './day02.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-02', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(8);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(2317);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(2286);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(74804);
    });
  });
});
