import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {TransportadorModel} from '../model/transportador-model';
import {VeiculoService} from '../_services/veiculo.service';
import {VeiculoModel} from '../model/veiculo-model';
import {NotifierService} from 'angular-notifier';
import {TransportadorService} from '../_services/transportador.service';
import {BaseComponent} from '../commons/BaseComponent';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent extends BaseComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  form: FormGroup;
  veiculo = new  VeiculoModel();
  transportadores: TransportadorModel[];
  transportador = new TransportadorModel();
  isEdicao: boolean;
  transportadorSelecionado: TransportadorModel;
  veiculoExcluir = new VeiculoModel();
  placa: any;
  modelo: any;
  page: any;
  filterSearch = {modelo: undefined, placa: undefined, ativo: undefined, transportador: {id: undefined}, page: 0};

  constructor(private veiculoService: VeiculoService,
              private formBuilder: FormBuilder,
              notifier: NotifierService, private transportadorService: TransportadorService) {
    super(notifier, veiculoService);
  }

  ngOnInit() {
    this.createForm(new VeiculoModel());
    this.carregarTransportadores();
    this.obtemValor();
    this.criarFormSearch();
  }

  criarFormSearch() {
    this.filterGroup = this.formBuilder.group({
      modelo: ['', null],
      placa: ['', null],
      ativo: ['', null],
      transportador: ['', null]
    });
  }

  onSubmit() {
    this.veiculo.transportador = this.transportadorSelecionado;
    this.veiculo = this.form.value;
    this.veiculoService.save(this.veiculo).subscribe(
      data => {
        this.notifier.notify('success', 'Veículo: ' + data.modelo + ' cadastrado!');
        this.obtemValor();
        this.createForm(new VeiculoModel());
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
  }

  createForm(model: VeiculoModel) {
    this.form = this.formBuilder.group({
      id: [model.id, null],
      marca: [model.marca, [ Validators.required ] ],
      modelo: [model.modelo, [ Validators.required ] ],
      placa: [model.placa, [ Validators.required ] ],
      ativo: [model.ativo, [ Validators.required ] ],
      transportador: [model.transportador, [ Validators.required ] ]
    });
  }

  limpar() {
    this.createForm(new VeiculoModel());
  }

  carregarTransportadores() {
    this.transportadorService.findListWithRsql('search=ativo==true').subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  editar(entity: VeiculoModel): void {
    this.createForm({...entity});
  }

  prepararExclusao(entity: VeiculoModel) {
    this.veiculoExcluir = entity;
    this.veiculoExcluir.ativo = false;
    this.veiculoExcluir.id = entity.id;
  }

  excluir() {
    this.veiculoService.inativar(this.veiculoExcluir).subscribe(
      data => {
        this.closebutton.nativeElement.click();
        this.notifier.notify('success', 'Transportadora: ' + this.transportador.nome + ' desativada!' );
        window.location.reload();
      }, err => {});
  }

  carregarEntidades(event?: any) {
    super.handlePageChange(0);
  }

  // carregarEntidades(event?: any) {
  //   this.filterSearch = this.filterGroup.value;
  //   let search = 'search=modelo!=null;placa!=null;ativo!=null;transportador.id!=null';
  //   if (this.filterSearch.modeloFilter) {
  //     search = search.replace('modelo!=null', `modelo==*${this.filterSearch.modeloFilter}`);
  //   }
  //   if (this.filterSearch.placaFilter) {
  //     search = search.replace('placa!=null', `placa==${this.filterSearch.placaFilter}`);
  //   }
  //   if (this.filterSearch.ativo !== undefined && this.filterSearch.ativo !== null && this.filterSearch.ativo !== '') {
  //     search = search.replace('ativo!=null', `ativo==${this.filterSearch.ativo}`);
  //   }
  //   if (this.filterSearch.transportador.id) {
  //     search = search.replace('transportador.id!=null', `transportador.id==${this.filterSearch.transportador.id}`);
  //   }
  //   this.veiculoService.getWithParams(search).subscribe( data => {
  //     this.entities = data.content;
  //   });
  // }

  getService(): any {
    return this.veiculoService;
  }

  getSearchParams(event): any {
    this.filterSearch = this.filterGroup.value;
    return this.filterSearch;
  }

}
