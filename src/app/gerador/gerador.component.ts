import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../commons/BaseComponent';
import {GeradorService} from '../_services/gerador.service';
import {NotifierService} from 'angular-notifier';
import {GeradorModel} from '../model/gerador-model';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gerador',
  templateUrl: './gerador.component.html',
  styleUrls: ['./gerador.component.css']
})
export class GeradorComponent extends BaseComponent implements OnInit {

  gerador = new GeradorModel();
  fisica: boolean;
  juridica: boolean;
  isEdicao = false;
  entities: GeradorModel[];
  @ViewChild('isFisica', null) isFisica: ElementRef;
  @ViewChild('isJuridica', null) isJuridica: ElementRef;

  constructor(private geradorService: GeradorService,
              notifier: NotifierService,
              private router: Router) {
    super(notifier);
  }

  ngOnInit() {
    this.gerador.ativo = true;
    this.gerador.id = null;
    this.gerador.cpf = null;
    this.createForm(new GeradorModel());
    this.obtemValor();
  }

  createForm(model: GeradorModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      cpf: new FormControl(model.cpf),
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
      email: new FormControl(model.email),
      telefone: new FormControl(model.telefone),
      ativo: new FormControl(model.ativo)
    });
  }

  onSubmit() {
    this.geradorService.save(this.gerador).subscribe(
      data => {
        this.router.navigate(['/geradorAuxiliar']);
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

  getService(): any {
    return this.geradorService;
  }

  editar(entity: GeradorModel): void {
    this.isEdicao = true;
    this.gerador = {...entity};
    this.gerador.id = entity.id;
    if (entity.cpf !== undefined && entity.cpf !== null) {
      this.isFisica.nativeElement.checked = true;
      this.pessoaFisica();
    }
    if (entity.cnpj !== undefined && entity.cnpj !== null) {
      this.isJuridica.nativeElement.checked = true;
      this.pessoaJuridica();
    }
  }
}
