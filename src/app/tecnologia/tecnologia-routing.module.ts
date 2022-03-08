import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambioPassComponent } from './pages/cambio-pass/cambio-pass.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cambio-password', component: CambioPassComponent},
      {path: '**', redirectTo: 'cambio-password'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class TecnologiaRoutingModule { }
