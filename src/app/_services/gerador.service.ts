import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const GERADOR_RESOURCE = 'gerador';

@Injectable({
  providedIn: 'root'
})
export class GeradorService extends BaseService<GeradorModel> {

  gerador: GeradorModel;

  constructor(http: HttpClient) {
    super(http);
    this.gerador = new GeradorModel();
  }

    save(gerador): Observable<any> {
      if (gerador.id) {
        return super.update(gerador);
      }
      return super.save(gerador, GERADOR_RESOURCE);
    }

  getResource(): string {
    return GERADOR_RESOURCE;
  }
}
