import type { Module, PulseType } from './day20.input.js';

const sendPulse = (scheme: Record<'broadcaster' | string, Module>): Record<string, { low: number; high: number }> => {
  const output: string[] = [];
  const queue: { src: string; dst: string; pulse: PulseType }[] = [{ src: 'button', dst: 'broadcaster', pulse: 'low' }];
  const counts: Record<string, { low: number; high: number }> = {};

  while (queue.length) {
    const { src, dst: cur, pulse } = queue.shift()!;
    output.push(`${src} -${pulse}-> ${cur}`);

    counts[cur] = counts[cur] ?? { low: 0, high: 0 };
    counts[cur][pulse] += 1;

    const module = scheme[cur];
    if (!module) continue;

    if (module.type === 'broadcaster') {
      for (let i = 0; i < module.connectedTo.length; i += 1) {
        queue.push({ src: cur, dst: module.connectedTo[i], pulse });
      }
    } else if (module.type === 'flipflop') {
      if (pulse === 'high') continue;

      module.state = module.state === 'off' ? 'on' : 'off';

      const newPulse = module.state === 'on' ? 'high' : 'low';
      for (let i = 0; i < module.connectedTo.length; i += 1) {
        queue.push({ src: cur, dst: module.connectedTo[i], pulse: newPulse });
      }
    } else if (module.type === 'conjunction') {
      module.rememberedPulses[src] = pulse;

      const newPulse = Object.values(module.rememberedPulses).every((p) => p === 'high') ? 'low' : 'high';
      for (let i = 0; i < module.connectedTo.length; i += 1) {
        queue.push({ src: cur, dst: module.connectedTo[i], pulse: newPulse });
      }
    }
  }

  // console.log(output.join('\n'));

  return counts;
};

export const solvePart1 = (input: Record<'broadcaster' | string, Module>): number => {
  for (const [module, { connectedTo }] of Object.entries(input)) {
    for (const neighbour of connectedTo) {
      const neighbourModule = input[neighbour];
      if (neighbourModule?.type === 'conjunction') neighbourModule.rememberedPulses[module] = 'low';
    }
  }

  let lowPulses = 0;
  let highPulses = 0;
  for (let i = 0; i < 1000; i += 1) {
    const results = sendPulse(input);
    Object.values(results).forEach(({ low, high }) => {
      lowPulses += low;
      highPulses += high;
    });
  }

  return lowPulses * highPulses;
};

export const solvePart2 = (input: Record<'broadcaster' | string, Module>): number => {
  const zzz: string[] = [];
  for (const [module, { connectedTo }] of Object.entries(input)) {
    zzz.push(`${module} --> ${connectedTo.join(' & ')}`);
    for (const neighbour of connectedTo) {
      const neighbourModule = input[neighbour];
      if (neighbourModule?.type === 'conjunction') neighbourModule.rememberedPulses[module] = 'low';
    }
  }

  // console.log(zzz.join('\n'));

  let buttonPresses = 0;
  let rxPulses = 0;
  while (rxPulses === 0) {
    buttonPresses += 1;
    const results = sendPulse(input);
    rxPulses = results.rx?.low ?? 0;

    if (buttonPresses % 1_000_000 === 0) process.stdout.write(`button presses: ${buttonPresses}\n`);
    // console.log(results.rx);
  }

  console.log(buttonPresses, rxPulses);

  return buttonPresses;
};

// 1 3 5 9 17 33 65

// 3 2 6 10 18 34 66
