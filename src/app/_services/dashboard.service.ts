import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const DASHBOARD_RESOURCE = 'dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  getAcumuladoMensal(): Observable<any> {
    return super.getSpecifiedPath(DASHBOARD_RESOURCE , '/acumulado-mensal');
  }
}
