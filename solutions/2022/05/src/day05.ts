import type { Move } from './day05.input.js';

type MoveFunction = (stack: string[][]) => string[][];

const move = ({ count, from, to, allAtOnce }: Move & { allAtOnce: boolean }): MoveFunction => {
  return (stacks) => {
    const boxes = stacks[from].slice(-count);
    if (!allAtOnce) {
      boxes.reverse();
    }

    const changedStacks = [...stacks];
    changedStacks[from] = stacks[from].slice(0, -count);
    changedStacks[to] = stacks[to].concat(boxes);

    return changedStacks;
  };
};

const applyMoves = (initialStacks: string[][], moves: MoveFunction[]): string[][] => {
  return moves.reduce((stacks, applyMove) => applyMove(stacks), initialStacks);
};

export const solvePart1 = ({ moves, stacks }: { moves: Move[]; stacks: string[][] }): string => {
  const moveFns = moves.map(({ count, from, to }) => move({ count, from, to, allAtOnce: false }));
  const changedStacks = applyMoves(stacks, moveFns);
  return changedStacks.map((stack) => stack[stack.length - 1]).join('');
};

export const solvePart2 = ({ moves, stacks }: { moves: Move[]; stacks: string[][] }): string => {
  const moveFns = moves.map(({ count, from, to }) => move({ count, from, to, allAtOnce: true }));
  const changedStacks = applyMoves(stacks, moveFns);
  return changedStacks.map((stack) => stack[stack.length - 1]).join('');
};
