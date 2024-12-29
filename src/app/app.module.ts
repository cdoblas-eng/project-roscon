import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MainPanelComponent} from './mainpanel/main-panel.component';
import {ModalComponent} from "./modal/modal.component";
import {AppRoutingModule} from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { provideCharts, withDefaultRegisterables, NgChartsConfiguration } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({ declarations: [AppComponent, TopBarComponent, MainPanelComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, ReactiveFormsModule, FormsModule, ModalComponent, AppRoutingModule, NgxDatatableModule, BaseChartDirective], providers: [provideHttpClient(withInterceptorsFromDi()), provideCharts(withDefaultRegisterables()), provideAnimationsAsync()] })
export class AppModule {}
