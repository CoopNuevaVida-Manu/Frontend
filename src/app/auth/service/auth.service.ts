import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlPeticion: string = environment.urlPeticion;

  
  constructor(private http: HttpClient) { }

  login(usuario: Usuario):Observable<any>{
    return this.http.post<Usuario>(`${this.urlPeticion}/login`, usuario);
  }
  
}
