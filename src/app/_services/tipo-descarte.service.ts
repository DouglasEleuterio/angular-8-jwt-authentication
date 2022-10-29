import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {environment} from '../../environments/environment.prod';
// import {environment} from '../../environments/environment';

const DESCARTE_RESOURCE = 'tipo-descarte';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TipoDescarteService {

  constructor(private http: HttpClient) { }

save(tipoDescarte): Observable<any> {
    return this.http.post(environment.apiUrl + DESCARTE_RESOURCE, {
      id: tipoDescarte.value.id,
      nome: tipoDescarte.value.nome,
      valor: tipoDescarte.value.valor
    }, httpOptions);
  }

  get(): Observable<any> {
    return  this.http.get<TipoDescarteModel>(environment.apiUrl + DESCARTE_RESOURCE + '/all', {});
  }

  delete(tipoDescarte): Observable<any> {
    return this.http.delete(environment.apiUrl + DESCARTE_RESOURCE + '/' + tipoDescarte.id);
  }
}
