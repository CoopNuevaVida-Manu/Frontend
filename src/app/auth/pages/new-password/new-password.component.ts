import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent  {

  NewPass: string = '';
  ConfPass: string= '';


  constructor(private router: Router,) { }

  nuevaPass(){
    console.log('Entro');
    if(this.ConfPass === this.NewPass){
      this.router.navigate(['/caja/noafiliado-sincomprobantes'])
    }
  }

}
