import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioService {

    private _usuarioLogado: Usuario;

    constructor(private _http: Http) {}

    public realizarLogin(email: string, senha: string) {

        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;

        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
                this._usuarioLogado = usuario;
                return usuario;
            });
    }

    public obterUsuarioLogado() {
        
        return this._usuarioLogado;
    }
}