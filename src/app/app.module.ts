import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PersonalDetailsComponent } from './pages/dashboard/portfolio/personal-details/personal-details.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { RegisterComponent } from './auth/register/register.component';
import { AcademicProfessionalDataComponent } from './pages/dashboard/portfolio/academic-professional-data/academic-professional-data.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './shared/header/messenger/chat/chat.component';
import { ProfilePictureComponent } from './shared/header/profile-picture/profile-picture.component';
import { MessengerComponent } from './shared/header/messenger/messenger.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    PersonalDetailsComponent,
    RegisterComponent,
    AcademicProfessionalDataComponent,
    HomeComponent,
    ChatComponent,
    ProfilePictureComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
