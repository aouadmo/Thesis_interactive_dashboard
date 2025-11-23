export enum ViewState {
  OVERVIEW = 'OVERVIEW',
  PHYSICS = 'PHYSICS',
  MODEL = 'MODEL',
  VALIDATION = 'VALIDATION',
  EQUATIONS = 'EQUATIONS',
  IMPACT = 'IMPACT'
}

export interface Equation {
  id: string;
  tex: string;
  description: string;
  category: 'Electrostatics' | 'Transport' | 'Numerical' | 'Analytical';
  chapter: number;
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  type: 'Journal' | 'Conference';
  link?: string;
}

export interface ChartPoint {
  x: number;
  y1: number;
  y2?: number;
  y3?: number;
  [key: string]: number | undefined;
}