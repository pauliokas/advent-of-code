export type Coords = { x: number; y: number };

export default (input: string): { start: Coords; end: Coords }[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [start, end] = line.split(' -> ');
      const [startX, startY] = start.split(',');
      const [endX, endY] = end.split(',');
      return {
        start: { x: parseInt(startX, 10), y: parseInt(startY, 10) },
        end: { x: parseInt(endX, 10), y: parseInt(endY, 10) },
      };
    });
