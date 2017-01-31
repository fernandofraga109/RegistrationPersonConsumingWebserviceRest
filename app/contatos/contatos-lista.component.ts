import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';

@Component({
  moduleId: module.id,
  selector: 'contatos-lista',
  templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {

    contatos: Contato[] = [];
    mensagem: {};
    classesCss: {}; 
    private currentTimeout: any;

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService) {}
    
    /**
     * Carrega a lista de contatos
     */
    ngOnInit(): void {
        // Chama o serviço que retorna a lista de contatos
        this.contatoService.getContatos().then((res) => {
        let json = res.json();
        //console.log(json[0].codigo);
        
        let  cont = []; 
        for(let i = 0; i < json.length; i++){
            let contato = new Contato(json[0].codigo, json[i].nome, json[i].sexo);
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
    onDelete(contato: Contato): void {
        // Chama o serviço para confirmar a remoção do contato
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + '?')
            .then((canDelete: boolean) => {
                if (canDelete) {
                    // Se confirmar chama o serviço que deleta o contato
                    this.contatoService
                        .delete(contato.codigo)
                        .then(() => {
                            // Remove o contato da lista de contatos
                            this.contatos = this.contatos.filter((c : Contato) => c.codigo != contato.codigo);

                            this.mostrarMensagem({
                                tipo: 'success',
                                texto: 'Contato deletado!'
                            });                            
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
    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void {
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
    private montarClasses(tipo: string): void {
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

} 