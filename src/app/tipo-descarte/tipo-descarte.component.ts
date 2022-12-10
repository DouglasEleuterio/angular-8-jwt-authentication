import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoDescarteService} from '../_services/tipo-descarte.service';
import { FormGroup, FormControl } from '@angular/forms';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {Customer} from '../model/Customer';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-tipo-descarte',
  templateUrl: './tipo-descarte.component.html',
  styleUrls: ['./tipo-descarte.component.css']
})
export class TipoDescarteComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  entities: TipoDescarteModel[];
  form: FormGroup;
  tipoDescarteExcluir: TipoDescarteModel ;
  private readonly notifier: NotifierService;
  isEdicao = false;


  constructor(private tipoDescarteService: TipoDescarteService,
              notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit() {
    this.createForm(new TipoDescarteModel());
    this.obtemValor();
  }

  tipoDescarteAexcluir(tipo: TipoDescarteModel): void {
    this.tipoDescarteExcluir = tipo;
  }

  excluirTipoDescarte(): void {
    this.tipoDescarteService.delete(this.tipoDescarteExcluir).subscribe(
      data =>  {
        this.closebutton.nativeElement.click();
        this.notifier.notify('success', 'Tipo Descarte: ' + this.tipoDescarteExcluir.nome + ' excluido!');
        this.obtemValor();
      },
      error => {
        this.closebutton.nativeElement.click();
        this.notifier.notify('error', error.error.message);
      }
    );
  }

  createForm(model: TipoDescarteModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      valor: new FormControl(model.valor),
      ativo: new FormControl(model.ativo)
    });
  }

  editar(entity: TipoDescarteModel): void {
    this.isEdicao = true;
    this.createForm(entity);
  }

  onSubmit() {
    this.tipoDescarteService.save(this.form).subscribe(
      data => {
        if (this.isEdicao) {
          this.notifier.notify('warning', 'Tipo de Descarte: ' + this.form.value.nome + ' Alterado' );
        } else {
          this.notifier.notify('success', 'Tipo de Descarte: ' + this.form.value.nome + ' Cadastrado' );
        }
        this.createForm(new TipoDescarteModel());
        this.obtemValor();
        this.isEdicao = false;
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  obtemValor() {
    this.tipoDescarteService.get().subscribe(
      data => {
        this.entities = data;
      }, err => {});
  }

  situacao(status: boolean): any {
    if (status === true) {
      return 'Ativo';
    } else {
      return 'Inativo';
    }
  }

  alterarSituacao(entity: TipoDescarteModel) {
    this.form.value.id = entity.id;
    this.form.value.ativo = (!entity.ativo);
    this.form.value.nome = entity.nome;
    this.form.value.valor = entity.valor;
    this.tipoDescarteService.save(this.form).subscribe(
      data => {
        this.notifier.notify('warning', 'Tipo de Descarte: ' + entity.nome + ' Alterado' );
        this.obtemValor();
      }, err => {
        this.notifier.notify('error', err.error.message );
      });
  }
}
