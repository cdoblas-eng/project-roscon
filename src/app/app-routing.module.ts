// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Panel2Component} from "./panel2/panel2.component";
import {TablarosconesComponent} from "./tablaroscones/tablaroscones.component";
import {EstadisticasComponent} from "./estadisticas/estadisticas.component";
// import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: Panel2Component },
    { path: 'table', component: TablarosconesComponent },
    { path: 'stadistics', component: EstadisticasComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
