import { solvePart1, solvePart2 } from './day10';
import parseInput from './day10.input';
import input from './input.txt';
import type { Command } from './day10.input';

const exampleInput: Command[] = [
  { name: 'addx', value: 15 },
  { name: 'addx', value: -11 },
  { name: 'addx', value: 6 },
  { name: 'addx', value: -3 },
  { name: 'addx', value: 5 },
  { name: 'addx', value: -1 },
  { name: 'addx', value: -8 },
  { name: 'addx', value: 13 },
  { name: 'addx', value: 4 },
  { name: 'noop' },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 5 },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 5 },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 5 },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 5 },
  { name: 'addx', value: -1 },
  { name: 'addx', value: -35 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 24 },
  { name: 'addx', value: -19 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 16 },
  { name: 'addx', value: -11 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 21 },
  { name: 'addx', value: -15 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: -3 },
  { name: 'addx', value: 9 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: -3 },
  { name: 'addx', value: 8 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 5 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: -36 },
  { name: 'noop' },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 7 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 2 },
  { name: 'addx', value: 6 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 7 },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'addx', value: -13 },
  { name: 'addx', value: 13 },
  { name: 'addx', value: 7 },
  { name: 'noop' },
  { name: 'addx', value: 1 },
  { name: 'addx', value: -33 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 2 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 8 },
  { name: 'noop' },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 2 },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'addx', value: 17 },
  { name: 'addx', value: -9 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: -3 },
  { name: 'addx', value: 11 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: -13 },
  { name: 'addx', value: -19 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 3 },
  { name: 'addx', value: 26 },
  { name: 'addx', value: -30 },
  { name: 'addx', value: 12 },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 3 },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: -9 },
  { name: 'addx', value: 18 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 2 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 9 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: -1 },
  { name: 'addx', value: 2 },
  { name: 'addx', value: -37 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 3 },
  { name: 'noop' },
  { name: 'addx', value: 15 },
  { name: 'addx', value: -21 },
  { name: 'addx', value: 22 },
  { name: 'addx', value: -6 },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'addx', value: 2 },
  { name: 'addx', value: 1 },
  { name: 'noop' },
  { name: 'addx', value: -10 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'addx', value: 20 },
  { name: 'addx', value: 1 },
  { name: 'addx', value: 2 },
  { name: 'addx', value: 2 },
  { name: 'addx', value: -6 },
  { name: 'addx', value: -11 },
  { name: 'noop' },
  { name: 'noop' },
  { name: 'noop' },
];

describe('2022-10', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(solvePart1([...exampleInput])).toBe(13140);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(12640);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      expect(solvePart2([...exampleInput])).toBe(
        [
          '##..##..##..##..##..##..##..##..##..##..',
          '###...###...###...###...###...###...###.',
          '####....####....####....####....####....',
          '#####.....#####.....#####.....#####.....',
          '######......######......######......####',
          '#######.......#######.......#######.....',
        ].join('\n'),
      );
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(
        [
          '####.#..#.###..####.#....###....##.###..',
          '#....#..#.#..#....#.#....#..#....#.#..#.',
          '###..####.###....#..#....#..#....#.#..#.',
          '#....#..#.#..#..#...#....###.....#.###..',
          '#....#..#.#..#.#....#....#.#..#..#.#.#..',
          '####.#..#.###..####.####.#..#..##..#..#.',
        ].join('\n'),
      );
    });
  });
});