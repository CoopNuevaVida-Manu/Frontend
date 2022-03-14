import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ceuntasAfiliado } from 'src/app/interfaces/cuentasAfiliado.interface';

@Component({
  selector: 'app-noafiliado-sincomprobantes',
  templateUrl: './noafiliado-sincomprobantes.component.html',
  styleUrls: ['./noafiliado-sincomprobantes.component.css']
})



export class NoafiliadoSincomprobantesComponent implements OnInit {

  avatarUsuario: string = localStorage.getItem('user') || ""

  nombreUser : string = '';
  apellidoUser : string = '';

  codigoAfiliado: number = 0o5;
  cuentasAfiliado: ceuntasAfiliado[] = []
  cuentaAfectada : number = 0;

  estado: boolean = false;

  disponible: boolean = true;

  caf1: string = '005';
  caf2: string = '';
  caf3: string = ''

  constructor(private router : Router) { 
    this.cuentasAfiliado= [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},]
  }

  identidad: number = 0;
  ngOnInit(): void {
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['./auth'])
  }

}
