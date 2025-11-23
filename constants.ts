import { Equation, Publication } from './types';

export const PUBLICATIONS: Publication[] = [
  {
    title: "Poisson-Schrödinger simulation and analytical modeling of inversion charge in FDSOI MOSFET down to 0K",
    journal: "Solid-State Electronics",
    year: 2021,
    type: "Journal"
  },
  {
    title: "On the modelling of temperature dependence of subthreshold swing in MOSFETs down to cryogenic temperature",
    journal: "Solid-State Electronics",
    year: 2021,
    type: "Journal"
  },
  {
    title: "On the diffusion current in a MOSFET operated down to deep cryogenic temperatures",
    journal: "Solid-State Electronics",
    year: 2021,
    type: "Journal"
  },
  {
    title: "A new physics based compact model for FDSOI transistors down to cryogenic temperatures",
    journal: "19th MOS-AK workshop",
    year: 2021,
    type: "Conference"
  }
];

export const KEY_EQUATIONS: Equation[] = [
  {
    id: "Eq 2.1",
    tex: "N(E) = (g \u00B7 m_{dos}) / (\u03C0 \u00B7 \u210F^2)",
    description: "2D Density of States (DOS) for a quantum well.",
    category: "Electrostatics",
    chapter: 2
  },
  {
    id: "Eq 2.14",
    tex: "\u03C3(E_F, \u0394E) = q \u00B7 A_{2D} \u00B7 \u03BC_0 \u00B7 \u0394E \u00B7 ln(1 + exp(E_F / \u0394E))",
    description: "Conductivity function incorporating exponential band tails.",
    category: "Transport",
    chapter: 2
  },
  {
    id: "Eq 4.3",
    tex: "Q_{g1} = -Q_{inv1} + Q_{cpl}",
    description: "Charge conservation for the front gate coupled with the back interface.",
    category: "Numerical",
    chapter: 4
  },
  {
    id: "Eq 4.18",
    tex: "\u0394V(Q_g) \u2248 Q_g^{2/3}",
    description: "Quantum shift function approximating the energy level shift due to confinement (Airy solution).",
    category: "Numerical",
    chapter: 4
  },
  {
    id: "Eq 5.29",
    tex: "I_{d} = (W/L) \u00B7 \u222B \u03BC_{eff} \u00B7 Q_{inv}(y) \u00B7 (d\u03C6_{im}/dy) dy",
    description: "General Drift-Diffusion drain current integral.",
    category: "Analytical",
    chapter: 5
  }
];