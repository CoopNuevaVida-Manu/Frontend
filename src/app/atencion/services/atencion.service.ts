import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Firma } from '../../interfaces/firmas.interface';
import { firmaTercero } from '../../interfaces/Firmas_Terceros.interface';
import { message } from '../../interfaces/AlertMessage.interface';
import { Afiliado } from 'src/app/interfaces/Afiliado.interface';
import { cuentasAfiliado } from 'src/app/interfaces/AfiliadoCuentas.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';


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
    return this.http.get<Firma[]>(`${this.urlPeticion}/firma`)
  }

  postFirmaAutorizada(firmaAutorizada : firmaTercero):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/firmas_autorizadas_terceros`, firmaAutorizada)
  }

  getAfiliadoID(id: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/${id}`)
  }

  getAfiliadoCli(idSuc: string, idCli: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/Cli/${idSuc}/${idCli}`)
  }

  getCuentasAfiliado(idSuc: string, idCli: string):Observable<cuentasAfiliado[]>{
    return this.http.get<cuentasAfiliado[]>(`${this.urlPeticion}/Afiliado/cuenta/${idSuc}/${idCli}`)
  }

  getAfiliadoPSQL(id: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/PSQL/${id}`)
  }

  postAfiliadoPSQL(afiliado: Afiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/Afiliado`, afiliado)
  }

  postNoAfiliado(noAfiliado : NoAfiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/no_afiliado`, noAfiliado)
  }
}
