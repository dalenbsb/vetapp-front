import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  email = '';

  constructor(private http: HttpClient) {}

  recover() {
    this.http.post('http://localhost:8080/auth/forgot-password', {
      email: this.email
    }).subscribe({
      next: () => alert('Email enviado!'),
      error: () => alert('Erro ao enviar')
    });
  }
}