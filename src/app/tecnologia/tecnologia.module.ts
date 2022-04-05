import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPassComponent } from './pages/cambio-pass/cambio-pass.component';
import { TecnologiaRoutingModule } from './tecnologia-routing.module';
import { MenuModule } from '../menu/menu.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    CambioPassComponent
  ],
  imports: [
    CommonModule,
    TecnologiaRoutingModule,
    PrimeNgModule,
    MenuModule
  ]
})
export class TecnologiaModule { }
