import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EnseignantService } from './service/enseignants.service';
import { EnseignantsComponent } from './component/enseignants/enseignants.component';
import { AddEnseignantComponent } from './component/enseignants/add-enseignant/add-enseignant.component';
import { StudentsComponent } from './component/students/students.component';
import { AddStudentComponent } from './component/students/add-students/add-students.component';
import { StudentService } from './service/student.service';
import { TimetableComponent } from './component/timetable/timetable.component';
import { HeaderComponent } from './component/header/header.component';
import { LayoutComponent } from './component/layout/layout.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatbotComponent } from './component/chatbot/chatbot.component';
import { ChatbotService } from './service/chatbot.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CoursService } from './service/cours.service';
import { CoursComponent } from './component/cours/cours.component';
import { LayoutService } from './service/layout.service';
import { AuthService } from './service/auth.service';
import { UserLoginComponent } from './component/User/user-login/user-login.component';
@NgModule({
  declarations: [
    AppComponent,
          StudentsComponent,

    UserLoginComponent ,
    TimetableComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    HomeComponent,
    LayoutComponent,
    ChatbotComponent,
CoursComponent,
     EnseignantsComponent,
    AddEnseignantComponent,


    
 
    
  ],
  imports: [
    AppRoutingModule,
provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
      FormsModule, 
    MatListModule,
    MatDividerModule,
    MatMenuModule,
     BrowserModule,
      AddStudentComponent, 
    BrowserModule,

    MatIconModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
],
  providers: [StudentService, EnseignantService,ChatbotService,CoursService,LayoutService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
