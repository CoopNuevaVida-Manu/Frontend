import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class AuthModule { }
