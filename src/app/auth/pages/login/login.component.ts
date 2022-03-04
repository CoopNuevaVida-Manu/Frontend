import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  usuario: string = '';
  password: string = '';

  user: Usuario = {
    usuario: '',
    password: ''
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  login(){
    this.user.usuario = this.usuario;
    this.user.password = this.password;

    console.log(this.user)
  
    
    // this.router.navigate(['auth/New-Password'])
  }

}
