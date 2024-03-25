import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  constructor(private authService: AuthService) { }

  onLogin(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (user) => {
          console.log(user); // Handle successful login
        },
        error: (error) => {
          console.error(error); // Handle login error
        }
      });
  }
}
