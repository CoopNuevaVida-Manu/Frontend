import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequesTercerosComponent } from './pages/cheques-terceros/cheques-terceros.component';
import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    ChequesTercerosComponent
  ],
  imports: [
    CommonModule,
    ContabilidadRoutingModule,
    PrimeNgModule
  ]
})
export class ContabilidadModule { }
