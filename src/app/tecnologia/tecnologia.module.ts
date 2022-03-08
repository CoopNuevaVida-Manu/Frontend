import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPassComponent } from './pages/cambio-pass/cambio-pass.component';
import { TecnologiaRoutingModule } from './tecnologia-routing.module';



@NgModule({
  declarations: [
    CambioPassComponent
  ],
  imports: [
    CommonModule,
    TecnologiaRoutingModule
  ]
})
export class TecnologiaModule { }
