import {Component} from '@angular/core';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RosconesService} from "../services/roscones.service";
import {NgForOf} from "@angular/common";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-tablaroscones',
  standalone: true,

  imports: [
    NgxDatatableModule,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    CommonModule
  ],
  templateUrl: './tablaroscones.component.html',
  styleUrl: './tablaroscones.component.scss'
})
export class TablarosconesComponent {
  rows: any[] = [];
  temp: any[] = []
  rosconService : RosconesService;
  filterValue : string = "";
  filterColumn : string = "";
  specialFilter: boolean = false;
  noteFilter: boolean = false;
  columns = [
      { name: 'Numero pedido', prop: "num_pedido" },
      { name: 'Cliente', prop: "client" },
      { name: 'Tamaño', prop: "size" },
      { name: 'Relleno', prop: "fill" },
      { name: 'Mitad', prop: "half" },
      { name: 'Cantidad', prop: "quantity" },
      { name: 'Notas', prop: "notes" },
      { name: 'Entregado', prop: "vendido" },
      { name: 'Fecha', prop: "timestamp" }];

  constructor(rosconService: RosconesService) {
    this.rosconService = rosconService;
    rosconService.getAllRoscones().subscribe({
      next: (v) => {
        // console.log(v);
        this.rows = v;
        this.temp = [...v]

        // v.forEach(value => {
        //   row
        // })
        // this.rows = v;
      },
      error: (e) => {
        //mostrar error en la busqueda
        console.error(e)
        //popup error de la peticion
      },
      complete: () => {
        //si esta vacio no encuentra nada
        console.info('complete')
      }
    })
  }

  getAllRoscones(): void{
    this.rosconService.getAllRoscones().subscribe({
      next: (v) => {
        // console.log(v);
        this.rows = v;
        this.temp = [...v];
      },
      error: (e) => {
        //mostrar error en la busqueda
        console.error(e);
        //popup error de la peticion
      },
      complete: () => {
        //si esta vacio no encuentra nada
        console.info('complete');
      }
    })
    this.updateFilter();
  }

  changeSpecialFilter() {
    this.noteFilter = false;
    this.specialFilter = !this.specialFilter;
    if (this.specialFilter) {
      this.getSpecials();
    }else{
      this.getAllRoscones();
    }
  }

  changeNoteFilter() {
    this.noteFilter = !this.noteFilter;
    if (this.noteFilter) {
      this.rows = this.temp.filter(function (d) {
        return d["notes"] != null && d["notes"] != "";
      });
    }else if(this.specialFilter){
      this.getSpecials();
    }else{
      this.getAllRoscones();
    }
  }

  getSpecials(): void{
    this.rosconService.getSpecialsRoscones().subscribe({
      next: (v) => {
        // console.log(v);
        this.rows = v;
        this.temp = [...v];

        // v.forEach(value => {
        //   row
        // })
        // this.rows = v;
      },
      error: (e) => {
        //mostrar error en la busqueda
        console.error(e)
        //popup error de la peticion
      },
      complete: () => {
        //si esta vacio no encuentra nada
        console.info('complete')
      }
    })
    this.updateFilter();
  }

  updateFilter() {
    const filterValue = this.filterValue;
    const filterColumn = this.filterColumn;
    this.rows = this.temp.filter(function (d) {
      const tableValue : string = d[filterColumn] != null ? String(d[filterColumn]) : "";
      return tableValue.indexOf(filterValue) !== -1 || !filterValue;
    });
  }
  isVendido(value: any): boolean {
    if (value === true || value === 1) return true;
    if (value === false || value === 0 || value === null || value === undefined) return false;
    if (typeof value === 'string') {
      const v = value.trim().toLowerCase();
      return v === 'true' || v === '1' || v === 'si' || v === 'sí' || v === 'entregado';
    }
    return Boolean(value);
  }
}
