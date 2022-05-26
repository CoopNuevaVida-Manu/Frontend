import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CumplimientoRoutingModule } from './cumplimiento-routing.module';
import { MenuModule } from '../menu/menu.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { DDNoAfiliadosComponent } from './components/dd-no-afiliados/dd-no-afiliados.component';


@NgModule({
  declarations: [
    HomeComponent,
    DDNoAfiliadosComponent
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
