import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

  projectId: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }

  options: string[] = ["Active", "Inactive"];

  onDropdownChange(value: string) {
    //
  }
}
