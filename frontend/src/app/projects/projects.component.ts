import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  teamId: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.fetchProjectsByTeamId();
    });
  }

  fetchProjectsByTeamId(): void {
    if (!this.teamId) {
      console.error("Team ID is missing");
      return;
    }

    this.projectService.getProjectsByTeamId(parseInt(this.teamId)).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        console.log("LOGGING PROJECTS: ", projects);
      },
      (error: any) => {
          console.error('Error fetching projects from teamId:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
