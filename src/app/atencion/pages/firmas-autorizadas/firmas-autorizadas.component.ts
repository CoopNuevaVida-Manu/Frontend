import { Component, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { AtencionService } from '../../services/atencion.service';

@Component({
  selector: 'app-firmas-autorizadas',
  templateUrl: './firmas-autorizadas.component.html',
  styleUrls: ['./firmas-autorizadas.component.css']
})
export class FirmasAutorizadasComponent implements OnInit {

  caf1: string = '005'; //005 obligatorio
  caf2: string = '';    //999
  caf3: string = '';    //999999999 
  codigoAfiliado : string = `${this.caf1}-${this.caf2}-${this.caf3}`

  
  nombreAfiliadoC: string = ''

  nombreAutorizado: string = ''
  idAutorizado: string = ''

  cbxParentesco : combobox[] = [];
  selectParentesco!: string;
  
  cbxFirma : combobox[] = [];
  selectFirma!: string;

  observaciones: string = ""

  constructor(private atencionService : AtencionService) { 
    this.atencionService.getParentesco().subscribe(resp => {
      resp.forEach(element => {
        this.cbxParentesco.push({code: `${element.id_parentesco}` , name: `${element.parentesco}`})
      });
    });

    this.atencionService.getFirmas().subscribe( resp => {
      resp.forEach(element => {
        this.cbxFirma.push({code: `${element.id_firma}` , name: `${element.firma}`})
      });
    })
  }

  ngOnInit(): void {
  }

  prueba(){}

}
