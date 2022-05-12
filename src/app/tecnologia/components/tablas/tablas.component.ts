import { Component, Input, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { TabColab } from 'src/app/interfaces/tablaColab.interface';
import { MenuService } from 'src/app/menu/services/menu.service';
import { TecnologiaService } from '../../services/tecnologia.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {


  @Input()
  colabotabla: TabColab[] = []

  @Input()
  estado: string = ""

  //Editar usuario
  editDialog: boolean = false
  colabId : number = 0
  colabNombre: string = ''
  colabUsuario: string = ''
  cbxfilial: combobox[] = []
  selectFilial !: combobox 
  cbxEstadoColab : combobox[] = []
  selectEstadoColab !: combobox
  password: string = ''

  departamentos: Departamento[] = []
  selectedValues: number[] = [];

  cambio : number = 0;
  editarroles : boolean = false
  

  constructor(private menuService: MenuService,
              private tecnologiaService : TecnologiaService ) { 
    
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
    })
    
  }

  ngOnInit(): void {
    
  }

  async editUser( user: TabColab){

    //limpieza
    this.colabId = 0
    this.colabNombre = ""
    this.colabUsuario = ""
    this.selectFilial = {code: "0" , name : ""}
    this.selectedValues = []
    this.cambio = 0;
    this.editarroles = false
    this.selectEstadoColab = {code: "0" , name : ""}


    this.colabId = user.id
    this.colabNombre = user.colaborador_nombre.toString()
    this.colabUsuario = user.colaborador_usuario
  
    await this.menuService.getColabDepID(user.id).subscribe(respcolab => {
      respcolab.forEach(element => {
        this.selectedValues.push(element.id_departamento)
      });
    })

    this.cambio = 0
    this.editarroles = false
    this.selectEstadoColab = this.cbxEstadoColab.find(estado => estado.name === user.estado) || this.cbxEstadoColab[0]
    this.selectFilial = this.cbxfilial.find( filial => filial.name === user.oficiona) || this.cbxfilial[0]
    this.editDialog = true;
    
  }

}
