import { Component } from '@angular/core';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {
  options: string[] = ["Option 1", "Option 2", "Option 3"];
  entries: string[] = [];

  onDropdownChange(value: string) {
    if (value) {
      this.entries.push(value);
      this.updateOptions();
    }
  }

  removeEntry(entry: string) {
    const index = this.entries.indexOf(entry);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.updateOptions();
    }
  }

  updateOptions() {
    this.options = ["Option 1", "Option 2", "Option 3"].filter(option => !this.entries.includes(option));
  }

}
