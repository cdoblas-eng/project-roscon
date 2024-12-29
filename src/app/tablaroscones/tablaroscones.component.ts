import {Component} from '@angular/core';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RosconesService} from "../services/roscones.service";
import {NgForOf} from "@angular/common";
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
    MatSlideToggleModule
  ],
  templateUrl: './tablaroscones.component.html',
  styleUrl: './tablaroscones.component.scss'
})
export class TablarosconesComponent {
  rows: any[] = [];
  temp: any[] = []
  rosconService:RosconesService;
  filterValue : string = "";
  filterColumn : string = "";
  specialFilter: boolean = false;
  columns = [
      { name: 'Cliente', prop: "client" },
      { name: 'Tamaño', prop: "size" },
      { name: 'Relleno', prop: "fill" },
      { name: 'Mitad', prop: "half" },
      { name: 'Cantidad', prop: "quantity" },
      { name: 'Notas', prop: "notes" },
      { name: 'Vendido', prop: "vendido" },
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

        // v.forEach(value => {
        //   row
        // })
        // this.rows = v;
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
    this.specialFilter = !this.specialFilter;
    if (this.specialFilter) {
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
      const tableValue : string = d[filterColumn] != null ? d[filterColumn].toLowerCase() : "";
      return tableValue.indexOf(filterValue) !== -1 || !filterValue;
    });
  }
}
