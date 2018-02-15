import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';

@Component({
    selector: 'page-agendamentos',
    templateUrl: 'agendamentos.html',
})
export class AgendamentosPage {

    public agendamentos: Agendamento[];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private _alertCtrl: AlertController,
        private _dao: AgendamentoDao,
        private _service: AgendamentoService
    ) {
        
        this._dao
            .listar()
            .then(agendamentos => this.agendamentos = agendamentos);
    }

    reenviar(agendamento: Agendamento) {
        
        this._service
            .reagendar(agendamento)
            .then(confirmado => {

                if (confirmado) {

                    this._alertCtrl.create({
                        title: 'Envio',
                        subTitle: 'Agendamento reenviado com sucesso!',
                        buttons: [{ text: 'Ok' }]
                    }).present();
                } else {
                    this._alertCtrl.create({
                        title: 'Envio',
                        subTitle: 'Não foi possível enviar, tente novamente mais tarde!!',
                        buttons: [{ text: 'Ok' }]
                    }).present();
                }
            });
    }
}
