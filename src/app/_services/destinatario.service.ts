import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {DestinatarioModel} from '../model/destinatario-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const DESTINATARIO_RESOURCE = 'destinatario';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService extends BaseService<GeradorModel> {

  destinatario: DestinatarioModel;

  constructor(http: HttpClient) {
    super(http);
    this.destinatario = new DestinatarioModel();
  }

  get(): Observable<any> {
    return super.get(DESTINATARIO_RESOURCE);
  }

}
