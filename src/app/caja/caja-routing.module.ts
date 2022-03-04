import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoafiliadoSincomprobantesComponent } from './pages/noafiliado-sincomprobantes/noafiliado-sincomprobantes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'noafiliado-sincomprobantes', component: NoafiliadoSincomprobantesComponent},
      {path: '**', redirectTo: 'noafiliado-sincomprobantes' }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CajaRoutingModule { }
