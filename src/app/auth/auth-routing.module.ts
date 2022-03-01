import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';


const routes : Routes = [
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'New-Password', component: NewPasswordComponent},
      {path: '**', redirectTo: 'login'}
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
