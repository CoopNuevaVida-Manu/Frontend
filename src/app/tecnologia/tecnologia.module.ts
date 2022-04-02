import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPassComponent } from './pages/cambio-pass/cambio-pass.component';
import { TecnologiaRoutingModule } from './tecnologia-routing.module';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    CambioPassComponent
  ],
  imports: [
    CommonModule,
    TecnologiaRoutingModule,
    MenuModule
  ]
})
export class TecnologiaModule { }
