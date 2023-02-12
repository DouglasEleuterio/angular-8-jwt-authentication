import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import { environment } from '../../environments/environment.prod';
import {BaseService} from "./BaseService";
import {TipoDescarteModel} from "../model/tipo-descarte-model";
// import { environment } from '../../environments/environment';

const FORMA_PAGAMENTO_RESOURCE = 'forma-pagamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService extends BaseService<TipoDescarteModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  save(formaPagamento): Observable<any> {
    if (formaPagamento.value.id) {
      return this.http.put(environment.apiUrl +
        FORMA_PAGAMENTO_RESOURCE + '/' +
        formaPagamento.value.id, formaPagamento.value, httpOptions);
    }
    return this.http.post(environment.apiUrl + FORMA_PAGAMENTO_RESOURCE, formaPagamento, httpOptions);
  }

  alteraSituacao(formaPagamento): Observable<any> {
    return this.http.patch(environment.apiUrl + FORMA_PAGAMENTO_RESOURCE + '/' + formaPagamento.id, {
    }, httpOptions);
  }

  get(params?: any): Observable<any> {
      return this.http.get<FormaPagamentoModel>(environment.apiUrl + FORMA_PAGAMENTO_RESOURCE + '/all', {params});
  }

  getResource(): string {
    return FORMA_PAGAMENTO_RESOURCE;
  }
}
