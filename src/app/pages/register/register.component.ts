import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:8080/auth/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Conta criada!');
        this.router.navigate(['/login']);
      },
      error: () => alert('Erro ao cadastrar')
    });
  }
}