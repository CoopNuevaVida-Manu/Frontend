import { Component, Input, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { cumplimientoCT } from '../../../interfaces/CumplimientoCT.interface';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cheques-emitidos-terceros',
  templateUrl: './cheques-emitidos-terceros.component.html',
  styleUrls: ['./cheques-emitidos-terceros.component.css'],
  providers: [MessageService]
})
export class ChequesEmitidosTercerosComponent implements OnInit {


  cheques_terceros!: cumplimientoCT[] 

  extender: boolean = false
  icon : string = "pi pi-angle-down"
  fecha_inicio!: Date
  fecha_final!: Date



  constructor( private cumplimientoService : CumplimientoService, private messageService: MessageService) { 

    cumplimientoService.getCT().subscribe( resp => {
      this.cheques_terceros = resp
    })
  }

  ngOnInit(): void {
  }

  dowland(){
    this.cumplimientoService.getDowlandCT().subscribe( resp => {
      let filename = "Cheques_Terceros.xlsx"
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

    }
  }

}
