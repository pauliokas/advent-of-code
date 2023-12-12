export type SpringRow = {
  springs: string;
  checksums: number[];
};

export default (input: string): SpringRow[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [springs, checksumsStr] = line.split(' ');
      const checksums = checksumsStr.split(',').map(Number);
      return { springs, checksums };
    });
