import {FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {OnInit, ViewChild} from '@angular/core';
import {Params} from '../model/params';

export abstract class BaseComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  count: number;
  page: number;
  entities: any[];
  currentPage: number;
  protected params = {};
  filterGroup: any;
  service: any;

  form: FormGroup;
  notifier: NotifierService;
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(notifier?: NotifierService, service?: any) {
    this.notifier = notifier;
    this.service = service;
  }

  ngOnInit() {
    this.criarFormSearch();
    this.obtemValor();
  }

  obtemValor(params?: any) {
    if (params !== undefined) {
      Object.getOwnPropertyNames(params).forEach((key) => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          params[key] = null;
        }
      });
    }
    this.getService().getWithParams(params).subscribe(
      data => {
        this.entities = data.content;
        this.count = data.totalElements;
        this.currentPage = data.number + 1;
      }, err => {
        console.log(err);
      });
  }

  situacao(status: boolean): any {
    if (status === true) {
      return 'Ativo';
    } else {
      return 'Inativo';
    }
  }

  nomeTabela(): string {
    return '';
  }

  handlePageChange(event): void {
    const paramsObj = this.getSearchParams(event);
    let paramsTxt = this.convertObjToTxtParams(paramsObj, event);
    paramsTxt = paramsTxt.substring(0, paramsTxt.length - 1);
    this.service.getWithParams(paramsTxt).subscribe(data2 => {
      this.entities = data2.content;
      this.count = data2.totalElements;
      this.currentPage = data2.number + 1;
    });
  }

  private convertObjToTxtParams(searchParams, pageNumber): string {
    let searchString = `page=${pageNumber.page === undefined ? 0 : pageNumber.page - 1}&search=`;
    let countParam = 0;
    for (const [key, value] of Object.entries(searchParams)) {
      countParam++;
      if (value !== undefined && value !== null && value !== '') {
        if (key !== 'ativo') {
          searchString += `${key}==%${value}%;`;
        } else {
          searchString += `${key}==${value};`;
        }
      } else {
        searchString += `${key}!=null;`;
      }
    }
    return searchString;
  }

  getParams(event): Params {
    this.params = {page: event};
    return this.params as Params;
  }

  limparSearch() {
    this.criarFormSearch();
    this.obtemValor();
  }

  criarFormSearch() {
    this.filterGroup = this.getFilters();
  }

  carregarEntidades(event?: any) {
    this.obtemValor(this.getFilters(event));
  }

  getService(): any {
    return this.service;
  }

  getFilters(event?: any): any {
  }

  abstract getSearchParams(event): any;
}
