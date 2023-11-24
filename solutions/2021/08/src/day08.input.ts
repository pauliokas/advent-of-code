export default (input: string): { signals: string[]; outputs: string[] }[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [signals, outputs] = line.split(' | ');
      return {
        signals: signals.split(' '),
        outputs: outputs.split(' '),
      };
    });
