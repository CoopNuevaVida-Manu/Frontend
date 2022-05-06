import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Colaborador } from '../../interfaces/colaboradores.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { ColabEstado } from '../../interfaces/ColabEstado.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  
  private urlPeticion : string = environment.urlPeticion;

  constructor(private http : HttpClient) { }

  getcolaboradoresActivos():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(`${this.urlPeticion}/colaborador`)
  }

  getcolaboradoresInactivos():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(`${this.urlPeticion}/colaborador/inactivo`)
  }

  getcolaboradoresID(id: number):Observable<Colaborador>{
    return this.http.get<Colaborador>(`${this.urlPeticion}/colaborador/${id}`)
  }

  getFilial():Observable<Filial[]>{
    return this.http.get<Filial[]>(`${this.urlPeticion}/filial`)
  }

  getFilialID(id:number):Observable<Filial>{
    return this.http.get<Filial>(`${this.urlPeticion}/filial/${id}`)
  }

  getEstadoColab():Observable<ColabEstado[]>{
    return this.http.get<ColabEstado[]>(`${this.urlPeticion}/colaborador_estado`)
  }

  getEstadoColabID(id:number):Observable<ColabEstado>{
    return this.http.get<ColabEstado>(`${this.urlPeticion}/colaborador_estado/${id}`)
  }
  getDepartamentos():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.urlPeticion}/departamento`)
  }

  postNewColab(colaborador : Colaborador, departamentos : number[]){
    return this.http.post(`${this.urlPeticion}/`)
  }
  
}
