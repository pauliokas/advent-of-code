export type PacketData = number | PacketData[];

export default (input: string): PacketData[] => {
  return input
    .trim()
    .split('\n\n')
    .flatMap((pairStr) => pairStr.split('\n').map((line) => JSON.parse(line)));
};
