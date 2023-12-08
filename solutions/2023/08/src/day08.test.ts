import { solvePart1, solvePart2 } from './day08';
import parseInput from './day08.input';
import inputExample1Txt from './input-example-1.txt';
import inputExample2Txt from './input-example-2.txt';
import inputExample3Txt from './input-example-3.txt';
import inputTxt from './input.txt';

describe('2023-08', () => {
  describe('part 1', () => {
    it('example 1', () => {
      expect(solvePart1(parseInput(inputExample1Txt))).toBe(2);
    });

    it('example 2', () => {
      expect(solvePart1(parseInput(inputExample2Txt))).toBe(6);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(13207);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExample3Txt))).toBe(6);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(12324145107121);
    });
  });
});
