import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {PasswordModule} from 'primeng/password';
import {SplitButtonModule} from 'primeng/splitbutton';

@NgModule({
  exports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    PasswordModule,
    SplitButtonModule
  ]
})
export class PrimeNgModule { }
