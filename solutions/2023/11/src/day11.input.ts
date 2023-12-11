export type Coords = {
  x: number;
  y: number;
};

export default (input: string): Coords[] => {
  const image = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  const galaxies: Coords[] = [];
  for (let y = 0; y < image.length; y += 1) {
    for (let x = 0; x < image[y].length; x += 1) {
      if (image[y][x] === '#') galaxies.push({ x, y });
    }
  }

  return galaxies;
};
