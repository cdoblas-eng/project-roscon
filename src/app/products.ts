export enum Type {
  GR_NATA = 'GRANDE NATA',
  GR_SIN = 'GRANDE SIN RELLENO',
  PEQ_NATA = 'PEQUEÑO NATA',
  PEQ_SIN = 'PEQUEÑO SIN RELLENO',
  ESP = 'ESPECIAL',
}

export enum Size {
  GR = 'GRANDE',
  MED = 'MEDIANO',
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
  type: Type;
  quantity: number;
  price: number;
  // notes: string | null
  especial: Especial | null;
}

export const products = [
  {
    type: Type.GR_NATA,
    quantity: 1,
    price: 18,
    // notes: null,
    especial: null,
  },
  {
    type: Type.GR_SIN,
    quantity: 1,
    price: 16,
    // notes: null,
    especial: null,
  },
  {
    type: Type.PEQ_NATA,
    quantity: 1,
    price: 14,
    // notes: null,
    especial: null,
  },
  {
    type: Type.PEQ_SIN,
    quantity: 1,
    price: 12,
    // notes: null,
    especial: null,
  },
];

export function getSheetTable(rosconType: Type): string {
  switch (rosconType) {
    case Type.GR_NATA:
      return 'grande-nata';
    case Type.GR_SIN:
      return 'grande-sin';
    case Type.PEQ_NATA:
      return 'pequeno-nata';
    case Type.PEQ_SIN:
      return 'pequeno-sin';
    default:
      return 'especiales';
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
