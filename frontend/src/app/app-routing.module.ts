import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { CreateTeamComponent } from './create-team/create-team.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "teams", component: TeamsComponent},
  { path: "create-announcement", component: CreateAnnouncementComponent},
  { path: "create-team", component: CreateTeamComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
