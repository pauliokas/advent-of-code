import _ from 'lodash/fp';
import type { AssignmentPair, TaskRange } from './day04.input';

const overlaps = (range1: TaskRange, range2: TaskRange): boolean => range2[0] >= range1[0] && range2[1] <= range1[1];

const intersects = (range1: TaskRange, range2: TaskRange): boolean => range1[1] >= range2[0] && range2[1] >= range1[0];

export const solvePart1 = (input: AssignmentPair[]): number =>
  _.flow(
    _.filter(([first, second]) => overlaps(first, second) || overlaps(second, first)),
    _.size,
  )(input);

export const solvePart2 = (input: any): number =>
  _.flow(
    _.filter(([first, second]) => intersects(first, second)),
    _.size,
  )(input);
