import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChequesTercerosComponent } from './pages/cheques-terceros/cheques-terceros.component';

const routes : Routes = [
  {
    path: '',
    children: [
      {path: 'cheques-terceros', component: ChequesTercerosComponent},
      {path: '**', redirectTo: 'cheques-terceros'}
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
export class ContabilidadRoutingModule { }
