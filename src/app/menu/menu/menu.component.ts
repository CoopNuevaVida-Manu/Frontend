import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  caja: boolean = false;
  contabilidad: boolean = false;
  atencion: boolean = false;
  cumplimiento: boolean = false;
  TI: boolean = false;

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private router: Router) { 
    

    this.menuService.getColabDepID(Number(localStorage.getItem('token'))).subscribe(resp => {
      this.authService.getdepartamentos().subscribe(dep => {
        if(resp.length == 1){
          dep.forEach(element => {
            if(resp[0].id_departamento == element.id_departamento && element.departamento == 'Caja'){
              this.router.navigate(['caja/']);
            } else if(resp[0].id_departamento == element.id_departamento && element.departamento == 'Contabilidad'){
              this.router.navigate(['contabilidad/']);
            } else if(resp[0].id_departamento == element.id_departamento && element.departamento == 'Atención al Afiliado'){
              this.router.navigate(['atencion-cliente/']);
            }else if(resp[0].id_departamento == element.id_departamento && element.departamento == 'Cumplimiento'){
              this.router.navigate(['cumplimiento/']);
            }else if(resp[0].id_departamento == element.id_departamento && element.departamento == 'Informática'){
              this.router.navigate(['TI/']);
            }
          });
        }else{
          resp.forEach(elementColab => {
            dep.forEach(elementDep => {
              if(elementColab.id_departamento == elementDep.id_departamento && elementDep.departamento == 'Caja'){
                this.caja = true
              }else if(elementColab.id_departamento == elementDep.id_departamento && elementDep.departamento == 'Contabilidad'){
                this.contabilidad = true
              }else if(elementColab.id_departamento == elementDep.id_departamento && elementDep.departamento == 'Atención al Afiliado'){
                this.atencion = true
              }else if(elementColab.id_departamento == elementDep.id_departamento && elementDep.departamento == 'Cumplimiento'){
                this.cumplimiento = true
              }else if(elementColab.id_departamento == elementDep.id_departamento && elementDep.departamento == 'Informática'){
                this.TI = true
              }
              
            });
          });
        }
      })
    });
  }


  

  ngOnInit(): void {
  }

}
