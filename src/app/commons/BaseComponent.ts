import {FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {ViewChild} from '@angular/core';
import {Params} from '../model/params';

export abstract class BaseComponent {

  @ViewChild('closebutton', {static: false}) closebutton;

  count: number;
  page: number;
  entities: any[];
  currentPage: number;
  protected params = {};
  filterGroup: any;

  form: FormGroup;
  notifier: NotifierService;
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }

  obtemValor(params?: any) {
    if (params !== undefined) {
      Object.getOwnPropertyNames(params).forEach((key) => {
        if (params[key] === undefined) {
          params[key] = null;
        }
      });
    }
    this.getService().getWithParams(params).subscribe(
      data => {
        this.entities = data.content;
        this.count = data.totalElements;
        this.currentPage = data.pageable.pageNumber + 1;
      }, err => {
        console.log(err);
      });
  }

  handlePageChange(event) {
    this.carregarEntidades(event);
  }

  getParams(event): Params {
    this.params = {page: event};
    return this.params as Params;
  }

  abstract carregarEntidades(event);
  abstract getService(): any;
}
