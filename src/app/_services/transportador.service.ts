import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {environment} from '../../environments/environment';
import {environment} from '../../environments/environment.prod';
import {EnderecoModel} from '../model/endereco-model';
import {TransportadorModel} from '../model/transportador-model';
import {BaseService} from "./BaseService";

const TRANSPORTADOR_RESOURCE = 'transportador';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransportadorService extends BaseService<TransportadorModel> {

  endereco: EnderecoModel;

  constructor(http: HttpClient) {
    super(http);
    this.endereco = new EnderecoModel();
  }

  save(transportador): Observable<any> {
    return this.http.post(environment.apiUrl + TRANSPORTADOR_RESOURCE, {
      id: transportador.id,
      nome: transportador.nome,
      razaoSocial: transportador.razaoSocial,
      cnpj: transportador.cnpj,
      endereco: this.endereco,
      telefone: transportador.email,
      email: transportador.telefone
    }, httpOptions);
  }

  get(): Observable<any> {
    return this.http.get<TransportadorModel>(environment.apiUrl + TRANSPORTADOR_RESOURCE + '/all', {});
  }

  getResource(): string {
    return TRANSPORTADOR_RESOURCE;
  }
}
