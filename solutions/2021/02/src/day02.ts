export const solvePart1 = (input: { command: string; change: number }[]): number => {
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < input.length; i += 1) {
    const { command, change } = input[i];
    switch (command) {
      case 'forward':
        horizontal += change;
        break;
      case 'down':
        depth += change;
        break;
      case 'up':
        depth -= change;
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }

  return depth * horizontal;
};

export const solvePart2 = (input: { command: string; change: number }[]): number => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < input.length; i += 1) {
    const { command, change } = input[i];
    switch (command) {
      case 'forward':
        horizontal += change;
        depth += aim * change;
        break;
      case 'down':
        aim += change;
        break;
      case 'up':
        aim -= change;
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }

  return depth * horizontal;
};
