export type CommandAddx = { name: 'addx'; value: number };
export type CommandNoop = { name: 'noop' };

export type Command = CommandAddx | CommandNoop;

export default (input: string): Command[] => {
  return input
    .trim()
    .split('\n')
    .map((line) => line.split(' ') as [Command['name'], string])
    .map(([name, value]) => ({ name, value: parseInt(value, 10) }));
};
