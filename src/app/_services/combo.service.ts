import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {ComboModel} from '../model/combo-model';
import {HttpClient} from '@angular/common/http';

const COMBO_RESOURCE = 'combo';

@Injectable({
  providedIn: 'root'
})
export class ComboService extends BaseService<ComboModel> {

  comboModel: ComboModel;

  constructor(http: HttpClient) {
    super(http);
    this.comboModel = new ComboModel();
  }

  getResource(): string {
    return COMBO_RESOURCE;
  }
}
