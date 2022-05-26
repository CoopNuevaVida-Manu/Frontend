import { Component, OnInit } from '@angular/core';
import { dd_no_afiliado } from 'src/app/interfaces/DD_NoAfiliados.interface';
import { CumplimientoService } from '../../services/cumplimiento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dd_noAfiliado : dd_no_afiliado[] = [] 

  constructor(private cumplimientoService: CumplimientoService) { 

    cumplimientoService.getDDNoafiliados().subscribe(resp => {
      this.dd_noAfiliado = resp
    })
  }

  ngOnInit(): void {
  }

}
