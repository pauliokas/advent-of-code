export type RucksackItem = string & { length: 1 };
export type RucksackContents = RucksackItem[];

export default (input: string): RucksackContents[] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('') as RucksackContents);
