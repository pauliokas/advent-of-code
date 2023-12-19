type Coords = {
  x: number;
  y: number;
};

const pair = (a: number, b: number): number => ((a + b) * (a + b + 1)) / 2 + b;

const getNeighbours = ({ x, y }: Coords) =>
  [
    { dx: -1, dy: 0 },
    { dx: +1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: +1 },
  ].map(({ dx, dy }) => ({ x: x + dx, y: y + dy }));

const isThreeConsecutive = (path: Coords[], { x, y }: Coords) => {
  if (path.length < 3) return false;

  let sameX = true;
  let sameY = true;
  for (let i = path.length - 1; i >= path.length - 3; i -= 1) {
    sameX &&= path[i].x === x;
    sameY &&= path[i].y === y;
  }

  return sameX || sameY;
};

function* findPath(
  grid: number[][],
  start: Coords,
  end: Coords,
  path: Coords[],
  visited: Set<number> = new Set<number>(),
): Generator<Coords[]> {
  if (start.x === end.x && start.y === end.y) {
    yield [...path, start];
    return;
  }

  if (path.length > 2 * (grid.length + grid[0].length)) {
    return;
  }

  visited.add(pair(start.x, start.y));

  const neighbours = getNeighbours(start)
    .filter(({ x, y }) => grid[y]?.[x] !== undefined)
    .filter(({ x, y }) => !visited.has(pair(x, y)))
    .filter((n) => !isThreeConsecutive(path, n));

  for (const neighbour of neighbours) {
    for (const resolvedPath of findPath(grid, neighbour, end, [...path, start], new Set(visited))) {
      yield resolvedPath;
    }
  }
}

const isThreeConsecutive2 = (zzz: (Coords | undefined)[][], previous: Coords, current: Coords) => {
  const diff = { dx: current.x - previous.x, dy: current.y - previous.y };

  let node: Coords | undefined = previous;
  let count = 3;
  while (node !== undefined && count > 0) {
    const next: Coords | undefined = zzz[node.y]?.[node.x];
    if (!next || node.x - next.x !== diff.dx || node.y - next.y !== diff.dy) return false;
    count -= 1;
    node = next;
  }

  return count === 0;
};

type Dir = 'top' | 'right' | 'bottom' | 'left';

const dijkstra = (grid: number[][], start: Coords, end: Coords): Coords[] => {
  // const visited = grid.map((line) => line.map(() => false));
  // const distances = grid.map((line) => line.map(() => Infinity));
  // const previous: (Coords | undefined)[][] = grid.map((line) => line.map(() => undefined));
  //
  // const queue = [start];
  // distances[start.y][start.x] = grid[start.y][start.x];
  //
  // for (const i in this.vertices) {
  //   if (this.vertices[i].name === start) {
  //     this.vertices[i].weight = 0;
  //   } else {
  //     this.vertices[i].weight = Number.MAX_VALUE;
  //   }
  //   nodes[this.vertices[i].name] = this.vertices[i].weight;
  // }
  //
  // while (queue.length > 0) {
  //   const current = queue.shift()!;
  //   // if (current === undefined) break;
  //   //
  //   // if (current.x === end.x && current.y === end.y) {
  //   //   const path: Coords[] = [];
  //   //   let node: Coords | undefined = current;
  //   //   while (node !== undefined) {
  //   //     path.unshift(node);
  //   //     node = previous[node.y][node.x];
  //   //   }
  //   //   return path;
  //   // }
  //
  //   visited[current.y][current.x] = true;
  //
  //   const n1 = getNeighbours(current);
  //   const n2 = n1.filter(({ x, y }) => grid[y]?.[x] !== undefined);
  //   // const n3 = n2.filter(({ x, y }) => !visited[y][x]);
  //   const n4 = n2.filter((n) => !isThreeConsecutive2(previous, current, n));
  //   const neighbours = n4;
  //
  //   for (const neighbour of neighbours) {
  //     const alt = distances[current.y][current.x] + grid[neighbour.y][neighbour.x];
  //     if (alt < distances[neighbour.y][neighbour.x]) {
  //       distances[neighbour.y][neighbour.x] = alt;
  //       previous[neighbour.y][neighbour.x] = current;
  //       queue.push(neighbour);
  //     }
  //   }
  // }
  // const path: Coords[] = [];
  // let node: Coords | undefined = end;
  // while (node !== undefined) {
  //   path.unshift(node);
  //   node = previous[node.y][node.x];
  // }
  // return path;

  const dist: Record<Dir, number>[][] = grid.map((line) =>
    line.map(() => ({ top: Infinity, right: Infinity, bottom: Infinity, left: Infinity })),
  );
  const prev: Record<Dir, Coords | undefined>[][] = grid.map((line) =>
    line.map(() => ({ top: undefined, right: undefined, bottom: undefined, left: undefined })),
  );
  dist[start.y][start.x] = {
    top: grid[start.y][start.x],
    right: grid[start.y][start.x],
    bottom: grid[start.y][start.x],
    left: grid[start.y][start.x],
  };
  const queue: { dir: Dir; coords: Coords }[] = grid.flatMap((line, y) =>
    line.flatMap((cost, x) => (['top', 'right', 'bottom', 'left'] as Dir[]).map((dir) => ({ dir, coords: { x, y } }))),
  );

  while (queue.length) {
    const u = queue.reduce((a, b) =>
      dist[a.coords.y][a.coords.x][a.dir] < dist[b.coords.y][b.coords.x][b.dir] ? a : b,
    );
    queue.splice(queue.indexOf(u), 1);

    const neighbours: { from: Dir; coords: Coords }[] = [
      { from: 'top' as Dir, coords: { x: u.coords.x, y: u.coords.y + 1 } },
      { from: 'right' as Dir, coords: { x: u.coords.x - 1, y: u.coords.y } },
      { from: 'bottom' as Dir, coords: { x: u.coords.x, y: u.coords.y - 1 } },
      { from: 'left' as Dir, coords: { x: u.coords.x + 1, y: u.coords.y } },
    ].filter(({ coords }) => grid[coords.y]?.[coords.x] !== undefined);
    // const neighbours = n2.filter((n) => !isThreeConsecutive2(prev, u, n));

    for (const { from, coords } of neighbours) {
      const alt = dist[u.coords.y][u.coords.x][from] + grid[coords.y][coords.x];
      if (alt < dist[coords.y][coords.x][from]) {
        dist[coords.y][coords.x][from] = alt;
        prev[coords.y][coords.x][from] = u.coords;
      }
    }
  }

  const path: Coords[] = [];
  // let node: Coords | undefined = end;
  // while (node !== undefined) {
  //   path.unshift(node);
  //   node = prev[node.y][node.x];
  // }
  return path;
};

const print = (grid: number[][], path: Coords[]) => {
  const gridCopy = grid.map((line) => line.map((n) => `${n}`));
  for (const { x, y } of path) {
    gridCopy[y][x] = '#';
  }
  console.log(gridCopy.map((line) => line.join('')).join('\n'));
};

export const solvePart1 = (input: number[][]): number => {
  // let shortestPath = Infinity;
  // for (const path of findPath(input, { x: 0, y: 0 }, { x: input[0].length - 1, y: input.length - 1 }, [
  //   { x: 0, y: 0 },
  // ])) {
  //   const cost = path.reduce((acc, { x, y }) => acc + input[y][x], 0);
  //   shortestPath = Math.min(shortestPath, cost);
  // }
  //
  // return shortestPath;

  const path = dijkstra(input, { x: 0, y: 0 }, { x: input[0].length - 1, y: input.length - 1 });
  console.log(path);
  print(input, path);
  const cost = path.reduce((acc, { x, y }) => acc + input[y][x], 0);
  return cost;

  // const grid = [
  //   [9, 9, 9, 9, 9, 9],
  //   [1, 9, 9, 9, 9, 9],
  // ];
  // const path = dijkstra(grid, { x: 0, y: 0 }, { x: 5, y: 0 });
  //
  // console.log(path);
  // print(grid, path);
};

export const solvePart2 = (input: number[][]): number => {
  throw new Error('Not implemented');
};
