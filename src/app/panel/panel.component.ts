import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Product } from '../products';
import { products } from '../products';
import { Type } from '../products';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  telef: string = '';
  plus: boolean = false;
  symbol: string = 'add';
  prods: Product[] = [];
  total: string = '0,00€';
  main: boolean = false;
  displayStyle: string = 'none';
  displayStyleError: string = 'none';
  specialSize: string = '';
  //type: Type = Type.GR_NATA;
  Type = Type;
  //products = products

  special() {
    this.plus = !this.plus;
    if (this.plus) {
      this.symbol = 'remove';
    } else {
      this.symbol = 'add';
    }
  }

  totals() {
    var tot = 0;
    if (this.prods.length > 0) {
      for (let product of this.prods) {
        tot += product.price * product.quantity;
        console.log(product);
        console.log('Total: ' + tot);
      }
    }
    this.total = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(tot);
  }

  send() {
    // Database connection code
    let conexion: boolean = true;
    if (conexion) {
      this.openPopup();
    } else {
      this.openPopupError();
    }
  }

  addRoscon(tipo: Type) {
    //Check if it is in products
    let found: boolean = false;
    for (let pr of this.prods) {
      if (tipo == pr.type) {
        found = true;
        pr.quantity++;
        break;
      }
    }
    if (!found) {
      const copiedProducts = products.map((product) => ({ ...product }));

      this.prods.push(copiedProducts[Object.values(Type).indexOf(tipo)]);
      //this.prods.push( products[Object.values(Type).indexOf(tipo)]);
    }
    this.totals();
  }
  increaseQuantity(index: number) {
    this.prods[index].quantity++;
    this.totals();
    //console.log(this.prods);
  }

  decreaseQuantity(index: number) {
    this.prods[index].quantity--;
    if (this.prods[index].quantity == 0) this.prods.splice(index, 1);

    this.totals();
    //console.log(this.prods);
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.clear();
  }

  openPopupError() {
    this.displayStyleError = 'block';
  }
  closePopupError() {
    this.displayStyleError = 'none';
  }

  clear() {
    this.telef = '';
    this.plus = false;
    this.symbol = 'add';
    this.prods = [];
    this.total = '0,00€';
    this.main = false;
  }

  newSpecial(form: NgForm) {
    this.specialSize = form.controls['special-size'].value;
  }
}
