import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoafiliadoSincomprobantesComponent } from './pages/noafiliado-sincomprobantes/noafiliado-sincomprobantes.component';
import { CajaRoutingModule } from './caja-routing.module';



@NgModule({
  declarations: [
    NoafiliadoSincomprobantesComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule
  ]
})
export class CajaModule { }
