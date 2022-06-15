import { Component, Input, OnInit } from '@angular/core';
import { CajaService } from 'src/app/caja/services/caja.service';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { rteCumplimiento } from '../../../interfaces/CumplimientoRTE.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rte-sin-comprobante',
  templateUrl: './rte-sin-comprobante.component.html',
  styleUrls: ['./rte-sin-comprobante.component.css']
})
export class RTESinComprobanteComponent implements OnInit {

  RTEsinComprobate!: rteCumplimiento[]


  constructor(private cajaService :CajaService, private cumplimientoService: CumplimientoService, private router: Router) {

    cumplimientoService.getTSC().subscribe( resp =>{
      this.RTEsinComprobate = resp
    });

   }

  ngOnInit(): void {
  }

  dowland(){
    this.cumplimientoService.getDowlandRTE().subscribe( resp => {
      let filename = "RTE.xlsx"
      let blob:Blob = resp.body as Blob
      let a = document.createElement('a');
      a.download = filename
      a.href = window.URL.createObjectURL(blob);
      a.click();

    })
  }

}
