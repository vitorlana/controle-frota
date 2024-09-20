import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RippleModule,
    NgOptimizedImage
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    console.log('Login submitted', { email: this.email, password: this.password, rememberMe: this.rememberMe });

    // Simulate login
    if (this.email === 'test@example.com' && this.password === 'password') {
      console.log('Login successful');
      window.location.href = '/home';
    } else {
      window.location.href = '/home';
      console.log('Login failed');
    }    
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  onCreateAccount() {
    console.log('Create account clicked');
  }
}