import { Component, Input, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { Colaborador } from '../../../interfaces/colaboradores.interface';
import { Router } from '@angular/router';
import { TecnologiaService } from '../../services/tecnologia.service';
import {MessageService} from 'primeng/api';
import { RolColabDep } from '../../../interfaces/colaborador_departamento.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [MessageService]

})
export class EditUserComponent implements OnInit {

  @Input()
  colabNombre: string = ""
  @Input()
  colaborador_usuario: string = ""
  @Input()
  cbxfilial: combobox[] = []
  @Input()
  selectFilial!: combobox
  @Input()
  departamentos: Departamento[] = []
  @Input()
  selectedValues!: number[]
  @Input()
  cambio : number = 0;
  @Input()
  editarroles : boolean = false
  @Input()
  cbxEstadoColab : combobox[] = []
  @Input()
  selectEstadoColab !: combobox
  @Input()
  colabId : number = 0

  editPassword: string = ""

  desplegarBoton : string = "pi pi-chevron-circle-down"
  flag!: number[]

  rolescolab: RolColabDep[] = []

  editcolab !: Colaborador 

  estadoEdit : boolean = false

  constructor(private router: Router,
              private tecnologiaService : TecnologiaService,
              private messageService: MessageService) { 
   
  }

  ngOnInit(): void {
   
  }

  cancel(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['TI/']);
  }

  save(){
    if(this.editPassword.trim() == ""){
      this.editcolab = {id_colaborador: this.colabId,
        colaborador_nombre: this.colabNombre ,
        colaborador_usuario: this.colaborador_usuario,
        id_estado: Number(this.selectEstadoColab.code),
        id_oficiona: Number(this.selectFilial.code)}
    }else{
      this.editcolab = {id_colaborador: this.colabId,
        colaborador_nombre: this.colabNombre ,
        colaborador_usuario: this.colaborador_usuario,
        id_estado: Number(this.selectEstadoColab.code),
        id_oficiona: Number(this.selectFilial.code), 
        colaborador_password: this.editPassword}
    }
    
    if(this.flag != undefined){
      this.flag.forEach(element => {
        this.rolescolab.push({id_colaborador: this.colabId, id_departamento: element})
      });
    }
  
    //editar usuario
    this.tecnologiaService.editColab(this.editcolab).subscribe(respEdit => {
      if(respEdit.put){
        //Eliminar roles
        if(this.flag != undefined){
          this.tecnologiaService.eliminarRol(this.colabId).subscribe(respDelete => {
            if(respDelete.delete){
              //crear nuevos roles de usuarios 
              if(this.rolescolab.length != 0 || this.rolescolab == undefined){
                this.rolescolab.forEach(element => {
                  this.tecnologiaService.rolColab(element).subscribe(respCreate => {
                  })
                });
              }
              this.cancel()
                this.messageService.add({severity:'success', summary: 'Completado', detail: 'Se ha editado el colaborador conexito'});
              
            }else{
              this.messageService.add({severity:'error', summary: 'Error', detail: respDelete.msg});
            }
          })
        }else{
          this.cancel()
                this.messageService.add({severity:'success', summary: 'Completado', detail: 'Se ha editado el colaborador conexito'});
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Existe un colaborador con ese nombre de usuario'});
      }
    })

  }

  roledit(){
    if(this.cambio == 0){
      this.flag = this.selectedValues
    }
    if(this.desplegarBoton == "pi pi-chevron-circle-down"){
      this.desplegarBoton = "pi pi-chevron-circle-up"
      this.editarroles = true
    }else{
      this.desplegarBoton = "pi pi-chevron-circle-down"
      this.editarroles = false
    }
    
  }

}
