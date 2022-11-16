import {FormaPagamentoModel} from './FormaPagamentoModel';

export class PagamentoModel {
  id: string;
  dataPagamento: Date;
  valor: number;
  formaPagamento: FormaPagamentoModel;
  ativo: boolean;
}
