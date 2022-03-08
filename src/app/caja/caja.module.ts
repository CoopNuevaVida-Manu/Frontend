import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoafiliadoSincomprobantesComponent } from './pages/noafiliado-sincomprobantes/noafiliado-sincomprobantes.component';
import { CajaRoutingModule } from './caja-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    NoafiliadoSincomprobantesComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule,
    PrimeNgModule
  ]
})
export class CajaModule { }
