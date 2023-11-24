import { solvePart1, solvePart2 } from './day22';
import parseInput from './day22.input';
import input from './input.txt';

const exampleInput = [
  '        ...#',
  '        .#..',
  '        #...',
  '        ....',
  '...#.......#',
  '........#...',
  '..#....#....',
  '..........#.',
  '        ...#....',
  '        .....#..',
  '        .#......',
  '        ......#.',
  '',
  '10R5L5R10L4R5L5',
].join('\n');

describe('2022-22', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(6032);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(159034);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(-1);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(-1);
    });
  });
});
