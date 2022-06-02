import { Component, Input, OnInit } from '@angular/core';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { Colaborador } from 'src/app/interfaces/colaboradores.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { dd_no_afiliado } from 'src/app/interfaces/DD_NoAfiliados.interface';


@Component({
  selector: 'app-dd-no-afiliados',
  templateUrl: './dd-no-afiliados.component.html',
  styleUrls: ['./dd-no-afiliados.component.css']
})
export class DDNoAfiliadosComponent implements OnInit {

  dd_noAfiliado!: dd_no_afiliado[]


  constructor(private cumplimientoService: CumplimientoService ) {

    
    
   }

  ngOnInit(): void {
  }



}
