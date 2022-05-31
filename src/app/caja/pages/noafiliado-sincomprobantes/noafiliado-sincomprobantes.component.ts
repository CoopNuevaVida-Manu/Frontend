import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { CajaService } from '../../services/caja.service';
import {MessageService} from 'primeng/api';
import { diligenciaNoAfiliado } from '../../../interfaces/Diligencia_No_Afiliado.interface';
import { Filial } from '../../../interfaces/filial.interface';
import { sinComprobante } from 'src/app/interfaces/RTE_Sin_Comprobante.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { Afiliado } from '../../../interfaces/Afiliado.interface';


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
  codigoAfiliado !: string 

  
  cbxTransacciones: combobox[] = [];
  selectTransaccion !: combobox;

  cbxorigenFondos : combobox[] = [];
  selectOrigenFondo!: combobox;
  
  cbxRazonOperacio: combobox[] = [];
  selectRazonFondo!: combobox;

  cbxParentesco: combobox[] = [];
  selectParentesco!: combobox;

  borrarcbx!: combobox

  filialcolabo : number = 0
  

  nombreAfiliadoC: string = '';
  monto!: number 

  identidad: string = "";

  observaciones : string = ""

  diligencia!: diligenciaNoAfiliado 
  filiales!: Filial[]
  filialA: boolean = true

  rte!: sinComprobante

  noafiliado !: NoAfiliado

  afiliado!: Afiliado[]
  afiliadoMonto: boolean = false
  
  


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

    this.cajaService.getFilial().subscribe( resp => {
      this.filiales = resp
    })

    //Cambiar al boton o evento de  busqueda de la cuenta
    this.cuentasAfiliado= [
      {name: '1414147', code: '15'},
      {name: 'Rome', code: 'RM'},]
    
  }

  
  ngOnInit(): void {}

  buscarAfiliado(){
    this.afiliadoMonto = false
    this.nombreUser = ''
    this.apellidoUser = ''

    if(this.identidad.length != 15){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Ingrese una identidad valida'});
    }else{
      this.cajaService.getAfiliadoID(this.identidad.replace(/-/g,"")).subscribe(resp => {
        console.log(this.identidad.replace(/-/g,""))
        if(resp.length > 0){
          let nombresApellidos = resp[0].OUTAFF_NAME.split(" ")
          console.log(nombresApellidos)
          if(nombresApellidos.length >= 4){
            this.nombreUser = `${nombresApellidos[0]} ${nombresApellidos[1]}`
            this.apellidoUser = `${nombresApellidos[2]} ${nombresApellidos[3]}`
            this.afiliadoMonto = true
          }else{
            this.nombreUser = `${nombresApellidos[0]}`
            this.apellidoUser = `${nombresApellidos[1]} ${nombresApellidos[2]}`
            this.afiliadoMonto = true
          }
          this.disponible= true;

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
      })
    }
  }
  
  buscarCuentas(){
    let idSuc  = 3
    let idCli = 9
    let concatSuc : string = ""
    let concatCli : string = ""

    idSuc = idSuc - this.caf2.length
    idCli = idCli - this.caf3.length

    for (let index = 1; index < idSuc; index++) {
      concatSuc.concat("0")
    }

    for (let index = 1; index < idCli; index++) {
      concatCli.concat("0")
    }

    console.log(concatSuc);
    console.log(concatCli);
  }

  guardar(){

    this.filialA= true

    this.filiales.forEach(element => {
      if(element.id_filial == parseInt(this.caf2)){
        this.filialA = false
      }
    });

    if(this.nombreUser == ""){
      this.messageService.add({severity:'error', summary: 'Agregue un nombre del cliente'});
    }else if(this.apellidoUser == ""){
      this.messageService.add({severity:'error', summary: 'Agregue un apellido del cliente'});
    }else if(this.caf2.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Complete el codigo de afiliado'});
    }else if(this.filialA){
      this.messageService.add({severity:'error', summary: 'Filial erronea en el codigo de usuario'});
    }else if(this.caf3.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Complete el codigo de afiliado'});
    }else if(this.cuentaAfectada == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione una cuenta a afectar'});
    }else if(this.selectTransaccion == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione un tipo de transacción'});
    }else if(this.monto == 0 || this.monto == undefined){
      this.messageService.add({severity:'error', summary: 'Agregue un monto de la transacción'});
    }else if(this.selectParentesco == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione un parentesco'});
    }else if(this.selectOrigenFondo == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione un origen de fondo'});
    }else if(this.selectRazonFondo == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione una razon de operacion'});
    }else{

      this.codigoAfiliado = `${this.caf1}-${this.caf2}-${this.caf3}`

      var date: Date = new Date();
      let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.diligencia = {codigo_afiliado: this.codigoAfiliado, cuenta_afectada: Number(this.cuentaAfectada.code), 
                          fecha_operacion : formatted_date, id_cajero_operacion: Number(localStorage.getItem('token')),
                          id_filial: this.filialcolabo, id_no_afiliado : this.identidad,
                          id_origen_fondos: Number(this.selectOrigenFondo.code), id_parentesco: Number(this.selectParentesco.code),
                          id_razon_operacion: Number(this.selectRazonFondo.code), id_transaccion: Number(this.selectTransaccion.code),
                          monto_transaccion: this.monto, observaciones: this.observaciones}


      if(this.afiliadoMonto){

        if(this.monto >= 100000){
          this.cajaService.postRET(this.rte).subscribe( resp => {
            if(resp.insert){
            }else{
              this.messageService.add({severity:'error', summary: 'Error al guardar la transaccion mayor de 100,000'});
            }
            console.log(resp)
          })
        }else{
          this.messageService.add({severity:'error', summary: 'El monto tiene que ser mayor o igual que Lps. 100,000.00'});
        }
        

      }else{
        
     
      this.cajaService.postDiligenciaNoAfiliado(this.diligencia).subscribe(resp => {
        if(resp.insert){
          this.messageService.add({severity:'success', summary: 'Guardado exitosamente'});
          this.clear();
        }else{
          this.messageService.add({severity:'error', summary: 'Error al guardar la diligencia'});
        }
        
      })

      if(this.monto >= 100000){
        this.cajaService.postRET(this.rte).subscribe( resp => {
          if(resp.insert){
          }else{
            this.messageService.add({severity:'error', summary: 'Error al guardar la transaccion mayor de 100,000'});
          }
          console.log(resp)
        })
      }

      if(this.estado == false){
        this.noafiliado = {identidad: this.identidad, apellido: this.apellidoUser, nombre: this.nombreUser}
        this.cajaService.postNoAfiliado(this.noafiliado).subscribe( resp => {
          if(resp.insert){
          }else{
            this.messageService.add({severity:'success', summary: 'Error al guardado del no afiliado'});
          }
        })
      }
      }
    }
    
  }

  clear(){
    this.afiliadoMonto = false
    this.disponible = false
    this.identidad = ''
    this.nombreUser = ''
    this.apellidoUser = ''
    this.caf2 = ''
    this.caf3 = ''
    this.cuentaAfectada = this.borrarcbx
    this.selectOrigenFondo = this.borrarcbx
    this.selectParentesco = this.borrarcbx
    this.selectRazonFondo = this.borrarcbx
    this.selectTransaccion = this.borrarcbx
    this.observaciones = ''
    this.monto = 0
    this.nombreAfiliadoC = ''
  }

}
