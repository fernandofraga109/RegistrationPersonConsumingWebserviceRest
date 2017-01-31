import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit {

    contato: Contato;
    private isNew: boolean = true;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.contato = new Contato(-9, '', '');

        // extrai o parâmetro da rota
        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];

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

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }

    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }

    onSubmit(): void {
        let promise;

        if (this.isNew) {
            console.log('Cadastrar contato');
            console.log(this.contato, "contato");
            promise = this.contatoService.create(this.contato);
        } else {
            console.log('Alterar contato');
            promise = this.contatoService.update(this.contato);
        }

        promise.then(contato => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }

}
