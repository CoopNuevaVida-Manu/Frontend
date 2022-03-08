import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  
  {
    path: 'atencion-cliente',
    loadChildren: () => import('./atencion/atencion.module').then( m => m.AtencionModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'caja',
    loadChildren: () => import('./caja/caja.module').then( m => m.CajaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'contabilidad',
    loadChildren: () => import('./contabilidad/contabilidad.module').then( m => m.ContabilidadModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'cumplimiento',
    loadChildren: () => import('./cumplimiento/cumplimiento.module').then( m => m.CumplimientoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'TI',
    loadChildren: () => import('./tecnologia/tecnologia.module').then( m => m.TecnologiaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
