import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import { MenuTab } from '../../interfaces/menutab.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})




export class MenuComponent implements OnInit {

  avatarUsuario: string = localStorage.getItem('user') || ""

  despartamento: string = 'Dep segun URL'

  listdep: string[] = []
  

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private router: Router) { 
                this.authService.getdepartamentos().subscribe( respdep =>{
                  this.menuService.getColabDepID(Number(localStorage.getItem('token'))).subscribe( respcolab =>{
                    respdep.forEach(elementdep => {
                      respcolab.forEach(elementcolab => {
                        if(elementcolab.id_departamento == elementdep.id_departamento){
                          this.listdep.push(elementdep.departamento)
                        }
                      });
                    });
                  })
                })


     }
     hola(){
       console.log('Entro freson')
     }

     departamentoactual(dep : string){
      if(dep == 'Caja'){
        this.router.navigate(['caja/']);
      }else if (dep == 'Contabilidad'){
        this.router.navigate(['contabilidad/']);
      }else if(dep == 'Atención al Afiliado'){
        this.router.navigate(['atencion-cliente/']);
      }else if(dep == 'Informática'){
        this.router.navigate(['TI/']);
      }else if(dep == 'Cumplimiento'){
        this.router.navigate(['cumplimiento/']);
      }
    }

     logOut(){
      localStorage.clear();
      this.router.navigate(['./auth'])
    }


  ngOnInit(): void {
    if (this.router.url.includes('Menu')) {
      this.despartamento = 'Menu'
    }else if (this.router.url.includes('caja')) {
      this.despartamento = 'Caja'
    }else if (this.router.url.includes('contabilidad')) {
      this.despartamento = 'Contabilidad'
    }else if (this.router.url.includes('atencion-cliente')) {
      this.despartamento = 'atencion-cliente'
    }else if (this.router.url.includes('TI')) {
      this.despartamento = 'TI'
    }else if (this.router.url.includes('cumplimiento')) {
      this.despartamento = 'Cumplimiento'
    }
  }

}
