export interface Move {
  count: number;
  from: number;
  to: number;
}

const parseStacks = (input: string) => {
  const lines = input.split('\n');
  const count = (lines[0].length + 1) / 4;

  const stacks: string[][] = new Array(count).fill([]).map(() => []);

  lines.forEach((line) => {
    for (let i = 0; i < count; i += 1) {
      const box = line.substring(i * 4 + 1, i * 4 + 2).trim();
      if (box) {
        stacks[i].unshift(box);
      }
    }
  });

  return stacks;
};

const parseMoves = (input: string): Move[] => {
  const moveRegex = /move (\d+) from (\d+) to (\d+)/;
  return input
    .trim()
    .split('\n')
    .map((line) => moveRegex.exec(line)!.slice(1, 4).map(Number))
    .map(([count, from, to]) => ({ count, from: from - 1, to: to - 1 }));
};

export default (input: string): { moves: Move[]; stacks: string[][] } => {
  const [stackInput, movesInput] = input.split(/\n[ \d]+\n\n/);

  const stacks = parseStacks(stackInput);

  const moves = parseMoves(movesInput);

  return { moves, stacks };
};
