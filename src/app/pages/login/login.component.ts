import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

import { AuthService } from '../../core/services/auth.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    CheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';
  loading = false;

  rememberMe = false;
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        //this.auth.saveToken(res.accessToken); //(agora o próprio service já salva via tap())
        this.auth.saveRefreshToken(res.refreshToken);

        if (this.rememberMe) {
          localStorage.setItem('username', this.username);
        } else {
          localStorage.removeItem('username');
        }

        this.router.navigate(['/home']);
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos';
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.username = savedUser;
      this.rememberMe = true;
    }
  }
}