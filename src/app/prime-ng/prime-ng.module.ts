import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {PasswordModule} from 'primeng/password';
import {SplitButtonModule} from 'primeng/splitbutton';

@NgModule({
  exports: [
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    PasswordModule,
    SplitButtonModule
  ]
})
export class PrimeNgModule { }
