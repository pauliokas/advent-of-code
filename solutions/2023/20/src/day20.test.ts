import { solvePart1, solvePart2 } from './day20';
import parseInput from './day20.input';
import inputExample1Txt from './input-example-1.txt';
import inputExample2Txt from './input-example-2.txt';
import inputTxt from './input.txt';

describe('2023-20', () => {
  describe('part 1', () => {
    it('example 1', () => {
      expect(solvePart1(parseInput(inputExample1Txt))).toBe(32000000);
    });

    it('example 2', () => {
      expect(solvePart1(parseInput(inputExample2Txt))).toBe(11687500);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(788848550);
    });
  });

  describe('part 2', () => {
    it('example 1', () => {
      expect(solvePart2(parseInput(inputExample1Txt))).toBe(0);
    });

    it('example 2', () => {
      expect(solvePart2(parseInput(inputExample2Txt))).toBe(0);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(0);
    });
  });
});
