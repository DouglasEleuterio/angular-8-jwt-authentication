import {HttpParams} from '@angular/common/http';

export class Params extends HttpParams {
  page: number;
  size: number;
  params = {};
}
