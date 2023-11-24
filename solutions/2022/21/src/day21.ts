import type { NumericShout, OperationShout, OperationType, Shout } from './day21.input';

type Node = OperationNode | NumericNode;

type OperationNode = {
  type: 'operation';
  name: string;
  op: OperationType;
  left: Node;
  right: Node;
};

type NumericNode = {
  type: 'number';
  name: string;
  num: number;
};

const asTree = (
  monkeys: Record<string, NumericShout | OperationShout>,
): { root: OperationNode; humn: NumericNode } & Record<string, Node> => {
  const nodes = Object.entries(monkeys).reduce(
    (acc, [name, shout]) => ({ ...acc, [name]: { type: shout.type, name } }),
    {} as Record<string, { type: Node['type'] }>,
  );

  Object.entries(monkeys)
    .filter(([, shout]) => shout.type === 'number')
    .forEach(([name, shout]) => {
      (nodes[name] as NumericNode).num = (shout as NumericShout).num;
    });

  Object.entries(monkeys)
    .filter(([, shout]) => shout.type === 'operation')
    .forEach(([name, shout]) => {
      const node = nodes[name] as OperationNode;
      const opShout = shout as OperationShout;
      node.op = opShout.op;
      node.left = nodes[opShout.arg1] as Node;
      node.right = nodes[opShout.arg2] as Node;
    });

  return nodes as any;
};

const operations: Record<OperationType, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const evaluate = (node: Node): number => {
  if (node.type === 'number') {
    return node.num;
  }

  const left = evaluate(node.left);
  const right = evaluate(node.right);

  return operations[node.op](left, right);
};

const findNode = (node: Node, name: string): Node | undefined => {
  if (node.name === name) return node;
  if (node.type === 'number') return undefined;
  return findNode(node.left, name) || findNode(node.right, name);
};

const evaluateWithGuess = (root: Node, humn: NumericNode, guess: number): number => {
  // eslint-disable-next-line no-param-reassign
  humn.num = guess;
  return evaluate(root);
};

export const solvePart1 = (monkeys: Record<string, Shout>): number => {
  const { root } = asTree(monkeys);
  return evaluate(root);
};

export const solvePart2 = (monkeys: Record<string, Shout>): number => {
  const {
    root: { left, right },
    humn,
  } = asTree(monkeys);

  const changingNode = [left, right].find((node) => findNode(node, 'humn')) as OperationNode;
  const stableNode = [left, right].find((node) => node !== changingNode) as OperationNode;

  const target = evaluate(stableNode);

  // y = k * x + b
  // we need to find x when y = target
  // when x = 0, y = b
  // k = (x - b) / y
  // x = (y - b) / k

  const randomX = Math.round(Math.random() * 1000000000);
  const valueAtRandomX = evaluateWithGuess(changingNode, humn, randomX);

  const freeTerm = evaluateWithGuess(changingNode, humn, 0);
  const multiplier = (valueAtRandomX - freeTerm) / randomX;

  const approximateGuess = Math.round((target - freeTerm) / multiplier);

  for (let i = 1; i <= 100; i += 1) {
    const delta = ((i % 2) * 2 - 1) * Math.floor(i / 2); // 1->0, 2->-1, 3->1, 4->-2, 5->2, ...
    const guess = approximateGuess + delta;
    if (evaluateWithGuess(changingNode, humn, guess) === target) return guess;
  }

  return Infinity;
};
