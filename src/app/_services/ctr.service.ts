import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {HttpClient} from '@angular/common/http';
import {CtrModel} from '../model/ctr-model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

const CTR_RESOURCE = 'ctr';

@Injectable({
  providedIn: 'root'
})
export class CtrService extends BaseService<GeradorModel> {

  ctrModel: CtrModel;

  constructor(http: HttpClient) {
    super(http);
    this.ctrModel = new CtrModel();
  }

  find(id: string): Observable<any> {
    return super.find(CTR_RESOURCE, id);
  }

  save(ctr): Observable<any> {
    return this.http.post(environment.apiUrl + CTR_RESOURCE + '/save', ctr, this.httpOptions);
  }

  getWithParams(params?: any): Observable<any> {
    return this.http.get<GeradorModel>(environment.apiUrl + this.getResource() + '/all-old?' + params );
  }

  getResource(): string {
    return CTR_RESOURCE;
  }
}
