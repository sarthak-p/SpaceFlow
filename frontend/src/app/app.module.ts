import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamsComponent,
    CreateAnnouncementComponent,
    CreateTeamComponent,
    LoginComponent,
    SelectCompanyComponent,
    ProjectsComponent,
    CreateProjectComponent,
    EditProjectComponent,
    UserRegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // Do not include Angular Material modules as requested
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
