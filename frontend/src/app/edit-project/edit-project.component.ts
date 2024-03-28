import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  selectedProj!: Project;

  name: string = "";
  description: string = "";
  active: boolean = false;
  teamId: string = ""; // Updated from params on init
  projId: string = ""; // Updated from params on init

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  editProj: Project = {
    id: 9999, // Should be ignored by the backend
    name: "Team name not provided",
    description: "Team desc not provided",
    active: false,
    team: null // Should be ignored by the backend
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId']
      console.log("TEAM ID: " + this.teamId);
      this.projId = params['projId'];
      console.log("PROJ ID: " + this.projId);
    });
  }


  options: string[] = ["Inactive", "Active"];

  onDropdownChange(value: string) {
    if (value === "Active") {
      this.active = true;
      console.log("ACTIVE set");
    }
    else {
      this.active = false;
      console.log("INACTIVE set");
    }
  }

  onSubmit() {
    console.log("SUBMIT");
    this.editProj.name = this.name;
    this.editProj.description = this.description;
    this.editProj.active = this.active;
    this.projectService.editProject(parseInt(this.projId), this.editProj); //
  }
}
