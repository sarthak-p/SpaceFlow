import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createProject(teamId: number, project: Project){
    this.http.post<any>(`http://localhost:8080/projects/${teamId}`, project).subscribe(
      (data) => {
        console.log(data); 
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
}
