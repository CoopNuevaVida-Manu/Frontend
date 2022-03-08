import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequesTercerosComponent } from './pages/cheques-terceros/cheques-terceros.component';
import { ContabilidadRoutingModule } from './contabilidad-routing.module';



@NgModule({
  declarations: [
    ChequesTercerosComponent
  ],
  imports: [
    CommonModule,
    ContabilidadRoutingModule
  ]
})
export class ContabilidadModule { }
