import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {PasswordModule} from 'primeng/password';
import {SplitButtonModule} from 'primeng/splitbutton';

@NgModule({
  exports: [
    ButtonModule,
    InputMaskModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    PasswordModule,
    SplitButtonModule
  ]
})
export class PrimeNgModule { }
