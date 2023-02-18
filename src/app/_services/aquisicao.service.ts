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

  aquisicaoModel: AquisicaoModel;

  constructor(http: HttpClient) {
    super(http);
    this.aquisicaoModel = new AquisicaoModel();
  }

  getSpecifiedPathWithId(id: string): Observable<any> {
    return super.getSpecifiedPathWithId(AQUISICAO_RESOURCE, '/combo/', id);
  }

  save(entity): Observable<any> {
     entity.ativo = true;
     return super.save(entity, AQUISICAO_RESOURCE);
  }

  getResource(): string {
    return AQUISICAO_RESOURCE;
  }

}
