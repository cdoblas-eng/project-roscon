export enum Type {
  GR_NATA = 'ROSCON GRANDE NATA',
  GR_SIN = 'ROSCON GRANDE SIN RELLENO',
  PEQ_NATA = 'ROSCON PEQUEÑO NATA',
  PEQ_SIN = 'ROSCON PEQUEÑO SIN RELLENO',
  ESP = 'ROSCON ESPECIAL',
}

export enum Size {
  GR = 'GRANDE',
  PEQ = 'PEQUEÑO',
}

export enum Fill {
  NATA,
  MOCA,
  MERENGUE,
  CREMA,
  CAFE,
  EMPTY,
}

export interface Especial {
  size: Size;
  fill: Fill;
  half: Fill | null;
}

export interface Product {
  type: Type;
  quantity: number;
  price: number;
  especial: Especial | null;
}

export const products = [
  {
    type: Type.GR_NATA,
    quantity: 1,
    price: 18,
    especial: null,
  },
  {
    type: Type.GR_SIN,
    quantity: 1,
    price: 16,
    especial: null,
  },
  {
    type: Type.PEQ_NATA,
    quantity: 1,
    price: 14,
    especial: null,
  },
  {
    type: Type.PEQ_SIN,
    quantity: 1,
    price: 12,
    especial: null,
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
