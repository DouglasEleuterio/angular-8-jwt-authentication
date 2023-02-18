import {TipoDescarteModel} from './tipo-descarte-model';
import {TransportadorModel} from './transportador-model';
import {PagamentoModel} from './pagamento-model';

export class ComboModel {
  id: string;
  tipoDescarte = new TipoDescarteModel();
  transportador = new TransportadorModel();
  saldo = 0;
  ativo: boolean;
  pagamentos: PagamentoModel[] = [new PagamentoModel()];
}
