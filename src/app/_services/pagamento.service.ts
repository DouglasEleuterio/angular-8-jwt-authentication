import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const PAGAMENTO_RESOURCE = '/pagamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient) { }

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
}
