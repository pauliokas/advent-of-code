import { solvePart1, solvePart2 } from './day10';
import parseInput from './day10.input';
import inputExample1Txt from './input-example-1.txt';
import inputExample2Txt from './input-example-2.txt';
import inputExample3Txt from './input-example-3.txt';
import inputExample4Txt from './input-example-4.txt';
import inputExample5Txt from './input-example-5.txt';
import inputTxt from './input.txt';

describe('2023-10', () => {
  describe('part 1', () => {
    it('example 1', () => {
      expect(solvePart1(parseInput(inputExample1Txt))).toBe(4);
    });

    it('example 2', () => {
      expect(solvePart1(parseInput(inputExample2Txt))).toBe(8);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(6907);
    });
  });

  describe('part 2', () => {
    it('example 3', () => {
      expect(solvePart2(parseInput(inputExample3Txt))).toBe(4);
    });

    it('example 4', () => {
      expect(solvePart2(parseInput(inputExample4Txt))).toBe(8);
    });

    it('example 5', () => {
      expect(solvePart2(parseInput(inputExample5Txt))).toBe(10);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(541);
    });
  });
});
