import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combobox } from 'src/app/interfaces/combobox.interface';

import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import { CajaService } from '../../services/caja.service';
import { transaccion } from 'src/app/interfaces/transaccion.interface';

@Component({
  selector: 'app-noafiliado-sincomprobantes',
  templateUrl: './noafiliado-sincomprobantes.component.html',
  styleUrls: ['./noafiliado-sincomprobantes.component.css']
})



export class NoafiliadoSincomprobantesComponent implements OnInit {

  avatarUsuario: string = localStorage.getItem('user') || ""

  nombreUser : string = '';
  apellidoUser : string = '';

  cuentasAfiliado: combobox[] = []
  cuentaAfectada !: string


  disponible: boolean = true;

  caf1: string = '005'; //005 obligatorio
  caf2: string = '';    //999
  caf3: string = '';    //999999999 
  codigoAfiliado : string = `${this.caf1}-${this.caf2}-${this.caf3}`

  
  cbxTransacciones: combobox[] = [];
  selectTransaccion !: string;

  cbxorigenFondos : combobox[] = [];
  selectOrigenFondo!: string;
  
  cbxRazonOperacio: combobox[] = [];
  selectRazonFondo!: string;
  

  nombreAfiliadoC: string = '';
  monto!: number 

  
  

  constructor(private router : Router,
              private cajaService :CajaService)  { 
    this.cajaService.gettransacciones().subscribe(resp =>{
      resp.forEach(element => {
        this.cbxTransacciones.push({code: `${element.id_transaccion}` , name: `${element.transaccion}` })
      });
    });

    this.cajaService.getOrigenFondos().subscribe( resp => {
      resp.forEach(element => {
        this.cbxorigenFondos.push({code: `${element.id_origen_fondos}` , name: `${element.origen_fondos}` })
      });
    });

    this.cajaService.getRazonOperacion().subscribe( resp => {
      resp.forEach(element => {
        this.cbxRazonOperacio.push({code: `${element.id_razon_operacion}` , name: `${element.razon_operacion}` })
      });
    })
    
    this.cuentasAfiliado= [
      {name: '1414147', code: 'NY'},
      {name: 'Rome', code: 'RM'},]
  }

  identidad: number = 0;
  ngOnInit(): void {}
  

  logOut(){
    localStorage.clear();
    this.router.navigate(['./auth'])
  }

  prueba(){
    console.log(this.cuentaAfectada)
  }

}
