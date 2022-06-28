import { Component, OnInit } from '@angular/core';
import { TecnologiaService } from '../../services/tecnologia.service';
import { TabColab } from '../../../interfaces/tablaColab.interface';
import { combobox } from '../../../interfaces/combobox.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { MenuService } from '../../../menu/services/menu.service';



@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {

  //tablas
  colabotabla: TabColab[] = []
  colabotablaInactivos: TabColab[] = []

  activo: string = "p-button-raised p-button-rounded"
  inactivo: string = "p-button-raised p-button-rounded p-button-danger"
  
  //roles
  departamentos: Departamento[] = []
  selectedValues: number[] = [];


  constructor(private tecnologiaService : TecnologiaService,
              private menuService: MenuService) { 

    //llenado de tabla de colaboradores activos
    tecnologiaService.getcolaboradoresActivos().subscribe( respColab => {
      tecnologiaService.getEstadoColab().subscribe(respEstado =>{
        tecnologiaService.getFilial().subscribe( respFilial => {
          respColab.forEach(element => {
            var filial = respFilial.find( filial => filial.id_filial === element.id_oficiona);
            var estado = respEstado.find( estado => estado.id_estado === element.id_estado);
            
            this.colabotabla.push({ colaborador_nombre: element.colaborador_nombre, 
              colaborador_usuario: element.colaborador_usuario,
              estado : estado?.estado || '',
              oficiona : filial?.filial || '',
              id: element.id_colaborador || 0 })

          });
        });
      });
    });


    //llenado de colaboradores inactivos 
    tecnologiaService.getcolaboradoresInactivos().subscribe( respColab => {
      tecnologiaService.getEstadoColab().subscribe(respEstado =>{
        tecnologiaService.getFilial().subscribe( respFilial => {
          respColab.forEach(element => {
            var filial = respFilial.find( filial => filial.id_filial === element.id_oficiona);
            var estado = respEstado.find( estado => estado.id_estado === element.id_estado);
            
            this.colabotablaInactivos.push({ colaborador_nombre: element.colaborador_nombre, 
              colaborador_usuario: element.colaborador_usuario,
              estado : estado?.estado || '',
              oficiona : filial?.filial || '',
              id: element.id_colaborador || 0})

          });
        });
      });
    });

  }

  ngOnInit(): void {

  }

}
