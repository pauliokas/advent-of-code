import { solvePart1, solvePart2 } from './day18';
import parseInput from './day18.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2022-18', () => {
  describe('part 1', () => {
    it('simple example', () => {
      expect(solvePart1(parseInput(['1,1,1', '2,1,1'].join('\n')))).toBe(10);
    });

    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(64);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(4348);
    });
  });

  describe('part 2', () => {
    it('simple example', () => {
      expect(solvePart2(parseInput(['1,1,1', '2,1,1'].join('\n')))).toBe(10);
    });

    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(58);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBeGreaterThan(2541);
    });
  });
});
