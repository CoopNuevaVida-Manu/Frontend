import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmasAutorizadasComponent } from './pages/firmas-autorizadas/firmas-autorizadas.component';
import { AtencionRoutingModule } from './atencion-routing.module';



@NgModule({
  declarations: [
    FirmasAutorizadasComponent
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule
  ]
})
export class AtencionModule { }
