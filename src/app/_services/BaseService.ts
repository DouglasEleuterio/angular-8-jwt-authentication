import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

export abstract class BaseService<T> {

  constructor(protected http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(): Observable<any> {
    return this.http.get<T>(environment.apiUrl + this.getResource());
  }

  getWithParams(params: any): Observable<any> {
    return this.http.get<T>(environment.apiUrl + this.getResource() + '?' + params );
  }

  findListWithRsql(rsql?: any): Observable<any> {
    return this.http.get<T>(environment.apiUrl + this.getResource() + '/find-list?' + rsql );
  }

  find(resource: string, id: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + this.getResource() + '/' + id,  {});
  }

  save(entity, resource): Observable<any> {
    if (entity.id && (entity.ativo === undefined || entity.ativo === null)) {
      entity.ativo = true;
      return this.update(entity);
    }
    return this.http.post(environment.apiUrl + this.getResource(), entity, this.httpOptions);
  }

  update(entity): Observable<any> {
    return this.http.put(environment.apiUrl + this.getResource() + '/' + entity.id, entity, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + this.getResource() + '/' + id);
  }

  inativar(entity): Observable<any> {
    entity.ativo = false;
    return this.update(entity);
  }

  getSpecifiedPath(resource: string, path: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + this.getResource() + path, {});
  }

  getSpecifiedPathWithId(resource: string, path: string, id: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + this.getResource() + path + id, {});
  }

  abstract getResource(): string;

}
