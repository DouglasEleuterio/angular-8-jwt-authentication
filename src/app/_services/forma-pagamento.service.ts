import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import { environment } from '../../environments/environment.prod';
import {BaseService} from './BaseService';
import {TipoDescarteModel} from '../model/tipo-descarte-model';

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
    if (formaPagamento.id) {
      return this.http.put(environment.apiUrl +
        FORMA_PAGAMENTO_RESOURCE + '/' +
        formaPagamento.id, formaPagamento, httpOptions);
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

  getAtivos(params?: any): Observable<any> {
    return super.findListWithRsql('search=ativo==true');
  }

  getResource(): string {
    return FORMA_PAGAMENTO_RESOURCE;
  }
}
