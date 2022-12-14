import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

export class BaseService<T> {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(resource: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + resource + '/all', {});
  }

  find(resource: string, id: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + resource + '/' + id,  {});
  }

  save(entity, resource): Observable<any> {
    return this.http.post(environment.apiUrl + resource, entity, this.httpOptions);
  }

  delete(id: string, resource): Observable<any> {
    return this.http.delete(environment.apiUrl + resource + '/' + id);
  }

  getSpecifiedPath(resource: string, path: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + resource + path, {});
  }

  getSpecifiedPathWithId(resource: string, path: string, id: string): Observable<any> {
    return this.http.get<T>(environment.apiUrl + resource + path + id, {});
  }

}
