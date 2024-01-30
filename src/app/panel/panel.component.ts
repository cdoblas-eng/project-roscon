import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Product } from '../products';
import { products } from '../products';
import { Type } from '../products';
import { Fill } from '../products';
import { Size } from '../products';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {

  constructor(private http: HttpClient) {

  }

  cliente: string = '';
  plus: boolean = false;
  symbol: string = 'add';
  prods: Product[] = [];
  total: string = '0,00€';
  main: boolean = false;
  displayStyle: string = 'none';
  displayStyleError: string = 'none';
  Type = Type;
  //Valores de enumerados
  fillValues = Object.values(Fill);
  sizeValues = Object.values(Size);
  //Atributos de roscon especial
  specialSize: Size = Size.GR;
  especialIns: Fill = Fill.MERENGUE;
  especialIns2: Fill | null = null;

  half() {
    this.plus = !this.plus;
    if (this.plus) {
      this.especialIns2 = Fill.CREMA;
      this.symbol = 'remove';
    } else {
      this.symbol = 'add';
      this.especialIns2 = null;
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

  addRoscon(tipo: Type) {
    let found: boolean = false;
    //Si el roscon no es especial
    if (tipo != Type.ESP) {
      for (let pr of this.prods) {
        if (tipo == pr.roscontype) {
          found = true;
          pr.quantity++;
          break;
        }
      }
      if (!found) {
        const copiedProducts = products.map((product) => ({ ...product }));
        this.prods.push(copiedProducts[Object.values(Type).indexOf(tipo)]);
      }
    } else {
      //En caso de que sea especial
      let esp_default: Product = {
        roscontype: Type.ESP,
        quantity: 1,
        notes: null,
        price: 24,
        especial: {
          size: this.specialSize,
          fill: this.especialIns,
          half: this.especialIns2,
        },
      };
      this.prods.push(esp_default);

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
    this.cliente = '';
    this.plus = false;
    this.symbol = 'add';
    this.prods = [];
    this.total = '0,00€';
    this.main = false;
  }

  newSpecial(form: NgForm) {
    this.specialSize = form.controls['special-size'].value;
  }


  send() {
    const apiUrl = 'http://localhost:3000/receive'

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Generar el JSON con el campo "cliente" y el array de elementos
    const body = {
      cliente: this.cliente,
      roscones: this.prods
    };

    this.http.post(apiUrl, body, { headers }).subscribe(
        value => {
          console.log("Peticion realizada")
          this.openPopup()
        }

    );
  }
}
