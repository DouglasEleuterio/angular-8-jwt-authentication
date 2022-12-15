import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {TipoDescarteComponent} from './tipo-descarte/tipo-descarte.component';
import {FormaPagamentoComponent} from './forma-pagamento/forma-pagamento.component';
import {TransportadorComponent} from './transportador/transportador.component';
import {VeiculoComponent} from './veiculo/veiculo.component';
import {GeradorComponent} from './gerador/gerador.component';
import {CtrComponent} from './ctr/ctr.component';
import {PainelFinanceiroComponent} from './painel-financeiro/painel-financeiro.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {CtrListComponent} from './ctr/ctr-list/ctr-list.component';
import {MotoristaComponent} from './motorista/motorista.component';
import {ComboComponent} from './combo/combo.component';
import {ComboHistoricoComponent} from './combo-historico/combo-historico.component';
import {AquisicaoComponent} from "./aquisicao/aquisicao.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'tipo-descarte', component: TipoDescarteComponent },
  { path: 'forma-pagamento', component: FormaPagamentoComponent },
  { path: 'transportador', component: TransportadorComponent },
  { path: 'veiculo', component: VeiculoComponent },
  { path: 'gerador', component: GeradorComponent },
  { path: 'ctr', component: CtrComponent },
  { path: 'listar-ctr', component: CtrListComponent },
  { path: 'motorista', component: MotoristaComponent },
  { path: 'combo', component: ComboComponent },
  { path: 'aquisicao', component: AquisicaoComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'combo-historico/:comboId', component: ComboHistoricoComponent },
  { path: 'painel-financeiro', component: PainelFinanceiroComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
