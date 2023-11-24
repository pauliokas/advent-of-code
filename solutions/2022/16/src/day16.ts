import { generatePaths, getDistances } from '@aoc-utils/graphs';
import type { Tunnels } from './day16.input.js';
import type { Graph } from '@aoc-utils/graphs';

const toFullyConnectedGraph = (tunnels: Tunnels, startNode: string): Graph => {
  const weighedGraph = Object.entries(tunnels).reduce(
    (acc, [node, { neighbours }]) => ({
      ...acc,
      [node]: neighbours.reduce((n, dest) => ({ ...n, [dest]: 1 }), {}),
    }),
    {} as Graph,
  );

  const connectedGraph: Graph = {};

  for (const node of Object.keys(weighedGraph)) {
    if (tunnels[node].flowRate === 0 && node !== startNode) {
      continue;
    }

    const distances = getDistances(weighedGraph, node);
    connectedGraph[node] = Object.entries(distances)
      .filter(([dest]) => tunnels[dest].flowRate > 0)
      .filter(([dest]) => dest !== node)
      .reduce((acc, [dest, distance]) => ({ ...acc, [dest]: distance + 1 }), {});
  }

  return connectedGraph;
};

const removeNodes = (graph: Graph, nodes: string[]): Graph => {
  const newGraph = { ...graph };
  for (const node of nodes) delete newGraph[node];
  for (const remainingNode of Object.keys(newGraph)) {
    newGraph[remainingNode] = { ...graph[remainingNode] };
    for (const node of nodes) delete newGraph[remainingNode][node];
  }
  return newGraph;
};

const calcReleasedPressure = (graph: Graph, tunnels: Tunnels, givenTime: number, path: string[]): number => {
  let pressureReleased = 0;
  let timeLeft = givenTime;

  for (let i = 1; i < path.length; i += 1) {
    const previousNode = path[i - 1];
    const node = path[i];

    timeLeft -= graph[previousNode][node];
    pressureReleased += tunnels[node].flowRate * timeLeft;
  }

  return pressureReleased;
};

export const solvePart1 = (tunnels: Tunnels): number => {
  const givenTime = 30;
  const startNode = 'AA';

  const connectedGraph = toFullyConnectedGraph(tunnels, startNode);

  let maxPressureReleased = 0;
  const allPaths = generatePaths({ graph: connectedGraph, source: startNode, limit: givenTime });
  for (const path of allPaths) {
    const pressureReleased = calcReleasedPressure(connectedGraph, tunnels, givenTime, path);
    if (pressureReleased > maxPressureReleased) maxPressureReleased = pressureReleased;
  }

  return maxPressureReleased;
};

export const solvePart2 = (tunnels: Tunnels): number => {
  const givenTime = 26;
  const startNode = 'AA';

  const connectedGraph = toFullyConnectedGraph(tunnels, startNode);

  let maxPressureReleased = 0;
  const myPaths = generatePaths({
    graph: connectedGraph,
    source: startNode,
    limit: givenTime,
  });
  for (const myPath of myPaths) {
    const myPressureReleased = calcReleasedPressure(connectedGraph, tunnels, givenTime, myPath);
    const elephantPaths = generatePaths({
      graph: removeNodes(connectedGraph, myPath.slice(1)),
      source: startNode,
      limit: givenTime,
    });
    for (const elephantsPath of elephantPaths) {
      const elephantPressureReleased = calcReleasedPressure(connectedGraph, tunnels, givenTime, elephantsPath);
      if (myPressureReleased + elephantPressureReleased > maxPressureReleased) {
        maxPressureReleased = myPressureReleased + elephantPressureReleased;
      }
    }
  }

  return maxPressureReleased;
};
