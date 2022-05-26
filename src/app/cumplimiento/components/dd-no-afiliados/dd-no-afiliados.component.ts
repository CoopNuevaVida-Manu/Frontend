import { Component, Input, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { dd_no_afiliado } from 'src/app/interfaces/DD_NoAfiliados.interface';

@Component({
  selector: 'app-dd-no-afiliados',
  templateUrl: './dd-no-afiliados.component.html',
  styleUrls: ['./dd-no-afiliados.component.css']
})
export class DDNoAfiliadosComponent implements OnInit {

  @Input()
  dd_noAfiliado!: dd_no_afiliado[]

  constructor( ) { }

  ngOnInit(): void {
  }

}
