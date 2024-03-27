import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-user-overlay',
  templateUrl: './add-user-overlay.component.html',
  styleUrls: ['./add-user-overlay.component.css']
})
export class AddUserOverlayComponent {

  @Output() close = new EventEmitter<void>();

  onSubmit() {
    // Implement form submission logic here
    console.log('Form submitted');
  }

  closeOverlay() {
    // Implement overlay close logic here
  }

  onClose() {
    this.close.emit();
  }
}
