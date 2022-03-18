import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolColabDep } from '../../interfaces/colaborador_departamento.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http : HttpClient) { }

  private urlPeticion: string = environment.urlPeticion;

  getColabDepID(id: number): Observable<RolColabDep[]>{
    return this.http.get<RolColabDep[]>(`${this.urlPeticion}/colaborador_departamento/${id}`)
  }
}
