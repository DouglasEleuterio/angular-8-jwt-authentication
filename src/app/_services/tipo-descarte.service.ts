import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {environment} from '../../environments/environment.prod';
import {BaseService} from './BaseService';

const DESCARTE_RESOURCE = 'tipo-descarte';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TipoDescarteService extends BaseService<TipoDescarteModel> {

  constructor(http: HttpClient) {
    super(http);
  }

save(tipoDescarte): Observable<any> {
    if (tipoDescarte.value.ativo === null) {
      tipoDescarte.value.ativo = true;
    }
    if (tipoDescarte.value.id) {
      return this.http.put(environment.apiUrl + DESCARTE_RESOURCE + '/' + tipoDescarte.value.id  , tipoDescarte.value, httpOptions);
    }
    return this.http.post(environment.apiUrl + DESCARTE_RESOURCE, tipoDescarte.value, httpOptions);
  }

  getAtivo(): Observable<any> {
    return  this.http.get<TipoDescarteModel>(environment.apiUrl + DESCARTE_RESOURCE , {});
  }

  delete(tipoDescarte): Observable<any> {
    return this.http.delete(environment.apiUrl + DESCARTE_RESOURCE + '/' + tipoDescarte.id);
  }

  getResource(): string {
    return DESCARTE_RESOURCE;
  }
}
