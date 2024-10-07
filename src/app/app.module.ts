import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MainPanelComponent} from './mainpanel/main-panel.component';
import {ModalComponent} from "./modal/modal.component";
import {AppRoutingModule} from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, FormsModule, ModalComponent, AppRoutingModule, NgxDatatableModule],
  declarations: [AppComponent, TopBarComponent, MainPanelComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
