import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { dd_no_afiliado } from '../../interfaces/DD_NoAfiliados.interface';
import { Parentesco } from 'src/app/interfaces/parentesco.interface';
import { origenFondos } from 'src/app/interfaces/origenFondos.interface';
import { Destino } from 'src/app/interfaces/destino.interface';
import { Colaborador } from '../../interfaces/colaboradores.interface';
import { transaccion } from 'src/app/interfaces/transaccion.interface';
import { razonOperacion } from 'src/app/interfaces/razonOperacion.interface';
import { NoAfiliado } from 'src/app/interfaces/No_Afiliado.interface';
import { Filial } from 'src/app/interfaces/filial.interface';
import { sinComprobante } from '../../interfaces/RTE_Sin_Comprobante.interface';
import { chequesTerceros } from '../../interfaces/Cheques_terceros.interface';
import { EstadoAfiliado } from 'src/app/interfaces/EstadoAfiliado.interface';
import { rteCumplimiento } from '../../interfaces/CumplimientoRTE.interface';
import { ddCumplimiento } from '../../interfaces/CumplimientoDD.interface';
import { cumplimientoCT } from '../../interfaces/CumplimientoCT.interface';
import { cumplimientoFT } from 'src/app/interfaces/CumplimientoFT.interface';

@Injectable({
  providedIn: 'root'
})
export class CumplimientoService {

  constructor(private http : HttpClient) { }

  urlPeticion: string = environment.urlPeticion

  getParentesco():Observable<Parentesco[]>{
    return this.http.get<Parentesco[]>(`${this.urlPeticion}/parentesco`)
  }

  getOrigenFondos():Observable<origenFondos[]>{
    return this.http.get<origenFondos[]>(`${this.urlPeticion}/origen_fondos`)
  }

  getDestino():Observable<Destino[]>{
    return this.http.get<Destino[]>(`${this.urlPeticion}/destino`)
  }

  getAllColab():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(`${this.urlPeticion}/colaborador/All`)
  }

  gettransacciones():Observable<transaccion[]>{
    return this.http.get<transaccion[]>(`${this.urlPeticion}/transaccion`)
  } 
  
  getRazonOperacion():Observable<razonOperacion[]>{
    return this.http.get<razonOperacion[]>(`${this.urlPeticion}/razon_operacion`)
  }

  getFilial():Observable<Filial[]>{
    return this.http.get<Filial[]>(`${this.urlPeticion}/filial`)
  }

  getEstadoAfiliado():Observable<EstadoAfiliado[]>{
    return this.http.get<EstadoAfiliado[]>(`${this.urlPeticion}/afiliado_estado`)
  }
  
  getNoAfiliado():Observable<NoAfiliado[]>{
    return this.http.get<NoAfiliado[]>(`${this.urlPeticion}/no_afiliado`);
  }
  getDDNoafiliados():Observable<dd_no_afiliado[]>{
    return this.http.get<dd_no_afiliado[]>(`${this.urlPeticion}/diligencias_no_afiliados`)
  }

  getRTE_SinComprobante():Observable<sinComprobante[]>{
    return this.http.get<sinComprobante[]>(`${this.urlPeticion}/transacciones_sin_comprobantes`)
  }

  getChequesTerceros():Observable<chequesTerceros[]>{
    return this.http.get<chequesTerceros[]>(`${this.urlPeticion}/cheques_terceros`)
  }

  //Cumplimiento Nuevo
  getTSC():Observable<rteCumplimiento[]>{
    return this.http.get<rteCumplimiento[]>(`${this.urlPeticion}/Cumplimiento/TSC`)
  }

  getDD():Observable<ddCumplimiento[]>{
    return this.http.get<ddCumplimiento[]>(`${this.urlPeticion}/Cumplimiento/DD`)
  }

  getCT():Observable<cumplimientoCT[]>{
    return this.http.get<cumplimientoCT[]>(`${this.urlPeticion}/Cumplimiento/CT`)
  }

  getFT():Observable<cumplimientoFT[]>{
    return this.http.get<cumplimientoFT[]>(`${this.urlPeticion}/Cumplimiento/FT`)
  }

  //Dowland ecxel
  getDowland(){
    return this.http.get(`${this.urlPeticion}/Export/TSC`)
  }

}
