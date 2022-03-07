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
    this.user.usuario = this.usuario;
    this.user.password = this.password;
    console.log(this.listaDepartamentos)
    
    this.authService.login(this.user).subscribe(resp => {
      console.log(resp)
      console.log(resp.login)
      if(resp.login){
        localStorage.setItem('token', resp.id.toString());
        localStorage.setItem('dep', resp.dep.toString());
        this.messageService.add({severity:'success', summary: 'Login Exitoso'});
        if(resp.cryp){
          this.listaDepartamentos.forEach(element => {
            if(element.departamento == "Caja" && element.id_departamento == resp.id){

            }else if(element.departamento == "Contabilidad" && element.id_departamento == resp.id){

            }else if(element.departamento =="Atención al Afiliado" && element.id_departamento == resp.id){

            }else if(element.departamento == "Informática" && element.id_departamento == resp.id){
              console.log('Informatica')
            }
          });
        }else{
          this.router.navigate(['auth/New-Password'])
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: resp.msg});
      }
    })
  }

}
