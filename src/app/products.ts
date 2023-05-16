export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  //string: size;
  //string: fill;
  //string: fill2; default:none
}

export const products = [
  {
    id: 1,
    name: 'Roscón grande nata',
    quantity: 1,
    price: 18,
  },
  {
    id: 2,
    name: 'Roscón pequeño sin',
    quantity: 1,
    price: 14,
  },
  {
    id: 3,
    name: 'Roscón especial',
    quantity: 1,
    price: 20,
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
