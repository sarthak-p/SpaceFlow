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
  errorMessage: string = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
  this.authService.login({ username: this.username, password: this.password })
    .subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigate(['/select-company']); 
      },
      error: (error: any) => { 
        console.error(error); 
        this.errorMessage = 'Invalid username or password.'; 
      }
    });
}
}
