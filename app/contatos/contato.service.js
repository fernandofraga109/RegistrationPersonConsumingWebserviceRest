"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.contatosUrl = 'app/contatos';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    getContatos() {
        return this.http.get('http://localhost:8081/WebServiceRest/rest/service/todasPessoas').toPromise();
    }
    create(contato) {
        console.log(contato);
        let jsonEnvia = JSON.stringify(contato);
        console.log(jsonEnvia);
        let options = new http_2.RequestOptions({ headers: this.headers });
        return this.http.post('http://localhost:8081/WebServiceRest/rest/service/cadastrar', contato, options).toPromise();
    }
    update(contato) {
        return this.http.put('http://localhost:8081/WebServiceRest/rest/service/alterar', contato).toPromise();
    }
    delete(id) {
        console.log(id, "contato");
        return this.http.delete('http://localhost:8081/WebServiceRest/rest/service/excluir/' + id).toPromise();
    }
    handleError(error) {
        console.log('Error: ', error);
        return Promise.reject(error.message || error);
    }
    getContato(id) {
        return this.http.get('http://localhost:8081/WebServiceRest/rest/service/getPessoa/' + id).toPromise();
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map