import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
<<<<<<< Updated upstream
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
=======
import { UserRegistryComponent } from './user-registry/user-registry.component';
>>>>>>> Stashed changes

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "teams", component: TeamsComponent},
  { path: "create-announcement", component: CreateAnnouncementComponent},
  { path: "create-team", component: CreateTeamComponent},
  { path: 'login', component: LoginComponent },
  { path: 'select-company', component: SelectCompanyComponent },
<<<<<<< Updated upstream
  { path: 'projects/:id', component: ProjectsComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'edit-project', component: EditProjectComponent },
  { path: 'edit-project/:id', component: EditProjectComponent }
=======
  { path: 'user-registry', component: UserRegistryComponent }
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
