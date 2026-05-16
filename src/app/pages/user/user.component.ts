import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserService } from './user.service';
import { User } from './user.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';

@Component({
    standalone: true,
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        PasswordModule,
        SelectModule,
        ToastModule,
        ConfirmDialogModule,
        TagModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class UserComponent implements OnInit {

    registros: User[] = [];

    registro: User = this.novoRegistro();

    registroDialog = false;

    submitted = false;

    roles = [
        { label: 'Administrador', value: 'ROLE_ADMIN' },
        { label: 'Usuário', value: 'ROLE_USER' },
        { label: 'Consulta', value: 'ROLE_CONSULTA' }
    ];

    constructor(
        private service: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.listar();
    }

    listar(): void {

        this.service.listar().subscribe({
            next: (res) => {
                this.registros = res;
            }
        });
    }

    abrirNovo(): void {

        this.registro = this.novoRegistro();

        this.submitted = false;

        this.registroDialog = true;
    }

    editar(registro: User): void {

        this.registro = { ...registro };

        this.registro.password = '';

        this.registroDialog = true;
    }

    salvar(): void {

        this.submitted = true;

        if (!this.registro.username?.trim()) {
            return;
        }

        if (!this.registro.id && !this.registro.password) {
            return;
        }

        if (this.registro.id) {

            this.service.atualizar(this.registro).subscribe({
                next: () => {

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Usuário atualizado'
                    });

                    this.listar();

                    this.registroDialog = false;
                }
            });

        } else {

            this.service.salvar(this.registro).subscribe({
                next: () => {

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Usuário salvo'
                    });

                    this.listar();

                    this.registroDialog = false;
                }
            });
        }
    }

    deletar(registro: User): void {

        this.confirmationService.confirm({
            message: `Deseja remover o usuário ${registro.username}?`,
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {

                this.service.deletar(registro.id!).subscribe({

                    next: () => {

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Usuário removido'
                        });

                        this.listar();
                    }
                });
            }
        });
    }

    esconderDialog(): void {
        this.registroDialog = false;
    }

    novoRegistro(): User {

        return {
            username: '',
            password: '',
            role: 'ROLE_USER'
        };
    }
}