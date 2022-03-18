import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { Observable } from 'rxjs';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private urlPeticion : string = environment.urlPeticion;
  constructor(private http :HttpClient) { }

  gettransacciones():Observable<transaccion[]>{
    return this.http.get<transaccion[]>(`${this.urlPeticion}/transaccion`)
  } 

  getOrigenFondos():Observable<origenFondos[]>{
    return this.http.get<origenFondos[]>(`${this.urlPeticion}/origen_fondos`)
  }

  getRazonOperacion():Observable<razonOperacion[]>{
    return this.http.get<razonOperacion[]>(`${this.urlPeticion}/razon_operacion`)
  }
}