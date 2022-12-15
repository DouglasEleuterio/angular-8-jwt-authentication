import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TipoDescarteComponent } from './tipo-descarte/tipo-descarte.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { TransportadorComponent } from './transportador/transportador.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { GeradorComponent } from './gerador/gerador.component';
import { CtrComponent } from './ctr/ctr.component';
import { PainelFinanceiroComponent } from './painel-financeiro/painel-financeiro.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CtrListComponent } from './ctr/ctr-list/ctr-list.component';
import { NumeroCtrPipe } from './_utils/numero-ctr.pipe';
import {registerLocaleData} from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MotoristaComponent } from './motorista/motorista.component';
import { ComboComponent } from './combo/combo.component';
import { ComboHistoricoComponent } from './combo-historico/combo-historico.component';
import {NgbAlertModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { AquisicaoComponent } from './aquisicao/aquisicao.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 7000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    ProfileComponent,
    TipoDescarteComponent,
    FormaPagamentoComponent,
    PagamentoComponent,
    TransportadorComponent,
    VeiculoComponent,
    GeradorComponent,
    CtrComponent,
    PainelFinanceiroComponent,
    InvoiceComponent,
    CtrListComponent,
    NumeroCtrPipe,
    MotoristaComponent,
    ComboComponent,
    ComboHistoricoComponent,
    AquisicaoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    authInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
