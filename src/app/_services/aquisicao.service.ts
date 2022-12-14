import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {AquisicaoModel} from '../model/aquisicao-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const AQUISICAO_RESOURCE = 'aquisicao';

@Injectable({
  providedIn: 'root'
})
export class AquisicaoService extends BaseService<AquisicaoModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  getSpecifiedPathWithId(id: string): Observable<any> {
    return super.getSpecifiedPathWithId(AQUISICAO_RESOURCE, '/combo-id/', id);
  }

}
