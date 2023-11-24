import inputConverter from './day12.input';

describe('2021-12 input converter', () => {
  it('correctly parses input', () => {
    const result = inputConverter(['start-A', 'B-start', 'A-end', 'end-B'].join('\n'));

    expect(result).toEqual({
      start: ['A', 'B'],
      A: ['end'],
      B: ['end'],
      end: [],
    });
  });
});
