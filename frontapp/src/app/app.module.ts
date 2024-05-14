import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './producto/listar/listar/listar.component';
import { HttpClientModule } from '@angular/common/http';
import { GuardarProductoComponent } from './producto/guardar/guardar-producto/guardar-producto.component';
import { FormsModule } from '@angular/forms';
import { EditarProductoComponent } from './producto/editar/editar-producto/editar-producto.component';
import { IndexIndexComponent } from './index/index-index/index-index.component';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    GuardarProductoComponent,
    EditarProductoComponent,
    IndexIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    ScrollPanelModule,
    CalendarModule,
    BrowserAnimationsModule,
    TableModule,
    SplitButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule 
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
