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
const contato_model_1 = require("./contato.model");
const contato_service_1 = require("./contato.service");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
let ContatoDetalheComponent = class ContatoDetalheComponent {
    constructor(contatoService, route, location) {
        this.contatoService = contatoService;
        this.route = route;
        this.location = location;
        this.isNew = true;
    }
    ngOnInit() {
        this.contato = new contato_model_1.Contato(-9, '', '');
        // extrai o parâmetro da rota
        this.route.params.forEach((params) => {
            let id = +params['id'];
            if (id) {
                this.isNew = false;
                console.log(id, "ID DO CARA");
                this.contatoService.getContato(id).then((res) => {
                    let json = res.json();
                    console.log(json, "aqui");
                    this.contato = json;
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    getFormGroupClass(isValid, isPristine) {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }
    getFormControlClass(isValid, isPristine) {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }
    onSubmit() {
        let promise;
        if (this.isNew) {
            console.log('Cadastrar contato');
            console.log(this.contato, "contato");
            promise = this.contatoService.create(this.contato);
        }
        else {
            console.log('Alterar contato');
            promise = this.contatoService.update(this.contato);
        }
        promise.then(contato => this.goBack());
    }
    goBack() {
        this.location.back();
    }
};
ContatoDetalheComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-detalhe',
        templateUrl: 'contato-detalhe.component.html'
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.ActivatedRoute,
        common_1.Location])
], ContatoDetalheComponent);
exports.ContatoDetalheComponent = ContatoDetalheComponent;
//# sourceMappingURL=contato-detalhe.component.js.map