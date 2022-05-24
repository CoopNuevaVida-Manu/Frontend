import { Component, OnInit } from '@angular/core';
import { chequesTerceros } from 'src/app/interfaces/Cheques_terceros.interface';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { ContabilidadService } from '../../services/contabilidad.service';
import {MessageService} from 'primeng/api';
import { CajaService } from '../../../caja/services/caja.service';
@Component({
  selector: 'app-cheques-terceros',
  templateUrl: './cheques-terceros.component.html',
  styleUrls: ['./cheques-terceros.component.css'],
  providers: [MessageService]
})
export class ChequesTercerosComponent implements OnInit {

  caf1: string = '005'; //005 obligatorio
  caf2: string = '';    //999
  caf3: string = '';    //999999999 
  codigoAfiliado !: string 

  numCheque!: number 
  monto!: number

  nombreAfiliadoC: string = ''

  nombreBeneficiario: string = ''
  idbeneficiario: string = ''

  cbxParentesco : combobox[] = [];
  selectParentesco!: combobox;

  borrarcbx!: combobox;

  cbxorigenFondos : combobox[] = [];
  selectOrigenFondo!: combobox;

  cbxDestino : combobox[] = [];
  selectDestino!: combobox;

  observacion: string = '';

  afiliado : number = 2

  filialcolabo!: number

  editnombre: boolean = true

  controlCheque!: chequesTerceros

  constructor(private contabilidadService : ContabilidadService,
              private messageService: MessageService,
              private cajaService: CajaService) { 

    this.contabilidadService.getParentesco().subscribe(resp => {
      resp.forEach(element => {
        this.cbxParentesco.push({code: `${element.id_parentesco}` , name: `${element.parentesco}`})
      });
    });

    this.contabilidadService.getOrigenFondos().subscribe( resp => {
      resp.forEach(element => {
        this.cbxorigenFondos.push({code: `${element.id_origen_fondos}` , name: `${element.origen_fondos}` })
      });
    });

    this.contabilidadService.getDestino().subscribe( resp => {
      resp.forEach(element => {
        this.cbxDestino.push({code: `${element.id_destino}` , name: `${element.destino}`})
      });
    })

    this.cajaService.FilialLogueado(Number(localStorage.getItem('token'))||0).subscribe(resp => {
      this.filialcolabo = resp[0].id_oficiona
    })

  }

  buscarAfiliado(){
    if(this.idbeneficiario.length != 15){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Ingrese una identidad valida'});
    }else{
      this.cajaService.getNoAfiliado(this.idbeneficiario).subscribe(respNoAfiliado => {
        if(respNoAfiliado.length == 0){
          this.editnombre = false;
        }else{
          this.nombreBeneficiario = respNoAfiliado[0].nombre
          this.editnombre= true;
        }
      })
    }
  }

  guardar(){
    
    if(this.caf2.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Complete el codigo de afiliado'});
    }else if(this.caf3.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Complete el codigo de afiliado'});
    }else if(this.numCheque == 0 || this.numCheque == undefined){
      this.messageService.add({severity:'error', summary: 'Agregue un numero de cheque'});
    }else if(this.monto == 0 || this.monto == undefined){
      this.messageService.add({severity:'error', summary: 'Agregue un monto de la transacción'});
    }else if(this.idbeneficiario.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Agregue la identidad del beneficiario'});
    }else if(this.nombreBeneficiario.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Agregue el nombre del beneficiario'}); 
    }else if(this.selectParentesco == undefined ){
      this.messageService.add({severity:'error', summary: 'Seleccione un parentesco'});
    }else if(this.selectOrigenFondo == undefined ){
      this.messageService.add({severity:'error', summary: 'Seleccione un origen de fondos'});
    }else if(this.selectDestino == undefined ){
      this.messageService.add({severity:'error', summary: 'Seleccione un destino'});
    }else{
      this.codigoAfiliado = `${this.caf1}-${this.caf2}-${this.caf3}`

      var date: Date = new Date();
      let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

      this.controlCheque = {codigo_de_afiliado: this.codigoAfiliado, fecha_emision: formatted_date,
                            id_afililiado_estado : this.afiliado, id_colaborador : Number(localStorage.getItem('token')),
                            id_destino: Number(this.selectDestino.code), id_filial: this.filialcolabo,
                            id_origen_fondos: Number(this.selectOrigenFondo.code), id_parentesco: Number(this.selectParentesco.code),
                            id_persona: this.idbeneficiario, monto : this.monto,
                            n_cheque: this.numCheque, observaciones: this.observacion }
      this.contabilidadService.postChequesTerceros(this.controlCheque).subscribe( resp => {
        if(resp.insert){
          this.messageService.add({severity:'success', summary: 'Guardado exitosamente'}); 
          this.clear();
        }
      })
    }
  }

  clear(){
    this.caf2 = ""
    this.caf3 = ""
    this.nombreAfiliadoC = ""
    this.numCheque = 0
    this.monto = 0
    this.idbeneficiario = ""
    this.nombreBeneficiario = ""
    this.selectDestino = this.borrarcbx
    this.selectOrigenFondo = this.borrarcbx
    this.selectParentesco = this.borrarcbx
    this.observacion = ""
  }

  ngOnInit(): void {
  }
}
