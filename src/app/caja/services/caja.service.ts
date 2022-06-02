import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { Observable } from 'rxjs';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { message } from '../../interfaces/AlertMessage.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { Colaborador } from '../../interfaces/colaboradores.interface';
import { diligenciaNoAfiliado } from '../../interfaces/Diligencia_No_Afiliado.interface';
import { sinComprobante } from '../../interfaces/RTE_Sin_Comprobante.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { Afiliado } from 'src/app/interfaces/Afiliado.interface';
import { cuentasAfiliado } from '../../interfaces/AfiliadoCuentas.interface';

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

  getNoAfiliado(identidad: string):Observable<NoAfiliado[]>{
    return this.http.get<NoAfiliado[]>(`${this.urlPeticion}/no_afiliado/${identidad}`);
  }

  getParentesco():Observable<Parentesco[]>{
    return this.http.get<Parentesco[]>(`${this.urlPeticion}/parentesco`)
  }

  FilialLogueado(idcolab : number):Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(`${this.urlPeticion}/colaborador/${idcolab}`)
  }

  getFilial():Observable<Filial[]>{
    return this.http.get<Filial[]>(`${this.urlPeticion}/filial`)
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

  postDiligenciaNoAfiliado(diligencia : diligenciaNoAfiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/diligencias_no_afiliados`, diligencia)
  }

  postNoAfiliado(noAfiliado : NoAfiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/no_afiliado`, noAfiliado)
  }

  postRET( rte : sinComprobante):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/transacciones_sin_comprobantes`,rte)
  }

  getAfiliadoPSQL(id: string):Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.urlPeticion}/Afiliado/PSQL/${id}`)
  }

  postAfiliadoPSQL(afiliado: Afiliado):Observable<message>{
    return this.http.post<message>(`${this.urlPeticion}/Afiliado`, afiliado)
  }

}
