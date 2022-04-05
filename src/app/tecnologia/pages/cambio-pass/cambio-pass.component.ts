import { Component, OnInit } from '@angular/core';
import { TecnologiaService } from '../../services/tecnologia.service';
import { TabColab } from '../../../interfaces/tablaColab.interface';
import { Filial } from '../../../interfaces/filial.interface';
import { ColabEstado } from '../../../interfaces/ColabEstado.interface';
import { Colaborador } from '../../../interfaces/colaboradores.interface';
import { EstadoAfiliado } from '../../../interfaces/EstadoAfiliado.interface';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {

  colabotabla: TabColab[] = []


  constructor(private tecnologiaService : TecnologiaService) { 
    tecnologiaService.getcolaboradores().subscribe( respColab => {
      tecnologiaService.getEstadoColab().subscribe(respEstado =>{
        tecnologiaService.getFilial().subscribe( respFilial => {
          respColab.forEach(element => {
            var filial = respFilial.find( filial => filial.id_filial === element.id_oficiona);
            var estado = respEstado.find( estado => estado.id_estado = element.id_estado);

            this.colabotabla.push({ colaborador_nombre: element.colaborador_nombre, 
              colaborador_usuario: element.colaborador_usuario,
              estado : estado?.estado || '',
              oficiona : filial?.filial || '',
              id_colaborador: element.id_colaborador })

          });
        });
      });
    });

  }

  ngOnInit(): void {

  }

}
