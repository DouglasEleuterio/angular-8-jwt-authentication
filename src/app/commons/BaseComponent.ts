import {FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {ViewChild} from '@angular/core';

export abstract class BaseComponent {

  @ViewChild('closebutton', {static: false}) closebutton;

  page = event;
  count: number;

  form: FormGroup;
  notifier: NotifierService;
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }

  handlePageChange(event) {
    this.page = event;
    this.carregarEntidades();
  }

  abstract carregarEntidades();
}
