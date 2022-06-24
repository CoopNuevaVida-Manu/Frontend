import { Component, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { AtencionService } from '../../services/atencion.service';
import {MessageService} from 'primeng/api';
import { CajaService } from '../../../caja/services/caja.service';
import { firmaTercero } from 'src/app/interfaces/Firmas_Terceros.interface';
import { Afiliado } from '../../../interfaces/Afiliado.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';


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

  nuevoAfiliado!: Afiliado
  nuevoNoAfiliado !: NoAfiliado

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

  }

  ngOnInit(): void {
  }

  // buscarAfiliado(){
  //   if(this.idAutorizado.length != 15){
  //     this.messageService.add({severity:'error', summary: 'Error', detail: 'Ingrese una identidad valida'});
  //   }else{
  //     this.cajaService.getNoAfiliado(this.idAutorizado).subscribe(respNoAfiliado => {
  //       if(respNoAfiliado.length == 0){
  //         this.editarNombreA = false;
  //       }else{
  //         this.nombreAutorizado = respNoAfiliado[0].nombre
  //       }
  //     })
  //   }
  // }

  buscarAfiliado(){
    this.estadoAfiliado = 2
    this.nombreAutorizado = ""

    let NuevaIdentidad = this.idAutorizado.replace(/-/g,"");

    if(this.idAutorizado.length != 15){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Ingrese una identidad valida'});
    }else{
      this.atencionService.getAfiliadoID(NuevaIdentidad).subscribe( resp => {
        if(resp.length == 0){
          this.cajaService.getNoAfiliado(NuevaIdentidad).subscribe(respNoAfiliado => {
              if(respNoAfiliado.length == 0){
                this.editarNombreA = false;
              }else{
                this.nombreAutorizado = respNoAfiliado[0].nombre + ' ' + respNoAfiliado[0].apellido
                this.editarNombreA= true;
              }
            })
        }else{
          this.estadoAfiliado = 1
          this.nuevoAfiliado = resp[0]
          this.nombreAutorizado = resp[0].OUTAFF_NAME
        }
      })
    }
  }


  buscarCuentas(){
    this.cuentasAfiliado = []
    this.cuentaAfectada = this.borrarcbx
    this.nombreAfiliadoC = ""
    let idSuc  = 3
    let idCli = 9
    let concatSuc : string = "000"
    let concatCli : string = "000000000"

    idSuc = idSuc - this.caf2.length
    idCli = idCli - this.caf3.length

    concatSuc=concatSuc.substring(0, idSuc).concat(this.caf2)
    concatCli=concatCli.substring(0, idCli).concat(this.caf3)

    this.cajaService.getCuentasAfiliado(concatSuc,concatCli).subscribe( resp => {
      if(resp.length > 0){
        this.caf2 = concatSuc
        this.caf3 = concatCli
        resp.forEach(element => {
          this.cuentasAfiliado.push({code: element.OUTSAV_CLI_NOSEC.toString(), name: element.OUTSAV_CLI_NOSEC.toString()})
        });
        this.cajaService.getAfiliadoCli(concatSuc,concatCli).subscribe( resp => {
          if(resp.length > 0){
            this.nombreAfiliadoC = resp[0].OUTAFF_NAME
          }
        });
      }else{
        this.messageService.add({severity:'error', summary: 'Cuenta inexistente', detail : 'Asegurese que el numero sea correcto'});
      }
    })


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

      let NuevaIdentidad = this.idAutorizado.replace(/-/g,"");

      this.codigoAfiliado = `${this.caf1}-${this.caf2}-${this.caf3}`

      var date: Date = new Date();
      let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.firmaAutorizada = {apertura_actualizacion: formatted_date, codigo_afiliado: this.codigoAfiliado,
                              cuenta_afiliado: Number(this.cuentaAfectada.code), id_afiliado_estado: this.estadoAfiliado,
                              id_cliente: NuevaIdentidad, id_colaborador: Number(localStorage.getItem('token')),
                              id_filial_pertenece:  Number(this.caf2), id_firma: Number(this.selectFirma.code),
                              id_parentesco: Number(this.selectParentesco.code) , observaciones: this.observaciones.trim()}
                              console.log(this.firmaAutorizada)

      this.atencionService.postFirmaAutorizada(this.firmaAutorizada).subscribe(resp =>{
        console.log(resp)
        if(resp.insert){
          if(this.estadoAfiliado == 1){
            this.atencionService.getAfiliadoPSQL(NuevaIdentidad).subscribe( resp => {
              if(resp.length == 0){
                this.atencionService.postAfiliadoPSQL(this.nuevoAfiliado).subscribe( resp => {

                })
              }
            })
          }
          this.messageService.add({severity:'success', summary: 'Guardado exitosamente'});
          this.clear()
        }else{
          this.messageService.add({severity:'error', summary: 'Error al guardar'});
        }
      });

      if(this.editarNombreA == false){
        let nombrecompleto = this.nombreAutorizado.split(" ")
        let nombre = nombrecompleto[0] + ' ' + nombrecompleto[1]
        let apellido = (nombrecompleto[2] || "") + ' ' + (nombrecompleto[3] || "")
        this.nuevoNoAfiliado = { identidad: NuevaIdentidad, nombre: nombre, apellido: apellido}
        this.atencionService.postNoAfiliado(this.nuevoNoAfiliado).subscribe( resp => {
          console.log( resp )
        })
      }


    }
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
    this.nombreAfiliadoC= ""
  }

  soloLetras(e:KeyboardEvent){
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 37, 39, 46],
      tecla_especial = false;
  
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
  
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }else{
      return false
    }
  }

}



