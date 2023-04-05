import {FormaPagamentoModel} from './FormaPagamentoModel';
import {CtrModel} from './ctr-model';
import {InstituicaoBancariaModel} from './instituicaobancaria-model';
import {FormBuilder} from '@angular/forms';
import {ComboModel} from './combo-model';

export class PagamentoModel {

  id: string;
  dataPagamento: Date;
  valor: number;
  formaPagamento: FormaPagamentoModel;
  ativo: boolean;
  ctr: CtrModel;
  combo: ComboModel;

  instituicaoBancaria: InstituicaoBancariaModel;
}
