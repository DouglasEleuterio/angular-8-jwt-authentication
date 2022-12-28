import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import { environment } from '../../environments/environment.prod';
// import { environment } from '../../environments/environment';

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
    return this.http.post(environment.apiUrl + FORMA_PAGAMENTO_RESOURCE, {
      id: formaPagamento.value.id,
      nome: formaPagamento.value.nome,
      ativo: formaPagamento.value.ativo,
    }, httpOptions);
  }

  alteraSituacao(formaPagamento): Observable<any> {
    return this.http.patch(environment.apiUrl + FORMA_PAGAMENTO_RESOURCE + '/' + formaPagamento.id, {
    }, httpOptions);
  }

  get(): Observable<any> {
      return this.http.get<FormaPagamentoModel>(environment.apiUrl + FORMA_PAGAMENTO_RESOURCE + '/all', {});
  }
}
