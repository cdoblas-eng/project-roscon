import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Product } from '../products';

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
      this.total = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(tot);
    }
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

  addNataBig() {
    //Check if it is in products
    let p: Product = {
      id: 1,
      name: 'Roscón grande nata',
      quantity: 1,
      price: 18,
    };
    this.prods.push(p);
    this.totals();
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
