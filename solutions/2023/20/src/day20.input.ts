export type PulseType = 'low' | 'high';
export type BasicModule = {
  connectedTo: string[];
  cache: Record<string, { queue: { src: string; dst: string; pulse: PulseType }[]; state: any }>;
};
export type BroadcasterModule = BasicModule & { type: 'broadcaster' };
export type FlipFlopModule = BasicModule & { type: 'flipflop'; state: 'on' | 'off' };
export type ConjunctionModule = BasicModule & { type: 'conjunction'; rememberedPulses: Record<string, PulseType> };
export type UnknownModule = BasicModule & { type: 'unknown' };

export type Module = BroadcasterModule | FlipFlopModule | ConjunctionModule | UnknownModule;

export default (input: string): Record<'broadcaster' | string, Module> => {
  const lines = input.trim().split('\n');

  const modules: Record<string, Module> = {};
  for (const line of lines) {
    const [moduleStr, neighbourStr] = line.split(' -> ');

    const connectedTo = neighbourStr.split(', ');
    switch (moduleStr.slice(0, 1)) {
      case 'b':
        modules[moduleStr] = {
          type: 'broadcaster',
          cache: {},
          connectedTo,
        };
        break;
      case '%':
        modules[moduleStr.slice(1)] = {
          type: 'flipflop',
          cache: {},
          connectedTo,
          state: 'off',
        };
        break;
      case '&':
        modules[moduleStr.slice(1)] = {
          type: 'conjunction',
          cache: {},
          connectedTo,
          rememberedPulses: {},
        };
        break;
      default:
        throw new Error('Unknown module type');
    }
  }

  return modules;
};
