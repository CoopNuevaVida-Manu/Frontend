import { Component, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { cumplimientoFT } from '../../../interfaces/CumplimientoFT.interface';

@Component({
  selector: 'app-firmas-terceros',
  templateUrl: './firmas-terceros.component.html',
  styleUrls: ['./firmas-terceros.component.css']
})
export class FirmasTercerosComponent implements OnInit {

  firmas_autorizadas_terceros !: cumplimientoFT[]

  constructor( private cumplimientoService : CumplimientoService) { 
    
    cumplimientoService.getFT().subscribe( resp => {
      this.firmas_autorizadas_terceros = resp
    })
  }

  ngOnInit(): void {
  }

  dowland(){
    this.cumplimientoService.getDowlandFT().subscribe( resp => {
      let filename = "RTE.xlsx"
      let blob:Blob = resp.body as Blob
      let a = document.createElement('a');
      a.download = filename
      a.href = window.URL.createObjectURL(blob);
      a.click();

    })
  }

}
