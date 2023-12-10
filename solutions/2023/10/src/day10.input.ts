export type Direction = 'north' | 'east' | 'south' | 'west';

const OppositeDirection: Record<Direction, Direction> = {
  north: 'south',
  east: 'west',
  south: 'north',
  west: 'east',
} as const;

const directionToDeltas: Record<Direction, Coords> = {
  north: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  south: { x: 0, y: 1 },
  west: { x: -1, y: 0 },
};

export type Coords = { x: number; y: number };

const tunnelSymbols = ['|', '-', 'L', 'J', '7', 'F'] as const;
export type TunnelSymbol = (typeof tunnelSymbols)[number];

export type Node = {
  symbol: TunnelSymbol | null;
  joined: Direction[];
};

const tunnelSymbolsToDirections: Record<TunnelSymbol, [Direction, Direction]> = {
  '|': ['north', 'south'],
  '-': ['east', 'west'],
  L: ['north', 'east'],
  J: ['north', 'west'],
  '7': ['south', 'west'],
  F: ['south', 'east'],
};

export const getNode = (grid: Node[][], { x, y }: Coords): Node | undefined => (grid[y] ?? [])[x];

export const getJoinedCoords = (grid: Node[][], { x, y }: Coords, direction: Direction): Coords => {
  const { x: dx, y: dy } = directionToDeltas[direction];
  return { x: x + dx, y: y + dy };
};

export default (input: string): { grid: Node[][]; start: Coords } => {
  const rawMap = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  let start: Coords | undefined;

  const grid: Node[][] = [];

  for (let y = 0; y < rawMap.length; y += 1) {
    const gridLine = [];
    for (let x = 0; x < rawMap[y].length; x += 1) {
      if (rawMap[y][x] === 'S') start = { x, y };

      const symbol = tunnelSymbols.includes(rawMap[y][x] as TunnelSymbol) ? (rawMap[y][x] as TunnelSymbol) : null;
      gridLine.push({ symbol, joined: symbol ? tunnelSymbolsToDirections[symbol] : [] });
    }
    grid.push(gridLine);
  }

  const startJoinedWith: Direction[] = [];
  for (const direction of ['north', 'east', 'south', 'west'] as Direction[]) {
    const neighbourCoords = getJoinedCoords(grid, start!, direction);
    if ((getNode(grid, neighbourCoords)?.joined ?? []).includes(OppositeDirection[direction])) {
      startJoinedWith.push(direction);
    }
  }

  grid[start!.y][start!.x].joined = startJoinedWith;

  for (const [symbol, directions] of Object.entries(tunnelSymbolsToDirections)) {
    if (directions.reduce((acc, direction) => acc && startJoinedWith.includes(direction), true)) {
      grid[start!.y][start!.x].symbol = symbol as TunnelSymbol;
      break;
    }
  }

  return { grid, start: start! };
};
