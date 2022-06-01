import { Component, Input, OnInit } from '@angular/core';
import { CajaService } from 'src/app/caja/services/caja.service';
import { Colaborador } from 'src/app/interfaces/colaboradores.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { sinComprobante } from 'src/app/interfaces/RTE_Sin_Comprobante.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { CumplimientoService } from '../../services/cumplimiento.service';

@Component({
  selector: 'app-rte-sin-comprobante',
  templateUrl: './rte-sin-comprobante.component.html',
  styleUrls: ['./rte-sin-comprobante.component.css']
})
export class RTESinComprobanteComponent implements OnInit {

  @Input()
  noAfiliados : NoAfiliado[] = []

  @Input()
  filial : Filial[] = []

  @Input()
  origen_fondos : origenFondos[] = []

  @Input()
  transaccion : transaccion[] = []

  @Input()
  colaborador : Colaborador[] = []

  RTEsinComprobate !: sinComprobante[]

  nombreNA!: NoAfiliado
  filialNA !:  Filial
  origenFondoNA !: origenFondos
  transaccionNA !: transaccion
  cajeroNA !: Colaborador

  entradas: number = 1;


  constructor(private cajaService :CajaService, private cumplimientoService: CumplimientoService) {

    cumplimientoService.getRTE_SinComprobante().subscribe( resp =>{
      console.log(resp)
      this.RTEsinComprobate = resp
    });

   }

  ngOnInit(): void {
  }

  numentradas(){
    this.entradas = this.entradas +1
    return this.entradas
  }

  getNombre(id : string){
    
    // this.nombreNA = {apellido: "", id_no_afiliado: 0, identidad: "", nombre: ""}
    // if(id.includes("-")){
    //   this.nombreNA = this.noAfiliados.find( afiliado => afiliado.identidad == id) || {apellido: "", id_no_afiliado: 0, identidad: "", nombre: ""}
    // }else{
    //   let idNuevo = id.replace(/-/g,"");
    //   // console.log(idNuevo)
    //   this.cajaService.getAfiliadoID(idNuevo).subscribe( resp => {
    //     this.nombreNA = {nombre: resp[0].OUTAFF_NAME.toString(), apellido:"", identidad: ""}
    //     return
    //   })
    // }
    return `${this.nombreNA.nombre} ${this.nombreNA.apellido}`
  }

  getFilial(id : number){
    this.filialNA = this.filial.find( f => f.id_filial == id) || {filial: "", id_filial: 0}
    
    return this.filialNA.filial
  }

  getOrigenFondos(id : number){
    this.origenFondoNA = this.origen_fondos.find( o => o.id_origen_fondos == id) || {id_origen_fondos: 0, origen_fondos: ""}
    return this.origenFondoNA.origen_fondos
  }

  getTransaccion(id : number){
    this.transaccionNA = this.transaccion.find( t => t.id_transaccion == id) || {id_transaccion: 0, transaccion: ""}
    return this.transaccionNA.transaccion
  }

  getCajero(id: number){
    this.cajeroNA = this.colaborador.find( c => c.id_colaborador == id) || {colaborador_nombre: "", colaborador_usuario: "", id_estado: 0, id_oficiona: 0}
    return this.cajeroNA.colaborador_usuario

  }

}
