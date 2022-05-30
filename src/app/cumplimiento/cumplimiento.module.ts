import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CumplimientoRoutingModule } from './cumplimiento-routing.module';
import { MenuModule } from '../menu/menu.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { DDNoAfiliadosComponent } from './components/dd-no-afiliados/dd-no-afiliados.component';
import { RTESinComprobanteComponent } from './components/rte-sin-comprobante/rte-sin-comprobante.component';
import { ChequesEmitidosTercerosComponent } from './components/cheques-emitidos-terceros/cheques-emitidos-terceros.component';


@NgModule({
  declarations: [
    HomeComponent,
    DDNoAfiliadosComponent,
    RTESinComprobanteComponent,
    ChequesEmitidosTercerosComponent
  ],
  imports: [
    CommonModule,
    CumplimientoRoutingModule,
    PrimeNgModule,
    FormsModule,
    MenuModule
  ]
})
export class CumplimientoModule { }
