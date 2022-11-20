import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../commons/BaseComponent';
import {GeradorService} from '../_services/gerador.service';
import {NotifierService} from 'angular-notifier';
import {GeradorModel} from '../model/gerador-model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gerador',
  templateUrl: './gerador.component.html',
  styleUrls: ['./gerador.component.css']
})
export class GeradorComponent extends BaseComponent implements OnInit {

  gerador: GeradorModel;
  fisica: boolean;
  juridica: boolean;
  isEdicao = false;
  entities: GeradorModel[];

  constructor(private geradorService: GeradorService, notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.gerador = new GeradorModel();
    this.createForm(new GeradorModel());
    this.obtemValor();
  }

  obtemValor() {
    this.geradorService.get().subscribe(
      data => {
        this.entities = data;
      }, err => {});
  }

  createForm(model: GeradorModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      razaoSocial: new FormControl(model.razaoSocial),
      cnpj: new FormControl(model.cnpj),
      dataEmissao: new FormControl(model.dataEmissao),
      logradouro: new FormControl(model.retirada.logradouro),
      numero: new FormControl(model.retirada.numero),
      complemento: new FormControl(model.retirada.complemento),
      bairro: new FormControl(model.retirada.bairro),
      cidade: new FormControl(model.retirada.cidade),
      estado: new FormControl(model.retirada.estado),
      cep: new FormControl(model.retirada.cep),
      observacao: new FormControl(model.retirada.observacao),
    });
  }

  onSubmit() {
    this.geradorService.save(this.gerador).subscribe(
      data => {
        super.notifier.notify('success', 'Transportadora: ' + data.razaoSocial + ' criada!');
        this.createForm(new GeradorModel());
      }, err => {
        super.notifier.notify('error', err.error.message );
      }
    );
  }

  pessoaFisica() {
    this.juridica = false;
    this.fisica = true;
  }

  pessoaJuridica() {
    this.fisica = false;
    this.juridica = true;
  }

  limpar() {
    this.gerador = new GeradorModel();
  }

}
