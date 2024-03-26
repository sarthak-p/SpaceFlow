import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  team_number: number = 0;
  projects: { name: string, desc: string, active: boolean, id: number}[] = [];

  constructor() {
    this.projects = [
      {
        name: 'Project 1',
        desc: 'The description of project 1',
        active: true,
        id: 1
      },
      {
        name: 'Project 2',
        desc: 'The description of project 2',
        active: false,
        id: 2
      }
    ];
  }

}
