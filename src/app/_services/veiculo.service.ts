import { Injectable } from '@angular/core';
import {EnderecoModel} from '../model/endereco-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const TRANSPORTADOR_RESOURCE = 'veiculo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  endereco: EnderecoModel;

  constructor(private http: HttpClient) {
    this.endereco = new EnderecoModel();
  }
}
