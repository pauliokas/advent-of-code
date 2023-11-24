import { getDistances } from './graphs';
import type { Graph } from './graphs';

describe('graphs', () => {
  describe('getDistances()', () => {
    it('gets distances to all graph vertices', () => {
      const graph: Graph = {
        A: { B1: 1, B2: 2 },
        B1: { C: 5 },
        B2: { C: 3 },
        C: {},
      };

      expect(getDistances(graph, 'A')).toEqual({ A: 0, B1: 1, B2: 2, C: 5 });
    });
  });
});
