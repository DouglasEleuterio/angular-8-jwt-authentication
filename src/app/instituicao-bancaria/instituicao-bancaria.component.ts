import {Component, OnInit} from '@angular/core';
import {InstituicaoBancariaService} from '../_services/instituicao.bancaria.service';
import {NotifierService} from 'angular-notifier';
import {BaseComponent} from '../commons/BaseComponent';
import {InstituicaoBancariaModel} from '../model/instituicaobancaria-model';
import {FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-instituicao-bancaria',
  templateUrl: './instituicao-bancaria.component.html',
  styleUrls: ['./instituicao-bancaria.component.css']
})
export class InstituicaoBancariaComponent extends BaseComponent implements OnInit {

  constructor(private iBancariaService: InstituicaoBancariaService,
              notifier: NotifierService,
              private formBuilder: FormBuilder) {
    super(notifier, iBancariaService);
  }

  instituicaoBancariaModel: InstituicaoBancariaModel;
  protected searchParams = {ativo: undefined};

  ngOnInit() {
    this.instituicaoBancariaModel = new InstituicaoBancariaModel();
    this.createForm(this.instituicaoBancariaModel);
    this.obtemValor();
  }

  createForm(instituicaoBancariaModel: InstituicaoBancariaModel) {
    this.form = this.formBuilder.group({
      id: new FormControl(instituicaoBancariaModel.id),
      nome: new FormControl(instituicaoBancariaModel.nome),
      agencia: new FormControl(instituicaoBancariaModel.agencia),
      conta: new FormControl(instituicaoBancariaModel.conta),
      ativo: new FormControl(instituicaoBancariaModel.ativo),
    });
  }

  onSubmit() {
    this.instituicaoBancariaModel = this.form.value;
    this.iBancariaService.save(this.instituicaoBancariaModel, this.iBancariaService.getResource()).subscribe(
      () => {
        this.notifier.notify('success', 'Instituicção bancária salva!');
        this.obtemValor();
        this.createForm(new InstituicaoBancariaModel());
      }, err => {
        super.notifier.notify('error', err.error.message );
      }
    );
  }

  editar(entity: any) {
    this.createForm(entity);
  }


  getService(): any {
    return this.iBancariaService;
  }

  getSearchParams(event: any) {
    return this.searchParams;
  }
  
  carregarEntidades(event?: any) {
    super.handlePageChange(0);
  }
}
