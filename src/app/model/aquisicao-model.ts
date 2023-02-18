import {BaseModel} from './base-model';
import {ComboModel} from './combo-model';
import {FormaPagamentoModel} from './FormaPagamentoModel';
import {PagamentoModel} from './pagamento-model';

export class AquisicaoModel extends BaseModel {
  combo = new ComboModel();
  formaPagamento: FormaPagamentoModel = new FormaPagamentoModel();
  quantidadeAdquirida: number;
  dataPagamento: Date;
  valorPago: number;
  desconto = 0;
  ativo: boolean;
  pagamento = new PagamentoModel();
}
