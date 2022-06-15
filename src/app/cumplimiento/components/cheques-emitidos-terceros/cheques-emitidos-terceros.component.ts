import { Component, Input, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaboradores.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { cumplimientoCT } from '../../../interfaces/CumplimientoCT.interface';

@Component({
  selector: 'app-cheques-emitidos-terceros',
  templateUrl: './cheques-emitidos-terceros.component.html',
  styleUrls: ['./cheques-emitidos-terceros.component.css']
})
export class ChequesEmitidosTercerosComponent implements OnInit {


  cheques_terceros!: cumplimientoCT[] 

  constructor( private cumplimientoService : CumplimientoService) { 

    cumplimientoService.getCT().subscribe( resp => {
      this.cheques_terceros = resp
    })
  }

  ngOnInit(): void {
  }

  dowland(){
    this.cumplimientoService.getDowlandCT().subscribe( resp => {
      let filename = "RTE.xlsx"
      let blob:Blob = resp.body as Blob
      let a = document.createElement('a');
      a.download = filename
      a.href = window.URL.createObjectURL(blob);
      a.click();

    })
  }

}
