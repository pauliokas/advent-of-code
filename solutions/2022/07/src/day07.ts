import _ from 'lodash/fp';
import type { Dir, File } from './day07.input.js';

const calcSize = (node: File | Dir, cache: Map<File | Dir, number>): number => {
  if (node.type === 'f') return node.size;

  if (!cache.has(node)) {
    cache.set(
      node,
      node.contents.reduce((acc, child) => acc + calcSize(child, cache), 0),
    );
  }
  return cache.get(node)!;
};

const flatten = (root: Dir): Dir[] => [
  root,
  ...root.contents.filter((child): child is Dir => child.type === 'd').flatMap((child) => flatten(child)),
];

export const solvePart1 = (root: Dir): number => {
  const sizes = new Map<File | Dir, number>();
  flatten(root).forEach((node) => calcSize(node, sizes));
  return _.flow(
    _.map(([, size]) => size),
    _.filter((size) => size <= 100000),
    _.sum,
  )([...sizes.entries()]);
};

const totalSize = 70000000;
const requiredSpace = 30000000;

export const solvePart2 = (root: Dir): number => {
  const sizes = new Map<File | Dir, number>();
  flatten(root).forEach((node) => calcSize(node, sizes));

  const takenSpace = sizes.get(root) || 0;
  const remainingSpace = totalSize - takenSpace;
  const missingSpace = requiredSpace - remainingSpace;

  return _.flow(
    _.filter(([, size]) => size >= missingSpace),
    _.orderBy(([, size]) => size, ['asc']),
    _.map(([, size]: [File | Dir, number]) => size),
    _.head,
  )([...sizes.entries()]);
};
