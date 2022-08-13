import spacingFigma from './constants/spacing';
import { getPropertyName } from './utils';

const getSpace = (val: keyof typeof spacingFigma) => spacingFigma[val].value;

export const spaces = {
  get: getSpace,
} as const;

const spacing: Spacing = {
  // use get to specific space
  get: getSpace,
  // Or reference other properties easily
  sm: Number(spaces.get('1')),
  md: Number(spaces.get('2')),
};

export type Spacing = {
  get: typeof spaces.get;
  sm: number;
  md: number;
};

export default spacing;
