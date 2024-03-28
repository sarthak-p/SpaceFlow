import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-user-overlay',
  templateUrl: './add-user-overlay.component.html',
  styleUrls: ['./add-user-overlay.component.css']
})
export class AddUserOverlayComponent {

   user = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  credentials: {
    username: '', 
    password: '',
  },
  isAdmin: false, 
};
  
  constructor(
  private userService: UserService,
  private authService: AuthService 
  ) { }
  
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<void>();


  onSubmit() {
  this.authService.getSelectedCompanyId().subscribe(companyId => {
    if (companyId) {
      const submission = {
        profile: this.user.profile,
        credentials: this.user.credentials,
        isAdmin: this.user.isAdmin
      };
      console.log('Submission data:', submission);
      this.userService.addUserToCompany(companyId, submission).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          this.onClose(); 
          this.userAdded.emit();
        },
        error: (error) => console.error('Error adding user:', error)
      });
    } else {
      console.error('Company ID is missing');
    }
  });
}

  onClose() {
    this.close.emit();
  }
}
