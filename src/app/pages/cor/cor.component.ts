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
import { SelectModule } from 'primeng/select';

import { ChangeDetectorRef } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { BaseCrudComponent } from '../../layout/diretivas/baseCrudComponent';

import { Cor } from './cor.model';
import { CorService } from './cor.service';

import { Especie } from '../especie/especie.model';
import { EspecieService } from '../especie/especie.service';


@Component({
  standalone: true,
  selector: 'app-cor',
   imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ToastModule,
        ConfirmDialogModule,
        SelectModule
    ],
  templateUrl: './cor.component.html',
  styleUrl: './cor.component.css',
  providers: [MessageService, ConfirmationService]
})
export class CorComponent extends BaseCrudComponent<Cor> {

  especies: Especie[] = [];

  constructor(
          private service: CorService,
          private especieService: EspecieService,
          messageService: MessageService,
          confirmationService: ConfirmationService,
          private cdr: ChangeDetectorRef
      ) {
          super(messageService, confirmationService);
      }

    override ngOnInit(): void {

      this.listar();

      this.carregarEspecies();
    }

    carregarEspecies(): void {

        this.especieService.listar().subscribe({
            next: (response) => {
                this.especies = response;
            }
        });
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

                this.erro('Erro ao listar Cores');
            }
        });
    }

    override salvarRegistro(): void {

        if (!this.registro) {
            return;
        }

        this.service.salvar(this.registro).subscribe({
            next: () => {

                this.sucesso('Cor salva com sucesso');

                this.registroDialog = false;

                this.listar();
            },
            error: () => {
                this.erro('Erro ao salvar Cor');
            }
        });
    }

    override excluirRegistro(id: number): void {

        this.service.excluir(id).subscribe({
            next: () => {

                this.sucesso('Cor removida');

                this.listar();
            },
            error: () => {
                this.erro('Erro ao excluir Cor');
            }
        });
    }

    override novoRegistro(): Cor {

        return {
            descricao: ''
        };
    }
}
