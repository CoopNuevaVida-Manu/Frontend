import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPassComponent } from './pages/cambio-pass/cambio-pass.component';
import { TecnologiaRoutingModule } from './tecnologia-routing.module';
import { MenuModule } from '../menu/menu.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { TablasComponent } from './components/tablas/tablas.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';



@NgModule({
  declarations: [
    CambioPassComponent,
    TablasComponent,
    NewUserComponent,
    EditUserComponent
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
