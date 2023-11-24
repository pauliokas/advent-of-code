import _ from 'lodash/fp';
import type { RucksackContents, RucksackItem } from './day03.input';

const alphabet = Array.from(Array(26)).map((letter, idx) => String.fromCharCode(idx + 65));
const priorities = alphabet.reduce(
  (acc, curr, idx, arr) =>
    Object.assign(acc, {
      [curr]: idx + 1 + arr.length,
      [curr.toLowerCase()]: idx + 1,
    }),
  {} as Record<RucksackItem, number>,
);

export const solvePart1 = (input: RucksackContents[]): number =>
  _.flow(
    _.map((contents: RucksackContents) => [
      contents.slice(0, contents.length / 2),
      contents.slice(contents.length / 2),
    ]),
    _.flatMap(_.spread(_.intersection)),
    _.map((item: RucksackItem) => priorities[item]),
    _.sum,
  )(input);

export const solvePart2 = (input: RucksackContents[]): number =>
  _.flow(
    _.chunk(3),
    _.flatMap(
      ([first, ...rest]): RucksackItem[] =>
        _.reduce((acc, curr) => _.intersection(acc as any, curr as any) as any, first, rest) as any,
    ),
    _.map((item) => priorities[item]),
    _.sum,
  )(input);
