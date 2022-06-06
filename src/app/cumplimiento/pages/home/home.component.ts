import { Component, OnInit } from '@angular/core';
import { dd_no_afiliado } from 'src/app/interfaces/DD_NoAfiliados.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { CumplimientoService } from '../../services/cumplimiento.service';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { Colaborador } from '../../../interfaces/colaboradores.interface';
import { sinComprobante } from '../../../interfaces/RTE_Sin_Comprobante.interface';
import { chequesTerceros } from '../../../interfaces/Cheques_terceros.interface';
import { EstadoAfiliado } from '../../../interfaces/EstadoAfiliado.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 

  }

  ngOnInit(): void {
  }

}
