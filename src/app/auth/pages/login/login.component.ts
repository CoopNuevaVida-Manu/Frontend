import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { Usuario } from '../../../interfaces/usuario.interface';
import { AuthService } from '../../service/auth.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent  {

  usuario: string = '';
  password: string = '';

  listaDepartamentos: Departamento[] = [];

  user: Usuario = {
    usuario: '',
    password: ''
  }

  constructor(private router: Router,
              private authService: AuthService,
              private messageService: MessageService) { 
                this.authService.getdepartamentos().subscribe(list =>{ this.listaDepartamentos = list})
              }

  login(){
    this.user.usuario = this.usuario.trim();
    this.user.password = this.password.trim();
    
    this.authService.login(this.user).subscribe(resp => {
      if(resp.login){

        //datos almacenados en el localStorage
        localStorage.setItem('token', resp.id.toString());
        localStorage.setItem('user', this.usuario)
        this.messageService.add({severity:'success', summary: 'Login Exitoso'});
        if(resp.cryp){
          this.router.navigate(['Menu/Menu']);
        }else{
          this.router.navigate(['auth/New-Password']);
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: resp.msg});
      }
    })
  }

}
