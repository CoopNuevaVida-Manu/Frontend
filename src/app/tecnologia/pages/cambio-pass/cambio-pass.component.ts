import { Component, OnInit } from '@angular/core';
import { TecnologiaService } from '../../services/tecnologia.service';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {

  constructor(private tecnologiaService : TecnologiaService) { }

  ngOnInit(): void {
  }

}
