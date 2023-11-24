import type { Graph, Vertex } from './day12.input';

const getAllPaths = (map: Graph, isVisited: (path: Vertex[], node: Vertex) => boolean): Vertex[] => {
  const paths: Vertex[] = [];

  const stack = [['start']];

  while (stack.length) {
    const path = stack.pop()!;
    const node = path[path.length - 1];

    const neighbours: Vertex[] = map[node].filter((v: Vertex[]) => !isVisited(path, v));
    stack.push(...neighbours.map((neighbour) => [...path, neighbour]));

    if (node === 'end') {
      paths.push(path);
    }
  }

  return paths;
};

const initialize =
  (isVisited: (path: Vertex[], node: Vertex) => boolean) =>
  (map: Graph): number => {
    const paths = getAllPaths(map, isVisited);
    return paths.length;
  };

const isVisited = (path: Vertex[], node: Vertex, { allowedTwice }: { allowedTwice: boolean }) => {
  if (!path.includes(node)) {
    return false;
  }

  if (node === node.toUpperCase()) {
    return false;
  }

  if (!allowedTwice) {
    return true;
  }

  const counts: Record<Vertex, number> = path.reduce((obj, v) => Object.assign(obj, { [v]: (obj[v] || 0) + 1 }), {});
  const [nodeVisitedTwice] =
    Object.entries(counts)
      .filter(([visitedNode]) => visitedNode === visitedNode.toLowerCase())
      .find(([, count]) => count > 1) || [];

  return !!nodeVisitedTwice;
};

export const solvePart1 = initialize((path, node) => isVisited(path, node, { allowedTwice: false }));

export const solvePart2 = initialize((path, node) => isVisited(path, node, { allowedTwice: true }));
