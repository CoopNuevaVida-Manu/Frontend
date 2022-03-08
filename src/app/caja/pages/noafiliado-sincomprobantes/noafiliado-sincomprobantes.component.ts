import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noafiliado-sincomprobantes',
  templateUrl: './noafiliado-sincomprobantes.component.html',
  styleUrls: ['./noafiliado-sincomprobantes.component.css']
})
export class NoafiliadoSincomprobantesComponent implements OnInit {

  avatarUsuario: string = localStorage.getItem('user') || ""

  constructor(private router : Router) { 
  }


  ngOnInit(): void {
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['./auth'])
  }

}
