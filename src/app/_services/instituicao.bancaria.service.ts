import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {BaseService} from './BaseService';
import {InstituicaoBancariaModel} from '../model/instituicaobancaria-model';

const INSTITUICAO_BANCARIA_RESOURCE = 'instituicao-bancaria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InstituicaoBancariaService extends BaseService<InstituicaoBancariaModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  alteraSituacao(instituicaoBancaria): Observable<any> {
    return this.http.put(environment.apiUrl + INSTITUICAO_BANCARIA_RESOURCE + '/' + instituicaoBancaria.id, {
    }, httpOptions);
  }

  getAtivos(): Observable<any> {
    return super.findListWithRsql('search=ativo==true');
  }

  getResource(): string {
    return INSTITUICAO_BANCARIA_RESOURCE;
  }

  get(): Observable<any> {
    return this.http.get<InstituicaoBancariaModel>(environment.apiUrl + this.getResource() + '/all');
  }
}
