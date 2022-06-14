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
    this.router.navigateByUrl('http://localhost:8080/Export/TSC')
  }
  

}
