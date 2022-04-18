import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPassComponent } from './pages/cambio-pass/cambio-pass.component';
import { TecnologiaRoutingModule } from './tecnologia-routing.module';
import { MenuModule } from '../menu/menu.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CambioPassComponent
  ],
  imports: [
    CommonModule,
    TecnologiaRoutingModule,
    PrimeNgModule,
    FormsModule,
    MenuModule
  ]
})
export class TecnologiaModule { }
