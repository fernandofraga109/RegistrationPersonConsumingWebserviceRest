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
const contato_model_1 = require("./contato.model");
const contato_service_1 = require("./contato.service");
const dialog_service_1 = require("./../dialog.service");
let ContatosListaComponent = class ContatosListaComponent {
    constructor(contatoService, dialogService) {
        this.contatoService = contatoService;
        this.dialogService = dialogService;
        this.contatos = [];
    }
    /**
     * Carrega a lista de contatos
     */
    ngOnInit() {
        // Chama o serviço que retorna a lista de contatos
        this.contatoService.getContatos().then((res) => {
            let json = res.json();
            //console.log(json[0].codigo);
            let cont = [];
            for (let i = 0; i < json.length; i++) {
                let contato = new contato_model_1.Contato(json[i].codigo, json[i].nome, json[i].sexo);
                cont.push(contato);
            }
            this.contatos = cont;
        }).catch((err) => {
            console.log(err);
        });
        /*json.then((contatos: Contato[]) => {
            this.contatos = contatos;
        }).catch(err => {
            console.log(err);
            this.mostrarMensagem({
                tipo: 'danger',
                texto: 'Ocorreu um erro ao buscar a lista de contatos!'
            });
        });*/
    }
    /**
     * Deleta um contato
     */
    onDelete(contato) {
        console.log(contato, "deletar");
        // Chama o serviço para confirmar a remoção do contato
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + '?')
            .then((canDelete) => {
            if (canDelete) {
                // Se confirmar chama o serviço que deleta o contato
                this.contatoService
                    .delete(contato.codigo)
                    .then(() => {
                    // Remove o contato da lista de contatos
                    this.contatos = this.contatos.filter((c) => c.codigo != contato.codigo);
                    this.mostrarMensagem({
                        tipo: 'success',
                        texto: 'Contato deletado!'
                    });
                    this.ngOnInit();
                }).catch(error => {
                    console.log(error);
                    this.mostrarMensagem({
                        tipo: 'danger',
                        texto: 'Ocorreu um erro ao deletar o contato!'
                    });
                });
            }
        });
    }
    /**
     * Mostra a mensagem e esconde depois de 3 segundos
     */
    mostrarMensagem(mensagem) {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }
        this.currentTimeout = setTimeout(() => {
            this.mensagem = undefined;
        }, 3000);
    }
    /**
     * Monta a classe dinamicamente conforme o tipo passado como argumento
     */
    montarClasses(tipo) {
        /*
            Exemplo de mensagem de sucesso
            {
                'alert': true;
                'alert-success': true,
                'alert-danger': false,
                ...
            }
        */
        this.classesCss = {
            'alert': true
        };
        this.classesCss['alert-' + tipo] = true; // alert-success
    }
};
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contatos-lista',
        templateUrl: 'contatos-lista.component.html'
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        dialog_service_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map