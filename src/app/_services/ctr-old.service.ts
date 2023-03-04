import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {HttpClient} from '@angular/common/http';
import {CtrModel} from '../model/ctr-model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {ListarCtr} from '../model/params/listar-ctr';

const CTR_RESOURCE = 'ctr/old';

@Injectable({
  providedIn: 'root'
})
export class CtrOldService extends BaseService<GeradorModel> {

  ctrModel: CtrModel;

  constructor(http: HttpClient) {
    super(http);
    this.ctrModel = new CtrModel();
  }

  find(id: string): Observable<any> {
    return super.find(CTR_RESOURCE + '/id', id);
  }

  save(ctr): Observable<any> {
    return this.http.post(environment.apiUrl + CTR_RESOURCE + '/save', ctr, this.httpOptions);
  }

  getWithParams(params?: ListarCtr): Observable<any> {
    let paramsTxt = '';
    if (params === undefined) {
      return this.http.get<GeradorModel>(environment.apiUrl + this.getResource() + '/all?' + params );
    } else {
      if (params.transportadorId) {
        paramsTxt = `transportadoraId=${params.transportadorId}&`;
      }
      if (params.dataDe) {
        paramsTxt += `dataDe=${params.dataDe}&`;
      }
      if (params.dataAte) {
        paramsTxt += `dataAte=${params.dataAte}&`;
      }
      if (params.page) {
        paramsTxt += `page=${params.page}&`;
      }
      if (params.numero) {
        paramsTxt += `numero=${params.numero}&`;
      }
      return this.http.get<GeradorModel>(environment.apiUrl + this.getResource() + '/all?' + paramsTxt );
    }
  }

  getResource(): string {
    return CTR_RESOURCE;
  }
}
