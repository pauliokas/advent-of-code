import type { Almanac, Range, RangeMap } from './day05.input.js';

/**
 * return mappings which span the range from 0 to +Inf without gaps
 */
const orderRanges = (mappings: RangeMap[]): RangeMap[] => {
  const sortedMappings = mappings.toSorted(({ src: { start: left } }, { src: { start: right } }) => left - right);

  for (let i = 0; i < sortedMappings.length - 1; i += 1) {
    const curr = sortedMappings[i];
    const next = sortedMappings[i + 1];

    if (curr.src.end !== next.src.start) {
      sortedMappings.splice(i + 1, 0, {
        src: { start: curr.src.end, end: next.src.start },
        dst: { start: curr.src.end, end: next.src.start },
      });
    }
  }

  if (sortedMappings[0].src.start !== 0) {
    sortedMappings.unshift({
      src: { start: 0, end: sortedMappings[0].src.start },
      dst: { start: 0, end: sortedMappings[0].src.start },
    });
  }
  sortedMappings.push({
    src: { start: sortedMappings[sortedMappings.length - 1].src.end, end: +Infinity },
    dst: { start: sortedMappings[sortedMappings.length - 1].src.end, end: +Infinity },
  });

  return sortedMappings;
};

export const remapRange = (range: Range, mappings: RangeMap[]): Range[] => {
  const remappedRanges: Range[] = [];

  let { start } = range;
  const { end } = range;
  for (let i = 0; i < mappings.length; i += 1) {
    const currMapping = mappings[i];

    if (start >= currMapping.src.end) continue;
    if (end <= currMapping.src.start) break;

    const actualEnd = Math.min(end, currMapping.src.end);

    remappedRanges.push({
      start: start - currMapping.src.start + currMapping.dst.start,
      end: actualEnd - currMapping.src.start + currMapping.dst.start,
    });

    start = actualEnd;
  }

  return remappedRanges;
};

const mergeRanges = (ranges: Range[]) => {
  ranges.sort(({ start: left }, { start: right }) => left - right);

  for (let i = 0; i < ranges.length - 1; ) {
    const curr = ranges[i];
    const next = ranges[i + 1];

    if (curr.end === next.start) {
      ranges.splice(i, 2, { start: curr.start, end: next.end });
    } else {
      i += 1;
    }
  }
};

const findSmallestLandValue = (seedRanges: Range[], initialMappings: RangeMap[][]) => {
  const mappings = initialMappings.map(orderRanges);

  let values = seedRanges;
  for (const mapping of mappings) {
    values = values.flatMap((range) => remapRange(range, mapping));
    mergeRanges(values);
  }

  return values[0].start;
};

export const solvePart1 = ({ seeds, mappings }: Almanac): number => {
  return findSmallestLandValue(
    seeds.map((seed) => ({ start: seed, end: seed + 1 })),
    mappings,
  );
};

export const solvePart2 = ({ seeds, mappings }: Almanac): number => {
  const seedRanges: Range[] = [];
  for (let i = 0; i < seeds.length - 1; i += 2) {
    const start = seeds[i];
    const length = seeds[i + 1];
    seedRanges.push({ start, end: start + length });
  }

  return findSmallestLandValue(seedRanges, mappings);
};
