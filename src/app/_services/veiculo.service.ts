import { Injectable } from '@angular/core';
import {EnderecoModel} from '../model/endereco-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
// import {environment} from '../../environments/environment';
import {TransportadorModel} from '../model/transportador-model';
import {VeiculoModel} from "../model/veiculo-model";

const VEICULO_RESOURCE = 'veiculo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  transportador: TransportadorModel;

  constructor(private http: HttpClient) {
    this.transportador = new TransportadorModel();
  }

  save(veiculo): Observable<any> {
    return this.http.post(environment.apiUrl + VEICULO_RESOURCE, {
      id: veiculo.id,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      placa: veiculo.placa,
      transportador: veiculo.transportador
    }, httpOptions);
  }

  get(): Observable<any> {
    return this.http.get<TransportadorModel>(environment.apiUrl + VEICULO_RESOURCE + '/all', {});
  }

  delete(veiculo: VeiculoModel): Observable<any> {
    return this.http.delete(environment.apiUrl + VEICULO_RESOURCE + '/' + veiculo.id);
  }
}
