import { solvePart1, solvePart2 } from './day06';
import parseInput from './day06.input';
import input from './input.txt';

const examples = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', part1Result: 7, part2Result: 19 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', part1Result: 5, part2Result: 23 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', part1Result: 6, part2Result: 23 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', part1Result: 10, part2Result: 29 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', part1Result: 11, part2Result: 26 },
];

describe('2022-06', () => {
  describe('part 1', () => {
    it.each(examples)('example $#', ({ input: testInput, part1Result }) => {
      expect(solvePart1(testInput)).toBe(part1Result);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(1282);
    });
  });

  describe('part 2', () => {
    it.each(examples)('example %#', ({ input: testInput, part2Result }) => {
      expect(solvePart2(testInput)).toBe(part2Result);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(3513);
    });
  });
});
