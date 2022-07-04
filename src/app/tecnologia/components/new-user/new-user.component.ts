import { Component, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { TecnologiaService } from '../../services/tecnologia.service';
import { Colaborador } from '../../../interfaces/colaboradores.interface';

import {MessageService} from 'primeng/api';
import { RolColabDep } from 'src/app/interfaces/colaborador_departamento.interface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [MessageService]
})


export class NewUserComponent implements OnInit {

  colabNombre: string = ''
  colabUsuario: string = ''
  cbxfilial: combobox[] = []
  selectFilial !: combobox
  cbxEstadoColab : combobox[] = []
  selectEstadoColab !: combobox
  password: string = ''

  departamentos: Departamento[] = []
  selectedValues: number[] = [];
  rolescolab: number[] = []
  

  newColab !: Colaborador
  newIdColab : number = 0
  newRolColab !: RolColabDep

  constructor(private tecnologiaService : TecnologiaService,
              private messageService: MessageService) { 

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

  guardarROL(){
    this.tecnologiaService.getColabEnd().subscribe( id => {
      this.newIdColab = id[0].id_colaborador || 0 
      this.rolescolab.forEach(element => {
        this.newRolColab = {id_colaborador: Number(this.newIdColab), id_departamento: Number(element)}
        this.tecnologiaService.rolColab(this.newRolColab).subscribe(resp => {
        })
      });
    })
  }


  guardar(){
    this.rolescolab = this.selectedValues
    if(this.colabNombre==""){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'El nombre del colaborador no fue asignado'});
    }else if(this.colabUsuario == ''){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'El usuario del colaborador no fue asignado'});
    }else if(this.selectFilial == undefined){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Seleccione una filial para el colaborador'});
    }else if(this.selectEstadoColab == undefined){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Seleccione un estado para el colaborador'});
    }else if(this.selectedValues.length == 0){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Seleccione un rol para el colaborador'});
    }else if(this.password == ""){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La contraseña del colaborador no fue asignado'});
    }else{
      this.newColab = {colaborador_nombre: this.colabNombre, 
                     colaborador_usuario : this.colabUsuario,
                     id_estado: Number(this.selectEstadoColab.code),
                     id_oficiona: Number(this.selectFilial.code),
                     colaborador_password: this.password}
    
      this.tecnologiaService.postNewColab(this.newColab).subscribe( async resp => {
        if(resp.insert){
          await this.guardarROL()
          await this.clear()
          this.messageService.add({severity:'success', summary: 'Completado', detail: 'Nuevo colaborador creado exitosamente'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Existe un colaborador con ese nombre de usuario'});
        }
      })
    }

    
  }

  clear(){
    this.colabNombre = ''
    this.colabUsuario = ''
    this.password = ''
    this.selectedValues = []
    this.selectEstadoColab = {code: '', name: ''} 
    this.selectFilial = {code: '', name: ''}
  }

  
}
