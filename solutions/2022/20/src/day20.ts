type Elem = {
  num: number;
  prev: Elem;
  next: Elem;
};

const getNth = (start: Elem, n: number): Elem => {
  const direction = n >= 0 ? 'next' : 'prev';
  let cur = start;
  for (let i = 0; i < Math.abs(n); i += 1) {
    cur = cur[direction];
  }
  return cur;
};

const mix = (encrypted: number[], times: number): number => {
  const elements = encrypted
    .map((num): Partial<Elem> => ({ num }))
    .map((elem, idx, arr): Elem => {
      /* eslint-disable no-param-reassign */
      elem.prev = arr[(idx + arr.length - 1) % arr.length] as Elem;
      elem.next = arr[(idx + 1) % arr.length] as Elem;
      /* eslint-enable no-param-reassign */
      return elem as Elem;
    });

  for (let i = 0; i < times; i += 1) {
    for (const current of elements) {
      if (current.num === 0) continue;

      const nextKey = current.num > 0 ? 'next' : 'prev';
      const prevKey = current.num > 0 ? 'prev' : 'next';

      const after = getNth(current, current.num % (elements.length - 1));

      current.prev.next = current.next;
      current.next.prev = current.prev;

      current[prevKey] = after;
      current[nextKey] = after[nextKey];

      after[nextKey][prevKey] = current;
      after[nextKey] = current;
    }
  }

  const zero = elements[encrypted.indexOf(0)];
  return [1000, 2000, 3000]
    .map((idx) => getNth(zero, idx % elements.length))
    .map(({ num }) => num)
    .reduce((acc, b) => acc + b, 0);
};

export const solvePart1 = (encrypted: number[]): number => mix(encrypted, 1);

export const solvePart2 = (encrypted: number[]): number =>
  mix(
    encrypted.map((n) => n * 811589153),
    10,
  );
