import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {HttpClient} from '@angular/common/http';
import {MotoristaModel} from '../model/motorista-model';
import {Observable} from 'rxjs';

const MOTORISTA_RESOURCE = 'motorista';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService extends BaseService<GeradorModel> {

  motorista: MotoristaModel;

  constructor(http: HttpClient) {
    super(http);
    this.motorista = new MotoristaModel();
  }

  get(): Observable<any> {
    return super.get(MOTORISTA_RESOURCE);
  }

  save(motorista): Observable<any> {
    return super.save({
      id: motorista.id,
      nome: motorista.nome,
      telefone: motorista.telefone,
      cnh: motorista.cnh
    }, MOTORISTA_RESOURCE);
  }
}
