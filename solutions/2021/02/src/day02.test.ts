import { solvePart1, solvePart2 } from './day02';
import parseInput from './day02.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-02', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(150);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(1728414);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(900);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(1765720035);
    });
  });
});
