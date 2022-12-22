import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransportadorModel} from '../model/transportador-model';
import {VeiculoModel} from '../model/veiculo-model';
import {BaseService} from './BaseService';

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

  save(veiculo): Observable<any> {
    return super.save(  {
      id: veiculo.id,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      placa: veiculo.placa,
      transportador: veiculo.transportador
    }, VEICULO_RESOURCE);
  }

  get(params: any): Observable<any> {
    return super.getWithParams(VEICULO_RESOURCE, params);
  }

  delete(id: string): Observable<any> {
    return super.delete(id, VEICULO_RESOURCE);
  }
}
