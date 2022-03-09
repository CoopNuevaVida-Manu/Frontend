import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoafiliadoSincomprobantesComponent } from './pages/noafiliado-sincomprobantes/noafiliado-sincomprobantes.component';
import { CajaRoutingModule } from './caja-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NoafiliadoSincomprobantesComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class CajaModule { }
