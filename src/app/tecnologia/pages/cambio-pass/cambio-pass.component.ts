import { Component, OnInit } from '@angular/core';
import { TecnologiaService } from '../../services/tecnologia.service';
import { TabColab } from '../../../interfaces/tablaColab.interface';
import { Filial } from '../../../interfaces/filial.interface';
import { combobox } from '../../../interfaces/combobox.interface';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {

  //tablas
  colabotabla: TabColab[] = []
  colabotablaInactivos: TabColab[] = []

  //nuevo usuario
  colabNombre: string = ''
  colabUsuario: string = ''
  cbxfilial: combobox[] = []
  selectFilial : string = ''
  cbxEstadoColab : combobox[] = []
  selectEstadoColab : string = ''
  password: string = ''

  //Ventana emergente de Editar Usuario
  usuario!: TabColab
  usuarioConfirmacion!: TabColab
  editDialog: boolean = false
  editColabNombre: string = ''
  editColabUsuario: string = ''
  editCbxfilial: combobox[] = []
  editSelectFilial : string = ''
  editCbxEstadoColab : combobox[] = []
  editSelectEstadoColab : string = ''
  editPassword: string = ''


  constructor(private tecnologiaService : TecnologiaService) { 
    tecnologiaService.getcolaboradoresActivos().subscribe( respColab => {
      tecnologiaService.getEstadoColab().subscribe(respEstado =>{
        tecnologiaService.getFilial().subscribe( respFilial => {
          respColab.forEach(element => {
            var filial = respFilial.find( filial => filial.id_filial === element.id_oficiona);
            var estado = respEstado.find( estado => estado.id_estado = element.id_estado);

            this.colabotabla.push({ colaborador_nombre: element.colaborador_nombre, 
              colaborador_usuario: element.colaborador_usuario,
              estado : estado?.estado || '',
              oficiona : filial?.filial || '',
              id: element.id || 0 })

          });
        });
      });
    });

    tecnologiaService.getcolaboradoresInactivos().subscribe( respColab => {
      tecnologiaService.getEstadoColab().subscribe(respEstado =>{
        tecnologiaService.getFilial().subscribe( respFilial => {
          respColab.forEach(element => {
            var filial = respFilial.find( filial => filial.id_filial === element.id_oficiona);
            var estado = respEstado.find( estado => estado.id_estado = element.id_estado);

            this.colabotablaInactivos.push({ colaborador_nombre: element.colaborador_nombre, 
              colaborador_usuario: element.colaborador_usuario,
              estado : estado?.estado || '',
              oficiona : filial?.filial || '',
              id: element.id || 0})

          });
        });
      });
    });

    tecnologiaService.getFilial().subscribe( respfilial => {
      respfilial.forEach(element => {
        this.cbxfilial.push( {code: element.id_filial.toString() , name: element.filial})
      });
    })

    tecnologiaService.getEstadoColab().subscribe( respEstado => {
      respEstado.forEach(element => {
        this.cbxEstadoColab.push({code: element.id_estado.toString() , name: element.estado})
      });
    })
  }

  ngOnInit(): void {

  }


  editUser( user: TabColab){
    this.usuario = user;
    this.usuarioConfirmacion = user;
    this.editDialog = true;
    this.editCbxEstadoColab = this.cbxEstadoColab
    this.editCbxfilial = this.cbxfilial
  }

}
