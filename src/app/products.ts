
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
  EMPTY = 'SIN',
}

export interface Roscon {
  size: Size;
  fill: Fill;
  half: Fill | null;
  notes: string | null
  quantity: number;
}

export function newRoscon (size: Size, fill: Fill){
  let getSize: Size = Size.GR;
  let getFill: Fill = Fill.NATA;

  if (size != Size.GR)
    getSize = Size.PEQ

  if(fill != Fill.NATA)
    getFill = Fill.EMPTY

  let roscon: Roscon = {
    size: getSize,
    fill: getFill,
    half: null,
    notes: null,
    quantity: 1
  }

  return roscon;
}
