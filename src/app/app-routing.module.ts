import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantsComponent } from './component/enseignants/enseignants.component';
import { StudentsComponent } from './component/students/students.component';
import { TimetableComponent } from './component/timetable/timetable.component';
import { LayoutComponent } from './component/layout/layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChatbotComponent } from './component/chatbot/chatbot.component';
import { CoursComponent } from './component/cours/cours.component';
import { UserLoginComponent } from './component/User/user-login/user-login.component';

const routes: Routes = [
  {path: 'user-login' ,  component:UserLoginComponent},
  {path:'user-login', redirectTo:'user-login' , pathMatch:'full'},
  { path: '', redirectTo: 'enseignants', pathMatch: 'full' },
  { path: 'enseignants', component: EnseignantsComponent },
  {path:'layout' , component:LayoutComponent },
  {path:'dashboard', component:DashboardComponent},
  
  {path:'chatbot', component:ChatbotComponent},

  {path:'cours',component:CoursComponent},


  { path: 'students', component: StudentsComponent},
  { path: 'timetable', component: TimetableComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
