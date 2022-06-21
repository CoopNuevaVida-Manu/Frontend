import { Component, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { ddCumplimiento } from '../../../interfaces/CumplimientoDD.interface';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-dd-no-afiliados',
  templateUrl: './dd-no-afiliados.component.html',
  styleUrls: ['./dd-no-afiliados.component.css'],
  providers: [MessageService]
})
export class DDNoAfiliadosComponent implements OnInit {

  dd_noAfiliado!: ddCumplimiento[]

  extender: boolean = false
  icon : string = "pi pi-angle-down"
  fecha_inicio!: Date
  fecha_final!: Date

  constructor(private cumplimientoService: CumplimientoService, private messageService: MessageService ) {

    cumplimientoService.getDD().subscribe( resp => {
      this.dd_noAfiliado = resp
    })
    
   }

  ngOnInit(): void {
  }

  dowland(){
    this.cumplimientoService.getDowlandDD().subscribe( resp => {
      let filename = "Diligencia_No_Afiliados.xlsx"
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
      console.log(this.fecha_inicio);
      console.log(typeof(this.fecha_inicio));
      let fechai = this.fecha_inicio
      
    }
  }

}
