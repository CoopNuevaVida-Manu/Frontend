import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {PasswordModule} from 'primeng/password';

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
