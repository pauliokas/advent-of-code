export type Direction = '<' | '>';

export default (input: string): Direction[] => input.trim().split('') as Direction[];
