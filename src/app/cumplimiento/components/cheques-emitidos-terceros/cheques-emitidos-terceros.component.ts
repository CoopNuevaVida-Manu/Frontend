import { Component, Input, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaboradores.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';

@Component({
  selector: 'app-cheques-emitidos-terceros',
  templateUrl: './cheques-emitidos-terceros.component.html',
  styleUrls: ['./cheques-emitidos-terceros.component.css']
})
export class ChequesEmitidosTercerosComponent implements OnInit {

  @Input()
  noAfiliados : NoAfiliado[] = []

  @Input()
  parentesco : Parentesco[] = []

  @Input()
  filial : Filial[] = []

  @Input()
  origen_fondos : origenFondos[] = []

  @Input()
  razon_operacion : razonOperacion[] = []

  @Input()
  colaborador : Colaborador[] = []

  constructor() { }

  ngOnInit(): void {
  }



}
