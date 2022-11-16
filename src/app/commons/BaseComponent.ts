import {FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {ViewChild} from '@angular/core';

export class BaseComponent {

  @ViewChild('closebutton', {static: false}) closebutton;

  form: FormGroup;
  notifier: NotifierService;

  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }
}
