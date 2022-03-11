import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noafiliado-sincomprobantes',
  templateUrl: './noafiliado-sincomprobantes.component.html',
  styleUrls: ['./noafiliado-sincomprobantes.component.css']
})
export class NoafiliadoSincomprobantesComponent implements OnInit {

  avatarUsuario: string = localStorage.getItem('user') || ""

  nombreUser : string = '';
  apellidoUser : string = '';

  codigoAfiliado: number = 0;
  cuentasAfiliado: number[] = [17044,9654]
  cuentaAfectada : number = 0;

  estado: boolean = false;

  constructor(private router : Router) { 
  }

  identidad: number = 0;
  ngOnInit(): void {
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['./auth'])
  }

}
