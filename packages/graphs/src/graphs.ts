export type Graph = Record<string, Record<string, number>>;

export function* generatePaths({
  graph,
  source,
  limit,
}: {
  graph: Graph;
  source: string;
  limit?: number;
}): Generator<string[]> {
  const queue = [{ path: [source], cost: 0 }];
  while (queue.length) {
    const { path, cost } = queue.shift()!;

    const lastNode = path[path.length - 1];

    yield path;

    for (const neighbour of Object.keys(graph[lastNode])) {
      const newCost = cost + graph[lastNode][neighbour];
      if (limit !== undefined && newCost > limit) continue;
      if (!path.includes(neighbour)) queue.push({ path: [...path, neighbour], cost: newCost });
    }
  }
}

export const getDistances = (graph: Graph, source: string): Record<string, number> => {
  const dist: Record<string, number> = {};
  const prev: Record<string, string> = {};
  const queue = Object.keys(graph);
  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
  }
  dist[source] = 0;

  while (queue.length) {
    const u = queue.reduce((a, b) => (dist[a] < dist[b] ? a : b));
    queue.splice(queue.indexOf(u), 1);

    for (const neighbour of Object.keys(graph[u])) {
      const alt = dist[u] + graph[u][neighbour];
      if (alt < dist[neighbour]) {
        dist[neighbour] = alt;
        prev[neighbour] = u;
      }
    }
  }

  return dist;
};
