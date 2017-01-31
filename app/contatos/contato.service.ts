import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';


import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService {

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}


    getContatos(): Promise<Response> {
        return this.http.get('http://localhost:8081/WebServiceRest/rest/service/todasPessoas').toPromise();

    }

    create(contato: Contato): Promise<Response> {
        console.log(contato);
        let jsonEnvia : string = JSON.stringify(contato);
        console.log(jsonEnvia);
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post('http://localhost:8081/WebServiceRest/rest/service/cadastrar',contato,options).toPromise();
    }

    update(contato: Contato): Promise<Response> {
        return this.http.put('http://localhost:8081/WebServiceRest/rest/service/alterar', contato).toPromise();
    }

    delete(id: number): Promise<Response> {
        console.log(id,"contato");
        return this.http.delete('http://localhost:8081/WebServiceRest/rest/service/excluir/'+id).toPromise();

    }

    private handleError(error: any): Promise<any> {
        console.log('Error: ', error);
        return Promise.reject(error.message || error);
    }

    getContato(id: number): Promise<Response> {
        return this.http.get('http://localhost:8081/WebServiceRest/rest/service/getPessoa/'+id).toPromise();
    }

   /* getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 6000);
        }).then(() => this.getContatos());
    }*/
}
