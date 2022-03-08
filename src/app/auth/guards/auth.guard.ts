import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authServices : AuthService, 
    private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authServices.verificaAutenticacion()
      .pipe(
        tap( estarAutenticado => {
          if( !estarAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{
      return this.authServices.verificaAutenticacion()
      .pipe(
        tap( estarAutenticado => {
          if( !estarAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }
}
