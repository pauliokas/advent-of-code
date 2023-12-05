export type Range = { start: number; end: number };
export type RangeMap = { src: Range; dst: Range };
export type Almanac = {
  seeds: number[];
  mappings: RangeMap[][];
};

export default (input: string): Almanac => {
  const [seedsStr, ...mapsStr] = input.trim().split('\n\n');

  const seeds = seedsStr.replace('seeds:', '').trim().split(' ').map(Number);

  const mappings: RangeMap[][] = [];

  for (const mapStr of mapsStr) {
    const [, rangeLines] = mapStr.split(':\n');
    const map = rangeLines.split('\n').map((line) => {
      const [dstStart, srcStart, length] = line.split(' ').map(Number);
      return {
        src: { start: srcStart, end: srcStart + length },
        dst: { start: dstStart, end: dstStart + length },
      };
    });

    mappings.push(map);
  }

  return { seeds, mappings };
};
