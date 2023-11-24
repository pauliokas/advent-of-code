import { solvePart1, solvePart2 } from './day21';
import parseInput from './day21.input';
import input from './input.txt';

const exampleInput = [
  'root: pppw + sjmn',
  'dbpl: 5',
  'cczh: sllz + lgvd',
  'zczc: 2',
  'ptdq: humn - dvpt',
  'dvpt: 3',
  'lfqf: 4',
  'humn: 5',
  'ljgn: 2',
  'sjmn: drzm * dbpl',
  'sllz: 4',
  'pppw: cczh / lfqf',
  'lgvd: ljgn * ptdq',
  'drzm: hmdt - zczc',
  'hmdt: 32',
].join('\n');

describe('2022-21', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(152);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).toBe(22382838633806);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(301);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(3099532691300);
    });
  });
});
