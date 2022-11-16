import {VeiculoModel} from './veiculo-model';
import {TransportadorModel} from './transportador-model';
import {GeradorModel} from './gerador-model';
import {DestinatarioModel} from './destinatario-model';
import {PagamentoModel} from "./pagamento-model";

export class CtrModel {
  veiculo: VeiculoModel;
  transportador: TransportadorModel;
  gerador: GeradorModel;
  destinatario: DestinatarioModel;
  pagamentos: PagamentoModel[];
}
