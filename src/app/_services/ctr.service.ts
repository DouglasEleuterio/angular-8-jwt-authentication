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

  find(id: string): Observable<any> {
    return super.find(CTR_RESOURCE, id);
  }

  save(ctr): Observable<any> {
    return super.save({
      id: ctr.id,
      gerador: ctr.gerador,
      veiculo: ctr.veiculo,
      destinatario: ctr.destinatario,
      transportador: ctr.transportador,
      pagamentos: ctr.pagamentos,
      tipoDescarte: ctr.tipoDescarte
    }, CTR_RESOURCE);
  }
}
