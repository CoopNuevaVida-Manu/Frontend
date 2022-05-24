import { Component, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { AtencionService } from '../../services/atencion.service';
import {MessageService} from 'primeng/api';
import { CajaService } from '../../../caja/services/caja.service';
import { firmaTercero } from 'src/app/interfaces/Firmas_Terceros.interface';


@Component({
  selector: 'app-firmas-autorizadas',
  templateUrl: './firmas-autorizadas.component.html',
  styleUrls: ['./firmas-autorizadas.component.css'],
  providers: [MessageService]
})
export class FirmasAutorizadasComponent implements OnInit {

  caf1: string = '005'; //005 obligatorio
  caf2: string = '';    //999
  caf3: string = '';    //999999999 
  codigoAfiliado !: string 

  cuentasAfiliado: combobox[] = []
  cuentaAfectada !: combobox
  
  nombreAfiliadoC: string = ''

  nombreAutorizado: string = ''
  idAutorizado: string = ''

  cbxParentesco : combobox[] = [];
  selectParentesco!: combobox;
  
  cbxFirma : combobox[] = [];
  selectFirma!: combobox;

  editarNombreA: boolean = true

  observaciones: string = ""

  borrarcbx!: combobox

  firmaAutorizada!: firmaTercero  
  estadoAfiliado: number = 2
  filialcolabo!: number

  constructor(private atencionService : AtencionService,
              private messageService: MessageService,
              private cajaService : CajaService) { 
    this.atencionService.getParentesco().subscribe(resp => {
      resp.forEach(element => {
        this.cbxParentesco.push({code: `${element.id_parentesco}` , name: `${element.parentesco}`})
      });
    });

    this.atencionService.getFirmas().subscribe( resp => {
      resp.forEach(element => {
        this.cbxFirma.push({code: `${element.id_firma}` , name: `${element.firma}`})
      });
    });

    this.cajaService.FilialLogueado(Number(localStorage.getItem('token'))||0).subscribe(resp => {
      this.filialcolabo = resp[0].id_oficiona
    })

    this.cuentasAfiliado= [
      {name: '1414147', code: '15'},
      {name: 'Rome', code: 'RM'},]
  }

  ngOnInit(): void {
  }

  buscarAfiliado(){
    if(this.idAutorizado.length != 15){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Ingrese una identidad valida'});
    }else{
      this.cajaService.getNoAfiliado(this.idAutorizado).subscribe(respNoAfiliado => {
        if(respNoAfiliado.length == 0){
          this.editarNombreA = false;
        }else{
          this.nombreAutorizado = respNoAfiliado[0].nombre
        }
      })
    }
  }

  guardar(){
    if(this.caf2.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Complete el codigo de afiliado'});
    }else if(this.caf3.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Complete el codigo de afiliado'});
    }else if(this.cuentaAfectada == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione una cuenta'});
    }else if(this.idAutorizado.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Identidad', detail: "Agregue la identidad de la persona autorizada"});
    }else if(this.nombreAutorizado.trim() == ""){
      this.messageService.add({severity:'error', summary: 'Nombre', detail: 'Agregue el nombre de la persona autorizada'});
    }else if(this.selectParentesco == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione un parentesco'});
    }else if(this.selectFirma == undefined){
      this.messageService.add({severity:'error', summary: 'Seleccione un tippo de firma'});
    }else{

      this.codigoAfiliado = `${this.caf1}-${this.caf2}-${this.caf3}`

      var date: Date = new Date();
      let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.firmaAutorizada = {apertura_actualizacion: formatted_date, codigo_afiliado: this.codigoAfiliado,
                              cuenta_afiliado: Number(this.cuentaAfectada.code), id_afiliado_estado: this.estadoAfiliado,
                              id_cliente: this.idAutorizado, id_colaborador: Number(localStorage.getItem('token')),
                              id_filial_pertenece:  this.filialcolabo, id_firma: Number(this.selectFirma.code),
                              id_parentesco: Number(this.selectParentesco.code) , observaciones: this.observaciones.trim()}
    }
    console.log(this.firmaAutorizada)
    this.atencionService.postFirmaAutorizada(this.firmaAutorizada).subscribe(resp =>{
      console.log(resp)
      if(resp.insert){
        this.messageService.add({severity:'success', summary: 'Guardado exitosamente'});
        this.clear()
      }else{
        this.messageService.add({severity:'error', summary: 'Error al guardar'});
      }
    })
  }

  clear(){
    this.caf2 = ""
    this.caf3 = ""
    this.cuentaAfectada = this.borrarcbx
    this.idAutorizado = ""
    this.selectFirma = this.borrarcbx
    this.selectParentesco = this.borrarcbx
    this.observaciones= ""
    this.nombreAutorizado = ""
    this.nombreAutorizado = ""
  }

}
