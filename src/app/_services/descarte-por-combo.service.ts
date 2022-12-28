import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {DescartePorComboModel} from '../model/descarte-por-combo-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

const DESCARTE_POR_COMBO_RESOURCE = 'descarte-por-combo';

@Injectable({
  providedIn: 'root'
})
export class DescartePorComboService extends BaseService<DescartePorComboModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  find(id: string): Observable<any> {
    return super.find(DESCARTE_POR_COMBO_RESOURCE + '/combo-id',  id);
  }

  getResource(): string {
    return DESCARTE_POR_COMBO_RESOURCE;
  }
}
