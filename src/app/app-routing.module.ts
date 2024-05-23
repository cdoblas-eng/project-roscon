import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPanelComponent} from "./mainpanel/main-panel.component";
import {TablarosconesComponent} from "./tablaroscones/tablaroscones.component";
import {EstadisticasComponent} from "./estadisticas/estadisticas.component";

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainPanelComponent },
    { path: 'table', component: TablarosconesComponent },
    { path: 'stadistics', component: EstadisticasComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
