import { Component, Input, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { dd_no_afiliado } from 'src/app/interfaces/DD_NoAfiliados.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { Colaborador } from 'src/app/interfaces/colaboradores.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';

type NewType = razonOperacion;

@Component({
  selector: 'app-dd-no-afiliados',
  templateUrl: './dd-no-afiliados.component.html',
  styleUrls: ['./dd-no-afiliados.component.css']
})
export class DDNoAfiliadosComponent implements OnInit {

  @Input()
  dd_noAfiliado!: dd_no_afiliado[]

  @Input()
  noAfiliados : NoAfiliado[] = []

  @Input()
  parentesco : Parentesco[] = []

  @Input()
  filial : Filial[] = []

  @Input()
  origen_fondos : origenFondos[] = []

  @Input()
  razon_operacion : razonOperacion[] = []

  @Input()
  transaccion : transaccion[] = []

  @Input()
  colaborador : Colaborador[] = []

  nombreNA!: NoAfiliado
  parentescoNA!: Parentesco
  filialNA !:  Filial
  origenFondoNA !: origenFondos
  razonOperacionNA!: razonOperacion
  transaccionNA !: transaccion
  cajeroNA !: Colaborador

  constructor( ) { }

  ngOnInit(): void {
  }

  getNombre(id : string){
    this.nombreNA = this.noAfiliados.find( afiliado => afiliado.identidad == id) || {apellido: "", id_no_afiliado: 0, identidad: "", nombre: ""}
    return `${this.nombreNA.nombre} ${this.nombreNA.apellido}`
  }

  getParentesco(id : number){
    this.parentescoNA = this.parentesco.find( p => p.id_parentesco == id) || {id_parentesco: 0, parentesco: ""}
    return this.parentescoNA.parentesco
  }

  getFilial(id : number){
    this.filialNA = this.filial.find( f => f.id_filial == id) || {filial: "", id_filial: 0}
    
    return this.filialNA.filial
  }

  getOrigenFondos(id : number){
    this.origenFondoNA = this.origen_fondos.find( o => o.id_origen_fondos == id) || {id_origen_fondos: 0, origen_fondos: ""}
    return this.origenFondoNA.origen_fondos
  }

  getRazonOperacion(id : number){
    this.razonOperacionNA = this.razon_operacion.find( r => r.id_razon_operacion == id) || {id_razon_operacion: 0, razon_operacion: ""}
    return this.razonOperacionNA.razon_operacion
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
