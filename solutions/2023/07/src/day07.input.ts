export type Game = {
  hand: string;
  bid: number;
};

export default (input: string): Game[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [hand, bid] = line.split(' ');
      return { hand, bid: Number(bid) };
    });
