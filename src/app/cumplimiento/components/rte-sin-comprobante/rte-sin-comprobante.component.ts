import { Component, Input, OnInit } from '@angular/core';
import { CajaService } from 'src/app/caja/services/caja.service';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { rteCumplimiento } from '../../../interfaces/CumplimientoRTE.interface';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-rte-sin-comprobante',
  templateUrl: './rte-sin-comprobante.component.html',
  styleUrls: ['./rte-sin-comprobante.component.css'],
  providers: [MessageService]
})
export class RTESinComprobanteComponent implements OnInit {

  RTEsinComprobate!: rteCumplimiento[]

  extender: boolean = false
  icon : string = "pi pi-angle-down"
  fecha_inicio!: Date
  fecha_final!: Date


  constructor(private cajaService :CajaService, private cumplimientoService: CumplimientoService, private messageService: MessageService) {

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

  parametrizar(){
    if(this.extender == false){
      this.extender = true
      this.icon = "pi pi-angle-up"
    }else{
      this.extender = false
      this.icon = "pi pi-angle-down"
    }
  }

  dowland_parameter(){
    if(this.fecha_inicio > this.fecha_final){
      this.messageService.add({severity:'error', summary: 'Error de fecha', detail: 'Verifique que la fecha de inicio sea menor que la fecha final'});
    }else{

      let fechai = this.fecha_inicio.getFullYear() + "-" + (this.fecha_inicio.getMonth() + 1) + "-" + this.fecha_inicio.getDate()
      let fechaf = this.fecha_final.getFullYear() + "-" + (this.fecha_final.getMonth() + 1) + "-" + this.fecha_final.getDate()

      this.cumplimientoService.getDowlandRTEP(fechai,fechaf).subscribe( resp => {
        let filename = "RTE_P.xlsx"
        let blob:Blob = resp.body as Blob
        let a = document.createElement('a');
        a.download = filename
        a.href = window.URL.createObjectURL(blob);
        a.click();
  
      })

    }
  }

}
