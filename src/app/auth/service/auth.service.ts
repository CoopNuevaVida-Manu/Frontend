import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Usuario } from '../../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { UserCryp } from '../../interfaces/userCryp.interface';
import { CrypPass } from '../../interfaces/crypPass.interface'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private urlPeticion: string = environment.urlPeticion;

  userPass : UserCryp = {
    id : 0,
    password : ''
  }  
  
  constructor(private http: HttpClient) { 
  }

  login(usuario: Usuario):Observable<Login>{
    return this.http.post<Login>(`${this.urlPeticion}/login`, usuario,{
    });
  }

  getdepartamentos():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.urlPeticion}/departamento`)
  }

  actualizarPass(pass: string):Observable<CrypPass>{
    this.userPass.id = Number(localStorage.getItem('token'))
    this.userPass.password = pass

    return this.http.put<CrypPass>(`${this.urlPeticion}/login`, this.userPass)
  }
  


  
}
