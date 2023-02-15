import {VeiculoModel} from './veiculo-model';
import {TransportadorModel} from './transportador-model';
import {GeradorModel} from './gerador-model';
import {DestinatarioModel} from './destinatario-model';
import {PagamentoModel} from './pagamento-model';
import {TipoDescarteModel} from './tipo-descarte-model';
import {MotoristaModel} from './motorista-model';

export class CtrModel {
  id: string;

  numero: number;
  veiculo: VeiculoModel = new VeiculoModel();
  transportador: TransportadorModel = new TransportadorModel();
  gerador: GeradorModel = new GeradorModel();
  destinatario: DestinatarioModel = new DestinatarioModel();
  tipoDescartes: TipoDescarteModel[] = [];
  pagamentos: PagamentoModel[] = [];
  geracao: Date;
  motorista: MotoristaModel = new MotoristaModel();
}
