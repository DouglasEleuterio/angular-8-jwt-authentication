import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoDescarteModel} from '../model/tipo-descarte-model';

// const AUTH_API = 'https://aterrosystem.herokuapp.com/api/';
const AUTH_API = 'http://localhost:8080/api/';
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
    return this.http.post(AUTH_API + DESCARTE_RESOURCE, {
      id: tipoDescarte.value.id,
      nome: tipoDescarte.value.nome,
      valor: tipoDescarte.value.valor
    }, httpOptions);
  }

  get(): Observable<any> {
    return  this.http.get<TipoDescarteModel>(AUTH_API + DESCARTE_RESOURCE + '/all', {});
  }

  delete(tipoDescarte): Observable<any> {
    return this.http.delete(AUTH_API + DESCARTE_RESOURCE + '/' + tipoDescarte.id);
  }
}
