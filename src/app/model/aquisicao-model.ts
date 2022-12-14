import {BaseModel} from "./base-model";
import {ComboModel} from "./combo-model";
import {FormaPagamentoModel} from "./FormaPagamentoModel";

export class AquisicaoModel extends BaseModel {
  combo: ComboModel = new ComboModel();
  formaPagamento: FormaPagamentoModel = new FormaPagamentoModel();
  quantidadeAdquirida: number;
  dataPagamento: Date;
  valorPago: number;
  desconto: number;
  ativo: boolean;
}
