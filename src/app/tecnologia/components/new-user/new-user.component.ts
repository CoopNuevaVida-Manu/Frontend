import { Component, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { TecnologiaService } from '../../services/tecnologia.service';
import { Colaborador } from '../../../interfaces/colaboradores.interface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  colabNombre: string = ''
  colabUsuario: string = ''
  cbxfilial: combobox[] = []
  selectFilial : string = ''
  cbxEstadoColab : combobox[] = []
  selectEstadoColab : string = ''
  password: string = ''

  departamentos: Departamento[] = []
  selectedValues: number[] = [];

  newColab !: Colaborador

  constructor(private tecnologiaService : TecnologiaService) { 

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


  guardar(){
    this.newColab = {colaborador_nombre: this.colabNombre, 
                     colaborador_usuario : this.colabUsuario,
                     id_estado: Number(this.selectEstadoColab),
                     id_oficiona: Number(this.selectFilial),
                     colaborador_password: this.password}
    
    this.tecnologiaService.postNewColab(this.newColab).subscribe()
  }

  
}
