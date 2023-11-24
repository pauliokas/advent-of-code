export default (input: string): { command: string; change: number }[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [command, change] = line.split(' ');
      return { command, change: parseInt(change, 10) };
    });
