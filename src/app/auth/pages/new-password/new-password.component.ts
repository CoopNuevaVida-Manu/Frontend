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
    const dep = Number(localStorage.getItem('dep'));
    if(this.ConfPass === this.NewPass){

      this.authServices.actualizarPass(this.ConfPass).subscribe(resp => {
        if(resp.cryp){
          this.messageService.add({severity:'success', summary: 'Actualización Exitosa'});
          this.router.navigate(['Menu/Menu']);
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail : resp.msg});  
        }
      })
      this.messageService.add({severity:'error', summary: 'Error', detail : 'Las contraseñas no son iguales, por favor intentelo de nuevo'});
    }
  }

}
