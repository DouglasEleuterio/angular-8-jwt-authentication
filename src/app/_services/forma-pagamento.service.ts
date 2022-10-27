import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {TipoDescarteModel} from "../model/tipo-descarte-model";
import {FormaPagamentoModel} from "../model/FormaPagamentoModel";

// const AUTH_API = 'https://aterrosystem.herokuapp.com/api/';
const AUTH_API = 'http://localhost:8080/api/';
const FORMA_PAGAMENTO_RESOURCE = 'forma-pagamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  constructor(private http: HttpClient) { }

  save(formaPagamento): Observable<any> {
    return this.http.post(AUTH_API + FORMA_PAGAMENTO_RESOURCE, {
      nome: formaPagamento.value.nome
    }, httpOptions);
  }

  get(): Observable<any> {
      return this.http.get<FormaPagamentoModel>(AUTH_API + FORMA_PAGAMENTO_RESOURCE + '/all', {});
  }
}
