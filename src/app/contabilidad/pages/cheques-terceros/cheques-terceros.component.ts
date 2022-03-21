import { Component, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { ContabilidadService } from '../../services/contabilidad.service';

@Component({
  selector: 'app-cheques-terceros',
  templateUrl: './cheques-terceros.component.html',
  styleUrls: ['./cheques-terceros.component.css']
})
export class ChequesTercerosComponent implements OnInit {

  caf1: string = '005'; //005 obligatorio
  caf2: string = '';    //999
  caf3: string = '';    //999999999 
  codigoAfiliado : string = `${this.caf1}-${this.caf2}-${this.caf3}`

  numCheque!: number 
  monto!: number

  nombreAfiliadoC: string = ''

  nombreBeneficiario: string = ''
  idbeneficiario: string = ''

  cbxParentesco : combobox[] = [];
  selectParentesco!: string;

  cbxorigenFondos : combobox[] = [];
  selectOrigenFondo!: string;

  cbxDestino : combobox[] = [];
  selectDestino!: string;

  observacion: string = '';

  constructor(private contabilidadService : ContabilidadService) { 

    this.contabilidadService.getParentesco().subscribe(resp => {
      resp.forEach(element => {
        this.cbxParentesco.push({code: `${element.id_parentesco}` , name: `${element.parentesco}`})
      });
    });

    this.contabilidadService.getOrigenFondos().subscribe( resp => {
      resp.forEach(element => {
        this.cbxorigenFondos.push({code: `${element.id_origen_fondos}` , name: `${element.origen_fondos}` })
      });
    });

    this.contabilidadService.getDestino().subscribe( resp => {
      resp.forEach(element => {
        this.cbxDestino.push({code: `${element.id_destino}` , name: `${element.destino}`})
      });
    })

  }

  prueba(){
    
  }

  ngOnInit(): void {
  }

}
