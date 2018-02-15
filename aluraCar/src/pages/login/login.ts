import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../domain/usuario/usuario-service'

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	public email: string = 'joao@alura.com.br';
	public senha: string = 'alura123';

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _service: UsuarioService,
		private _alertCtrl: AlertController) {}

	realizarLogin() {

		this._service
			.realizarLogin(this.email, this.senha)
			.then(usuario => {
				this.navCtrl.setRoot(HomePage)
			})
			.catch(() => {
				this._alertCtrl.create({
					title: 'Problemas no Login',
					subTitle: 'Email ou senha incorretos. Verifique!',
					buttons: [{ text: 'Ok' }]
				}).present();
			});
	}
}
