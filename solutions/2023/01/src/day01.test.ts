import { solvePart1, solvePart2 } from './day01';
import parseInput from './day01.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2023-01', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(142);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(55017);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(142);
    });

    it('example 2', () => {
      expect(
        solvePart2(
          parseInput(
            [
              'two1nine',
              'eightwothree',
              'abcone2threexyz',
              'xtwone3four',
              '4nineeightseven2',
              'zoneight234',
              '7pqrstsixteen',
            ].join('\n'),
          ),
        ),
      ).toBe(281);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(53539);
    });
  });
});
