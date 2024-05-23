export enum Type {
  GR_NATA = 'GRANDE NATA',
  GR_SIN = 'GRANDE SIN RELLENO',
  PEQ_NATA = 'PEQUEÑO NATA',
  PEQ_SIN = 'PEQUEÑO SIN RELLENO',
  ESP = 'ESPECIAL',
}

export enum Size {
  GR = 'GRANDE',
  PEQ = 'PEQUEÑO',
}

export enum Fill {
  NATA = 'NATA',
  MOCA = 'MOCA',
  MERENGUE = 'MERENGUE',
  CREMA = 'CREMA',
  CAFE = 'CAFE',
  EMPTY = 'SIN RELLENO',
}

export interface Especial {
  size: Size;
  fill: Fill;
  half: Fill | null;
}

export interface Product{
  roscontype: Type;
  quantity: number;
  notes: string | null
  especial: Especial | null;
}

export const products = [
  {
    roscontype: Type.GR_NATA,
    quantity: 1,
    notes: null,
    especial: null,
  },
  {
    roscontype: Type.GR_SIN,
    quantity: 1,
    notes: null,
    especial: null,
  },
  {
    roscontype: Type.PEQ_NATA,
    quantity: 1,
    notes: null,
    especial: null,
  },
  {
    roscontype: Type.PEQ_SIN,
    quantity: 1,
    notes: null,
    especial: null,
  },
];
