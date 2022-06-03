import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { environment } from 'src/environments/environment';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { Destino } from '../../interfaces/destino.interface';
import { chequesTerceros } from '../../interfaces/Cheques_terceros.interface';
import { message } from '../../interfaces/AlertMessage.interface';
import { Firma } from 'src/app/interfaces/firmas.interface';
import { Afiliado } from 'src/app/interfaces/Afiliado.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  constructor(private http: HttpClient) { }

  urlPeticion: string = environment.urlPeticion;

  getParentesco():Observable<Parentesco[]>{
    return this.http.get<Parentesco[]>(`${this.urlPeticion}/parentesco`)
  }

  getOrigenFondos():Observable<origenFondos[]>{
    return this.http.get<origenFondos[]>(`${this.urlPeticion}/origen_fondos`)
  }

  getDestino():Observable<Destino[]>{
    return this.http.get<Destino[]>(`${this.urlPeticion}/destino`)
  }

  getFirmas():Observable<Firma[]>{
    return this.http.get<Firma[]>(`${this.urlPeticion}/firma`)
  }

  postChequesTerceros(chequeTerceros : chequesTerceros): Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/cheques_terceros`, chequeTerceros)
  }

  getColaboradorCli(idSuc: string, idCli: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/Cli/${idSuc}/${idCli}`)
  }

  getAfiliadoID(id: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/${id}`)
  }

  postAfiliadoPSQL(afiliado: Afiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/Afiliado`, afiliado)
  }

  getAfiliadoPSQL(id: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/PSQL/${id}`)
  }

  postNoAfiliado(noAfiliado : NoAfiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/no_afiliado`, noAfiliado)
  }
  
}
