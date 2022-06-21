import { Component, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { cumplimientoFT } from '../../../interfaces/CumplimientoFT.interface';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-firmas-terceros',
  templateUrl: './firmas-terceros.component.html',
  styleUrls: ['./firmas-terceros.component.css'],
  providers: [MessageService]
})
export class FirmasTercerosComponent implements OnInit {

  firmas_autorizadas_terceros !: cumplimientoFT[]

  extender: boolean = false
  icon : string = "pi pi-angle-down"
  fecha_inicio!: Date
  fecha_final!: Date


  constructor( private cumplimientoService : CumplimientoService, private messageService: MessageService) { 
    
    cumplimientoService.getFT().subscribe( resp => {
      this.firmas_autorizadas_terceros = resp
    })
  }

  ngOnInit(): void {
  }

  dowland(){
    this.cumplimientoService.getDowlandFT().subscribe( resp => {
      let filename = "Firmas_Terceros.xlsx"
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
