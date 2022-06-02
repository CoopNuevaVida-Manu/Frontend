import { Component, Input, OnInit } from '@angular/core';
import { CajaService } from 'src/app/caja/services/caja.service';
import { Colaborador } from 'src/app/interfaces/colaboradores.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { sinComprobante } from 'src/app/interfaces/RTE_Sin_Comprobante.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { rteCumplimiento } from '../../../interfaces/CumplimientoRTE.interface';

@Component({
  selector: 'app-rte-sin-comprobante',
  templateUrl: './rte-sin-comprobante.component.html',
  styleUrls: ['./rte-sin-comprobante.component.css']
})
export class RTESinComprobanteComponent implements OnInit {

  RTEsinComprobate!: rteCumplimiento[]

  entradas: number = 1;


  constructor(private cajaService :CajaService, private cumplimientoService: CumplimientoService) {

    cumplimientoService.getTSC().subscribe( resp =>{
      console.log(resp)
      this.RTEsinComprobate = resp
    });

   }

  ngOnInit(): void {
  }

  

}
