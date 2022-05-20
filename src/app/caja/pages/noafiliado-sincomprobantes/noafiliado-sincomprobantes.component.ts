import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { CajaService } from '../../services/caja.service';
import {MessageService} from 'primeng/api';
import { diligenciaNoAfiliado } from '../../../interfaces/Diligencia_No_Afiliado.interface';

@Component({
  selector: 'app-noafiliado-sincomprobantes',
  templateUrl: './noafiliado-sincomprobantes.component.html',
  styleUrls: ['./noafiliado-sincomprobantes.component.css'],
  providers: [MessageService]
})



export class NoafiliadoSincomprobantesComponent implements OnInit {

  nombreUser : string = '';
  apellidoUser : string = '';
  estado: boolean = true

  cuentasAfiliado: combobox[] = []
  cuentaAfectada !: combobox


  disponible: boolean = false;

  caf1: string = '005'; //005 obligatorio
  caf2: string = '';    //999
  caf3: string = '';    //999999999 
  codigoAfiliado : string = `${this.caf1}-${this.caf2}-${this.caf3}`

  
  cbxTransacciones: combobox[] = [];
  selectTransaccion !: combobox;

  cbxorigenFondos : combobox[] = [];
  selectOrigenFondo!: combobox;
  
  cbxRazonOperacio: combobox[] = [];
  selectRazonFondo!: combobox;

  cbxParentesco: combobox[] = [];
  selectParentesco!: combobox;

  filialcolabo : number = 0
  

  nombreAfiliadoC: string = '';
  monto!: number 

  identidad: string = "";

  observaciones : string = ""

  diligencia!: diligenciaNoAfiliado 


  constructor(private router : Router,
              private cajaService :CajaService,
              private messageService: MessageService)  { 
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
    
    this.cajaService.getParentesco().subscribe( resp =>{
      resp.forEach(element => {
        this.cbxParentesco.push({code: `${element.id_parentesco}` , name: `${element.parentesco}` })
      });
    })

    this.cajaService.FilialLogueado(Number(localStorage.getItem('token'))||0).subscribe(resp => {
      this.filialcolabo = resp[0].id_oficiona
    })

    //Cambiar al boton o evento de  busqueda de la cuenta
    this.cuentasAfiliado= [
      {name: '1414147', code: '15'},
      {name: 'Rome', code: 'RM'},]
  }

  
  ngOnInit(): void {}

  buscarAfiliado(){
    if(this.identidad.length != 15){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Ingrese una identidad valida'});
    }else{
      this.cajaService.getNoAfiliado(this.identidad).subscribe(respNoAfiliado => {
        if(respNoAfiliado.length == 0){
          this.disponible = true;
          this.estado = false;
        }else{
          this.nombreUser = respNoAfiliado[0].nombre
          this.apellidoUser = respNoAfiliado[0].apellido
          this.disponible= true;
        }
      })
    }
  }
  

  guardar(){
    var date: Date = new Date();
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
                         date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.diligencia = {codigo_afiliado: this.codigoAfiliado, cuenta_afectada: Number(this.cuentaAfectada.code), 
                       fecha_operacion : new Date(formatted_date), id_cajero_operacion: Number(localStorage.getItem('token')),
                       id_filial: this.filialcolabo, id_no_afiliado : this.identidad,
                       id_origen_fondos: Number(this.selectOrigenFondo.code), id_parentesco: Number(this.selectParentesco.code),
                       id_razon_operacion: Number(this.selectRazonFondo.code), id_transaccion: Number(this.selectTransaccion.code),
                       monto_transaccion: this.monto, observaciones: this.observaciones}
    
    console.log(this.diligencia)
    this.cajaService.postDiligenciaNoAfiliado(this.diligencia).subscribe(resp => {
      console.log(resp)
    })
  }

}
