import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service'; 
import { Project } from '../project.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects: Project[] = [];
  

  teamId: string = "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {
    // this.projects = [
    //   {
    //     name: 'Project 1',
    //     desc: 'The description of project 1',
    //     active: true,
    //     id: 1
    //   },
    //   {
    //     name: 'Project 2',
    //     desc: 'The description of project 2',
    //     active: false,
    //     id: 2
    //   }
    // ];
    this.route.params.subscribe(params => {
      console.log('Team ID from route:', params['teamId']);
    }); 
  }

  fetchProjectsByTeamId(): void {
    this.projectService.getProjectsByTeamId(parseInt(this.teamId)).subscribe( // placeholder id here
      (projects: Project[]) => {
        this.projects = projects;
        console.log("LOGGING PROJECTS: ");
        console.log(projects);
      },
      (error: any) => {
          console.error('Error fetching projects from teamId:', error);
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
    });
    this.fetchProjectsByTeamId();

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  trimTeamId(id: string): string {
  if (id.startsWith('1')) {
    return id.substring(1);
  }
  return id;
}

}
