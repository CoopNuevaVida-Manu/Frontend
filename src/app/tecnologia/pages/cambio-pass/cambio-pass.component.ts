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
  editCbxfilial: combobox[] = []
  editSelectFilial : combobox = {code: '' , name : ''}
  editCbxEstadoColab : combobox[] = []
  editSelectEstadoColab : combobox = {code: '' , name : ''}
  editPassword: string = ''
  editselectedValues: number[] = [];
  editValues: number[] = [];

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

    //cargar los datos de las filiales existentes de la base de datos
    tecnologiaService.getFilial().subscribe( respfilial => {
      respfilial.forEach(element => {
        this.cbxfilial.push( {code: element.id_filial.toString() , name: element.filial})
      });
    })

    //Estados de los colaboradores de la base de datos
    tecnologiaService.getEstadoColab().subscribe( respEstado => {
      respEstado.forEach(element => {
        this.cbxEstadoColab.push({code: element.id_estado.toString() , name: element.estado})
      });
    })

    //departamentos disponibles
    tecnologiaService.getDepartamentos().subscribe( respDepartamentos =>{
      this.departamentos = respDepartamentos;
      console.log(this.departamentos)
    })

  }

  ngOnInit(): void {

  }




  async editUser( user: TabColab){
    await this.menuService.getColabDepID(user.id).subscribe(respcolab => {
      respcolab.forEach(element => {
        this.editselectedValues.push(element.id_departamento)
      });
      console.log(this.editselectedValues);
    })
    this.editValues = this.editselectedValues
    this.usuario = JSON.parse(JSON.stringify(user));
    this.usuarioConfirmacion = JSON.parse(JSON.stringify(user));
    this.editCbxEstadoColab = this.cbxEstadoColab
    this.editSelectEstadoColab = this.cbxEstadoColab.find(estado => estado.name === user.estado) || this.cbxEstadoColab[0]
    this.editCbxfilial = this.cbxfilial
    this.editSelectFilial = this.cbxfilial.find( filial => filial.name === user.oficiona) || this.cbxfilial[0]
    this.editDialog = true;
  }

  print(){
    console.log('EditValues', this.editValues)
    console.log('EditSelectValues', this.editselectedValues)
    console.log('selectvalues', this.selectedValues);
    
  }

  guardar(){
    console.log(this.selectedValues)
  }

}
