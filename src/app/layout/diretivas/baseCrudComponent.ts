import { Directive, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Directive()
export abstract class BaseCrudComponent<T> implements OnInit {

    registros: T[] = [];

    registroDialog = false;

    loading = false;

    registro: T | null = null;

    constructor(
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.listar();
    }

    abstract listar(): void;

    abstract salvarRegistro(): void;

    abstract excluirRegistro(id: number): void;

    abstract novoRegistro(): T;

    novo(): void {

        this.registro = this.novoRegistro();

        this.registroDialog = true;
    }

    editar(registro: T): void {

        this.registro = {
            ...registro
        };

        this.registroDialog = true;
    }

    salvar(): void {
        this.salvarRegistro();
    }

    excluir(
        registro: any,
        descricaoCampo: string = 'descricao'
    ): void {

        this.confirmationService.confirm({

            message: `Deseja excluir ${registro[descricaoCampo]}?`,

            header: 'Confirmação',

            icon: 'pi pi-exclamation-triangle',

            accept: () => {

                this.excluirRegistro(registro.id);
            }
        });
    }

    sucesso(mensagem: string): void {

        this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: mensagem
        });
    }

    erro(mensagem: string): void {

        this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: mensagem
        });
    }

    fecharDialog(): void {
        this.registroDialog = false;
    }
}