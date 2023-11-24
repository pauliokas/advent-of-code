export type Material = 'ore' | 'clay' | 'obsidian' | 'geode';
export type Blueprint = Readonly<{
  blueprintId: number;
  recipes: Record<Material, Partial<Record<Material, number>>>;
  limits: Record<Material, number>;
}>;

const sentenceRegex = /Each (\w+) robot costs ((?:(?: and )?\d+ \w+)+)\./g;

export default (input: string): Blueprint[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [name, description] = line.split(': ');
      const matches = description.matchAll(sentenceRegex);

      const recipes = Object.fromEntries(
        [...matches].map(([, material, costs]) => [
          material as Material,
          Object.fromEntries(
            costs
              .split(' and ')
              .map((x) => x.split(' '))
              .map(([amount, resource]) => [resource, -parseInt(amount, 10)]),
          ),
        ]),
      );

      return {
        blueprintId: parseInt(name.slice(name.indexOf(' ') + 1), 10),
        recipes,
        limits: {
          ...Object.keys(recipes).reduce(
            (acc, mat) => ({ ...acc, [mat]: Math.max(...Object.values(recipes).map((r) => -1 * (r[mat] ?? 0))) }),
            {},
          ),
          geode: Infinity,
        },
      } as unknown as Blueprint;
    });
