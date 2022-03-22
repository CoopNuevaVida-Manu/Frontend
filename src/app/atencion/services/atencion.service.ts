import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Firma } from '../../interfaces/firmas.interface';


@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  constructor(private http : HttpClient) { }

  urlPeticion: string = environment.urlPeticion

  getParentesco():Observable<Parentesco[]>{
    return this.http.get<Parentesco[]>(`${this.urlPeticion}/parentesco`)
  }

  getFirmas():Observable<Firma[]>{
    return this.http.get<Firma[]>(`${this.urlPeticion}/parentesco`)
  }
}
