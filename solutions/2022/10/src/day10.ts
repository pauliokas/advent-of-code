import type { Command } from './day10.input';

const cycles: Record<Command['name'], number> = {
  noop: 1,
  addx: 2,
};

const runCommands = (commands: Command[], callback: (X: number, cycle: number) => void) => {
  let X = 1;
  let cycle = 1;
  let remainingCommandCycles = cycles[commands[0].name] - 1;
  do {
    let execCommand: Command | undefined;
    if (remainingCommandCycles === 0) {
      execCommand = commands.shift();
      remainingCommandCycles = cycles[commands[0]?.name];
    }

    callback(X, cycle);

    if (execCommand?.name === 'addx') X += execCommand.value;

    cycle += 1;
    remainingCommandCycles -= 1;
  } while (commands.length > 0);
};

export const solvePart1 = (commands: Command[]): number => {
  let sum = 0;

  runCommands(commands, (X, cycle) => {
    if ((cycle - 20) % 40 === 0) {
      sum += X * cycle;
    }
  });

  return sum;
};

export const solvePart2 = (commands: Command[]): string => {
  const outputRows: string[] = [];

  runCommands(commands, (X, cycle) => {
    const printPosition = (cycle - 1) % 40;
    if (printPosition === 0) outputRows.push('');
    outputRows[outputRows.length - 1] += X - 1 <= printPosition && printPosition <= X + 1 ? '#' : '.';
  });

  return outputRows.join('\n');
};
