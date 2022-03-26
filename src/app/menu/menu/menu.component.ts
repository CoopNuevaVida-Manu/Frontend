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

  listdep: MenuTab[] = []
  menudesable : boolean = false
  

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private router: Router) { 
                this.authService.getdepartamentos().subscribe( respdep =>{
                  this.menuService.getColabDepID(Number(localStorage.getItem('token'))).subscribe( respcolab =>{
                    respdep.forEach(elementdep => {
                      respcolab.forEach(elementcolab => {
                        if(elementcolab.id_departamento == elementdep.id_departamento){
                          this.listdep.push({ header: elementdep.departamento , content: 'Texto de ejmplo'})
                        }
                      });
                    });
                  })
                })
                this.menudesable = true
                console.log(this.listdep)
     }


     logOut(){
      localStorage.clear();
      this.router.navigate(['./auth'])
    }
  

  ngOnInit(): void {
    
  }

}
