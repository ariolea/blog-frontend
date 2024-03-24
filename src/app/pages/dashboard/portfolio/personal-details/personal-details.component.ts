import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  errorMessage: String = "";
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  username: String = "";

  registerForm = this.formBuilder.group({
    id: [''],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    country: ['', Validators.required],
    mobile: ['', Validators.required],
    currentCity: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required]
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private loginService: LoginService) {

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
        this.user = userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue(userData.firstname ?? '');
        this.registerForm.controls.lastname.setValue(userData.lastname ?? '');
        this.registerForm.controls.country.setValue(userData.country ?? '');
        this.registerForm.controls.mobile.setValue(userData.mobile ?? '');
        this.registerForm.controls.currentCity.setValue(userData.currentCity ?? '');
        this.registerForm.controls.email.setValue(userData.email ?? '');
        this.registerForm.controls.gender.setValue(userData.gender ?? '');
      },
      error: (errorData) => {
        this.errorMessage = errorData
      },
      complete: () => {
      }
    })

  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  get mobile() {
    return this.registerForm.controls.mobile;
  }

  get currentCity() {
    return this.registerForm.controls.currentCity;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get gender() {
    return this.registerForm.controls.gender;
  }


  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next: () => {
          this.editMode = false;
          this.user = this.registerForm.value as unknown as User;
          window.location.reload();
        },
        error: (errorData) => console.error(errorData)
      })
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }


}