import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ChangeDetectorRef } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { Especie } from './especie.model';
import { EspecieService } from './especie.service';
import { BaseCrudComponent } from '../../layout/diretivas/baseCrudComponent';


@Component({
    standalone: true,
    selector: 'app-especie',
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ToastModule,
        ConfirmDialogModule
    ],
    templateUrl: './especie.component.html',
    styleUrls: ['./especie.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class EspecieComponent extends BaseCrudComponent<Especie> {

    constructor(
        private service: EspecieService,
        messageService: MessageService,
        confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef
    ) {
        super(messageService, confirmationService);
    }

    

    override listar(): void {

        this.loading = true;

        this.service.listar()
            .pipe(
                finalize(() => this.loading = false)
            )
            .subscribe({
                next: (response) => {

                    this.registros = response;

                    this.loading = false;
                    this.cdr.detectChanges();
                },
            error: () => {

                this.loading = false;
                this.cdr.detectChanges();

                this.erro('Erro ao listar espécies');
            }
        });
    }

    override salvarRegistro(): void {

        if (!this.registro) {
            return;
        }

        this.service.salvar(this.registro).subscribe({
            next: () => {

                this.sucesso('Espécie salva com sucesso');

                this.registroDialog = false;

                this.listar();
            },
            error: () => {
                this.erro('Erro ao salvar espécie');
            }
        });
    }

    override excluirRegistro(id: number): void {

        this.service.excluir(id).subscribe({
            next: () => {

                this.sucesso('Espécie removida');

                this.listar();
            },
            error: () => {
                this.erro('Erro ao excluir espécie');
            }
        });
    }

    override novoRegistro(): Especie {

        return {
            descricao: ''
        };
    }
}