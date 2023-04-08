import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './BaseService';
import {PagamentoModel} from '../model/pagamento-model';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

const PAGAMENTO_RESOURCE = 'pagamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends BaseService<PagamentoModel> {

  constructor(http: HttpClient) {
    super(http);
  }

/*  save(pagamento): Observable<any> {
    this.http.post(environment.apiUrl + PAGAMENTO_RESOURCE, {
      id: pagamento.value.id,
      dataPagamento: pagamento.value.dataPagamento,
      valor: pagamento.value.valor,
      formaPagamento: pagamento.value.formaPagamento,
    });
  }

  cancelarPagamento(pagamento): Observable<any> {
    this.http.patch(environment.apiUrl + PAGAMENTO_RESOURCE + pagamento.id, {}, httpOptions);
  }*/

  getResource(): string {
    return PAGAMENTO_RESOURCE;
  }

  public getOrderData(): Observable<any> {
    return this.http.get<PagamentoModel>(environment.apiUrl + this.getResource() + '?sort=dataPagamento,desc');
  }

  update(entity, resource): Observable<any> {
    return this.http.put(environment.apiUrl + resource + '/' + entity.id, entity, this.httpOptions);
  }
}
