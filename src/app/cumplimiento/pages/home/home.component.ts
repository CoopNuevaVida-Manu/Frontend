import { Component, OnInit } from '@angular/core';
import { dd_no_afiliado } from 'src/app/interfaces/DD_NoAfiliados.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { Colaborador } from '../../../interfaces/colaboradores.interface';
import { sinComprobante } from '../../../interfaces/RTE_Sin_Comprobante.interface';
import { chequesTerceros } from '../../../interfaces/Cheques_terceros.interface';
import { EstadoAfiliado } from '../../../interfaces/EstadoAfiliado.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  noAfiliados : NoAfiliado[] = []

  estadoAfiliado !: EstadoAfiliado[]

  parentesco : Parentesco[] = []

  filial : Filial[] = []

  origen_fondos : origenFondos[] = []

  razon_operacion : razonOperacion[] = []

  transaccion : transaccion[] = []

  colaborador : Colaborador[] = []

  dd_noAfiliado : dd_no_afiliado[] = [] 

  RTEsinComprobate !: sinComprobante[]

  chequesTerceros !: chequesTerceros[]

  constructor(private cumplimientoService: CumplimientoService) { 

    cumplimientoService.getNoAfiliado().subscribe( resp => {
      this.noAfiliados = resp
    });

    cumplimientoService.getEstadoAfiliado().subscribe( resp =>{
      this.estadoAfiliado = resp
    })

    cumplimientoService.getParentesco().subscribe( resp => {
      this.parentesco = resp 
    });

    cumplimientoService.getFilial().subscribe( resp =>{
      this.filial = resp
    });

    cumplimientoService.getOrigenFondos().subscribe( resp =>{
      this.origen_fondos = resp
    });

    cumplimientoService.getRazonOperacion().subscribe( resp => {
      this.razon_operacion = resp
    });

    cumplimientoService.gettransacciones().subscribe( resp => {
      this.transaccion = resp
    });

    cumplimientoService.getAllColab().subscribe( resp => {
      this.colaborador = resp
    });

    cumplimientoService.getDDNoafiliados().subscribe(resp => {
      this.dd_noAfiliado = resp
    });

    cumplimientoService.getRTE_SinComprobante().subscribe( resp =>{
      this.RTEsinComprobate = resp
    });

    cumplimientoService.getChequesTerceros().subscribe( resp => {
      this.chequesTerceros = resp
    })
    

    
  }

  ngOnInit(): void {
  }

}
