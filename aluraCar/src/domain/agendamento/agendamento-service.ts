import { Http } from '@angular/http';
import { Agendamento } from './agendamento';
import { Injectable } from '@angular/core';
import { AgendamentoDao } from './agendamento-dao';


@Injectable()
export class AgendamentoService {

    constructor(private _http: Http, private _dao: AgendamentoDao) {

    }

    private _montarUri(agendamento: Agendamento) {

        return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    }

    agendar(agendamento: Agendamento) {
        
        let api = this._montarUri(agendamento);

        return this._dao.verificaAgendamentoDuplicado(agendamento)
            .then(existe => {
                if(existe) 
                    throw new Error ('Agendamento já existente!');
                
                return this._http
                    .get(api)
                    .toPromise()
                    .then(() => agendamento.confirmado = true, error => console.log(error))
                    .then(() => this._dao.salvar(agendamento))
                    .then(() => agendamento.confirmado);
            })
    }

    reagendar(agendamento: Agendamento) {

        let api = this._montarUri(agendamento);
        
        return this._http
            .get(api)
            .toPromise()
            .then(() => agendamento.confirmado = true, error => console.log(error))
            .then(() => this._dao.salvar(agendamento))
            .then(() => agendamento.confirmado);
    }
}