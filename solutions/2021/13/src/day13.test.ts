import { solvePart1, solvePart2 } from './day13';
import parseInput from './day13.input';
import inputExampleTxt from './input-example.txt';
import inputTxt from './input.txt';

describe('2021-13', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1(parseInput(inputExampleTxt))).toBe(17);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(765);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2(parseInput(inputExampleTxt))).toBe(
        [
          // comment to disable prettier
          '||||||||||',
          '||      ||',
          '||      ||',
          '||      ||',
          '||||||||||',
        ].join('\n'),
      );
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(
        [
          '||||||    ||||||||  ||    ||  ||||||||  ||        ||||||      ||||    ||    ||',
          '||    ||        ||  ||  ||          ||  ||        ||    ||  ||    ||  ||    ||',
          '||    ||      ||    ||||          ||    ||        ||    ||  ||        ||||||||',
          '||||||      ||      ||  ||      ||      ||        ||||||    ||  ||||  ||    ||',
          '||  ||    ||        ||  ||    ||        ||        ||        ||    ||  ||    ||',
          '||    ||  ||||||||  ||    ||  ||||||||  ||||||||  ||          ||||||  ||    ||',
        ].join('\n'),
      );
    });
  });
});
