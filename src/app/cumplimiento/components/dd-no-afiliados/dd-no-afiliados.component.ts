import { Component, Input, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { ddCumplimiento } from '../../../interfaces/CumplimientoDD.interface';


@Component({
  selector: 'app-dd-no-afiliados',
  templateUrl: './dd-no-afiliados.component.html',
  styleUrls: ['./dd-no-afiliados.component.css']
})
export class DDNoAfiliadosComponent implements OnInit {

  dd_noAfiliado!: ddCumplimiento[]


  constructor(private cumplimientoService: CumplimientoService ) {

    cumplimientoService.getDD().subscribe( resp => {
      this.dd_noAfiliado = resp
    })
    
   }

  ngOnInit(): void {
  }



}
