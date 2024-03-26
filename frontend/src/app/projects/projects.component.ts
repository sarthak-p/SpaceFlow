import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  team_number: number = 0;
  projects: { name: string, desc: string, active: boolean, id: number}[] = [];

  teamId: string = "";

  constructor(private route: ActivatedRoute) {
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['id'];
    });
  }

}
