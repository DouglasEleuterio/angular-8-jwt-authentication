import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {HttpClient} from '@angular/common/http';
import {CtrModel} from '../model/ctr-model';
import {Observable} from 'rxjs';

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

  get(): Observable<any> {
    return super.get(CTR_RESOURCE);
  }

  save(ctr): Observable<any> {
    return super.save({
      id: ctr.id,
      veiculo: ctr.veiculo,
      transportador: ctr.transportador,
      gerador: ctr.gerador,
      destinatario: ctr.destinatario,
      pagamentos: ctr.pagamentos
    }, CTR_RESOURCE);
  }
}
