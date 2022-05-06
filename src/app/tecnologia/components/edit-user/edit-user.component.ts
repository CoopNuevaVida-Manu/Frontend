import { Component, Input, OnInit } from '@angular/core';
import { combobox } from 'src/app/interfaces/combobox.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { TabColab } from 'src/app/interfaces/tablaColab.interface';
import { Usuario } from '../../../interfaces/usuario.interface';
import { Colaborador } from '../../../interfaces/colaboradores.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
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

  editPassword: string = ""

  desplegarBoton : string = "pi pi-chevron-circle-down"
  flag!: number[]

  constructor(private router: Router) { 
   
  }

  ngOnInit(): void {
   
  }

  cancel(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['TI/']);
  }

  save(){
    
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
