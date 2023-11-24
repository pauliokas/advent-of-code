export type Vertex = 'start' | 'end' | string;
export type Graph = Record<Vertex, Vertex[]>;

export default (input: string): Graph =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('-'))
    .reduce(
      (map, [src, dst]) =>
        Object.assign(map, {
          [src]: (map[src] || []).concat(src !== 'end' && dst !== 'start' ? [dst] : []),
          [dst]: (map[dst] || []).concat(src !== 'start' && dst !== 'end' ? [src] : []),
        }),
      {} as Record<Vertex, Vertex[]>,
    );
