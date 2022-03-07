import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

import {MessageService} from 'primeng/api';
import { Departamento } from 'src/app/interfaces/departamento.interface';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  providers: [MessageService]
})
export class NewPasswordComponent  {

  NewPass: string = '';
  ConfPass: string= '';

  listaDepartamentos: Departamento[] = [];

  constructor(private router: Router,
              private authServices : AuthService,
              private messageService: MessageService) {
                this.authServices.getdepartamentos().subscribe(list =>{ this.listaDepartamentos = list})
               }

  nuevaPass(){
    console.log('Entro');
    const dep = Number(localStorage.getItem('dep'));
    if(this.ConfPass === this.NewPass){
      this.authServices.actualizarPass(this.ConfPass).subscribe(resp => {
        if(resp.cryp){
          this.messageService.add({severity:'success', summary: 'Actualización Exitosa'});
          this.listaDepartamentos.forEach(element => {
            if(element.departamento == "Caja" && element.id_departamento == dep ){

            }else if(element.departamento == "Contabilidad" && dep ){

            }else if(element.departamento =="Atención al Afiliado" && dep ){

            }else if(element.departamento == "Informática" && dep ){
              console.log('Informatica')
            }
          });
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail : resp.msg});  
        }
      })
      //this.router.navigate(['/caja/noafiliado-sincomprobantes'])
    }
  }

}
