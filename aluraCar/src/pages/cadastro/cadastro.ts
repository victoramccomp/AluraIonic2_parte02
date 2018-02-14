import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';


@Component({
	selector: 'page-cadastro',
	templateUrl: 'cadastro.html',
})
export class CadastroPage {
	
	public carro: Carro;
	public precoTotal: number;
	public agendamento: Agendamento;
	private _alerta: Alert;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _service: AgendamentoService,
		private _alertCtrl: AlertController) {

		this.carro = this.navParams.get('carro');
		this.precoTotal = this.navParams.get('precoTotal');
		
		this.agendamento = new Agendamento(this.carro, this.precoTotal)

		this._alerta = this._alertCtrl.create({
			title: 'Aviso',
			buttons: [{ text: 'Ok', handler: () => { this.navCtrl.setRoot(HomePage) } }]
		});
	}

	agendar() {

		if(!this.agendamento.nome || !this.agendamento.data || !this.agendamento.email || !this.agendamento.endereco) {

			this._alertCtrl.create({
				title: 'Preenchimento obrigatório',
				subTitle: 'Todos os campos devem ser preenchidos',
				buttons: [{ text: 'OK' }]
			}).present();

			return;
		}

		this._service
			.agendar(this.agendamento)
			.then(confirmado => {
				confirmado ? 
					this._alerta.setSubTitle('Agendamento realizado com sucesso!') :
					this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
				this._alerta.present();
			})
			.catch(error => { 
				this._alerta.setSubTitle(error.message);
				this._alerta.present();
			});
	}
}	
