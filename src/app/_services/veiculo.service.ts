import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransportadorModel} from '../model/transportador-model';
import {VeiculoModel} from '../model/veiculo-model';
import {BaseService} from './BaseService';
import {environment} from '../../environments/environment.prod';


const VEICULO_RESOURCE = 'veiculo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VeiculoService extends BaseService<VeiculoModel> {

  transportador: TransportadorModel;

  constructor(http: HttpClient) {
   super(http);
   this.transportador = new TransportadorModel();
  }

  save(entity): Observable<any> {
    if (entity.id) {
      return this.update(entity);
    }
    return this.http.post( environment.apiUrl + this.getResource(), entity, this.httpOptions);
  }

  getResource(): string {
    return VEICULO_RESOURCE;
  }
}
