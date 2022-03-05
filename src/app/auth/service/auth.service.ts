import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlPeticion: string = environment.urlPeticion;

  
  constructor(private http: HttpClient) { }

  login(usuario: Usuario):Observable<Login>{
    return this.http.post<Login>(`http://localhost:8080/login`, usuario);
  }
  
}
