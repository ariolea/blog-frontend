import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { updateProfilePictureRequest } from 'src/app/services/auth/updateProfilePictureRequest';
import { MediaService } from 'src/app/services/media/media.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
  userLoginOn: boolean = false;
  menuOpciones: boolean = false;
  image?: any;
  username: String = "";
  name: String = "";
  errorMessage: any;
  
  registerForm = this.formBuilder.group({
    id: [''],
    profilePicture: ['']
  })

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private userService: UserService, private elementRef: ElementRef, private router: Router, private mediaService: MediaService) {


    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })

    this.loginService.username.subscribe((username) => {
      this.username = username;
    });

    this.userService.getUser(this.username).subscribe({
      next: (userData) => {
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.image = userData.profilePicture;
        this.name = userData.firstname;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      }
    })

  }

  opciones() {
    if (!this.menuOpciones) {
      this.menuOpciones = true;
    }
    else {
      this.menuOpciones = false;
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/iniciar-sesion'])
    this.menuOpciones = false;
    window.location.reload();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.menuOpciones) {
      if (!this.elementRef.nativeElement.querySelector('.container2').contains(event.target)
        && !this.elementRef.nativeElement.querySelector('img').contains(event.target)
        && !this.elementRef.nativeElement.querySelector('span').contains(event.target)) {
        this.menuOpciones = false;
      }
    }
  }

  upload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe(response => {
        this.registerForm.controls.profilePicture.setValue(response.url);
        
        this.userService.updateProfilePicture(this.registerForm.value as unknown as updateProfilePictureRequest).subscribe({
          next: () => {
            window.location.reload();
          },
          error: (errorData) => console.error(errorData)
        })
      })
    }
    this.menuOpciones = false;
  }

  about() {
    this.menuOpciones = false;
  }
}
