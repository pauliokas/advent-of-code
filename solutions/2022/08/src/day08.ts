const movements = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const isEdge = ({ x, y }: { x: number; y: number }, trees: number[][]) =>
  x === 0 || x === trees[0].length - 1 || y === 0 || y === trees.length - 1;

const applyMovement =
  (movement: { x: number; y: number }) =>
  ({ x, y }: { x: number; y: number }): { x: number; y: number } => ({ x: x + movement.x, y: y + movement.y });

const isVisible = ({ x, y }: { x: number; y: number }, trees: number[][]): boolean => {
  if (isEdge({ x, y }, trees)) return true;

  const treeHeight = trees[y][x];

  for (let i = 0; i < movements.length; i += 1) {
    const nextCoords = applyMovement(movements[i]);

    let newCoords = { x, y };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      newCoords = nextCoords(newCoords);
      if (trees[newCoords.y][newCoords.x] >= treeHeight) break;
      if (isEdge(newCoords, trees)) return true;
    }
  }

  return false;
};

const getScenicScore = ({ x, y }: { x: number; y: number }, trees: number[][]): number => {
  if (isEdge({ x, y }, trees)) return 0;

  const treeHeight = trees[y][x];

  let visibilityDistance = 1;
  for (let i = 0; i < movements.length; i += 1) {
    const getNextCoords = applyMovement(movements[i]);

    let visibilityDistanceForDirection = 0;
    let nextCoords = { x, y };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      nextCoords = getNextCoords(nextCoords);
      visibilityDistanceForDirection += 1;
      if (isEdge(nextCoords, trees)) break;
      if (trees[nextCoords.y][nextCoords.x] >= treeHeight) break;
    }

    visibilityDistance *= visibilityDistanceForDirection;
  }

  return visibilityDistance;
};

export const solvePart1 = (trees: number[][]): number => {
  const width = trees[0].length;
  const height = trees.length;

  let visibleTrees = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (isVisible({ x, y }, trees)) visibleTrees += 1;
    }
  }

  return visibleTrees;
};

export const solvePart2 = (trees: number[][]): number => {
  const width = trees[0].length;
  const height = trees.length;

  let maxScore = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const scenicScore = getScenicScore({ x, y }, trees);
      if (scenicScore > maxScore) maxScore = scenicScore;
    }
  }

  return maxScore;
};
