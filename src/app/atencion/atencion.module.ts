import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmasAutorizadasComponent } from './pages/firmas-autorizadas/firmas-autorizadas.component';
import { AtencionRoutingModule } from './atencion-routing.module';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    FirmasAutorizadasComponent
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule,
    FormsModule,
    PrimeNgModule,
    MenuModule
  ]
})
export class AtencionModule { }
