import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirmasAutorizadasComponent } from './pages/firmas-autorizadas/firmas-autorizadas.component';


const routes : Routes = [
  {
    path: '',
    children: [
      {path: 'firmas-autorizadas', component: FirmasAutorizadasComponent},
      {path: '**', redirectTo: 'firmas-autorizadas'}
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AtencionRoutingModule { }
