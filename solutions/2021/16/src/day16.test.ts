import { solvePart1, solvePart2 } from './day16';
import parseInput from './day16.input';
import inputTxt from './input.txt';

describe('2021-16', () => {
  describe('part 1', () => {
    it.each([
      { input: '8A004A801A8002F478', result: 16 },
      { input: '620080001611562C8802118E34', result: 12 },
      { input: 'C0015000016115A2E0802F182340', result: 23 },
      { input: 'A0016C880162017C3686B18A3D4780', result: 31 },
    ])('case $#', ({ input, result }) => {
      expect(solvePart1(parseInput(input))).toBe(result);
    });

    it('exercise', () => {
      expect(solvePart1(parseInput(inputTxt))).toBe(877);
    });
  });

  describe('part 2', () => {
    it.each([
      { input: 'C200B40A82', result: 3 },
      { input: '04005AC33890', result: 54 },
      { input: '880086C3E88112', result: 7 },
      { input: 'CE00C43D881120', result: 9 },
      { input: 'D8005AC2A8F0', result: 1 },
      { input: 'F600BC2D8F', result: 0 },
      { input: '9C005AC2F8F0', result: 0 },
      { input: '9C0141080250320F1802104A08', result: 1 },
    ])('case $#', ({ input, result }) => {
      expect(solvePart2(parseInput(input))).toBe(result);
    });

    it('exercise', () => {
      expect(solvePart2(parseInput(inputTxt))).toBe(194435634456);
    });
  });
});
