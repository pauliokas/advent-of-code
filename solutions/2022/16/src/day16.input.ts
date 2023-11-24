const coordsRegex =
  /^Valve (?<source>[A-Z]+) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<dest>(?:[A-Z]+(?:, )?)+)$/;

export type Tunnels = Record<string, { flowRate: number; neighbours: string[] }>;

export default (input: string): Tunnels =>
  Object.fromEntries(
    input
      .trim()
      .split('\n')
      .map((line) => coordsRegex.exec(line)!)
      .map(({ groups }) => [
        groups!.source,
        {
          flowRate: parseInt(groups!.flowRate, 10),
          neighbours: groups!.dest.split(', '),
        },
      ]),
  );
