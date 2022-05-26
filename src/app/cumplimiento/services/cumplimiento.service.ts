import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { dd_no_afiliado } from '../../interfaces/DD_NoAfiliados.interface';

@Injectable({
  providedIn: 'root'
})
export class CumplimientoService {

  constructor(private http : HttpClient) { }

  urlPeticion: string = environment.urlPeticion

  getDDNoafiliados():Observable<dd_no_afiliado[]>{
    return this.http.get<dd_no_afiliado[]>(`${this.urlPeticion}/diligencias_no_afiliados`)
  }
}
