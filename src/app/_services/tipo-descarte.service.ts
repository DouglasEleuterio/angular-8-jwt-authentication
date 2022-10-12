import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const AUTH_API = 'https://aterrosystem.herokuapp.com/api/auth/';
const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TipoDescarteService {

  constructor(private http: HttpClient) { }

save(tipoDescarte): Observable<any> {
    return this.http.post(AUTH_API + 'tipo-descarte', {
      nome: tipoDescarte.value.nome,
      valor: tipoDescarte.value.valor
    }, httpOptions);
  }
}
