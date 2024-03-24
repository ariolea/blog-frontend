import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { BlogService } from 'src/app/services/blog/blog.service';
import { BlogRequest } from 'src/app/services/blog/blogRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  profilePicture?: any;
  username: String = "";
  name: String = "";
  userLoginOn: boolean = false;

  blog: BlogRequest = ({
    firstname: "",
    profilePicture: "",
    time: "",
    message: "",
    image: ""
  });

  blogs: any[] = [];

  constructor(private loginService: LoginService, private userService: UserService, private router: Router, private blogService: BlogService) {

    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!this.userLoginOn) { this.router.navigateByUrl('/iniciar-sesion'); }
      }
    });

    this.loginService.username.subscribe((username) => {
      this.username = username;
    });

    this.userService.getUser(this.username).subscribe({
      next: (userData) => {
        this.profilePicture = userData.profilePicture;
        this.name = userData.firstname;

        this.blog.firstname = userData.firstname;
        this.blog.profilePicture = userData.profilePicture;
      }
    })

    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
      }
    })

    
    this.blog.time = "1hr";
    this.blog.image = "";

  }

  
  post(){
    this.blogService.postBlogs(this.blog).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (errorData) => {
        console.error(errorData);
      }
    })
  }

}
