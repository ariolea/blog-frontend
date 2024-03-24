import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/services/auth/userRegister';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerError: string = "";
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    country: ['', Validators.required]
  });
  
  countries: any[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private countriesService: CountriesService) { }


  searchCountries() {
    if(!this.country.value){
      this.countriesService.searchCountry().subscribe(data => {
        this.countries = data;
      });
    }
    else{
      console.log(this.country.value);
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.registerError = "";
      this.userService.registerUser(this.registerForm.value as UserRegister).subscribe({
        next: (userData) => {
          console.info("registro completo");
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerForm = errorData;
        },
        complete: () => {
          console.info("registro completo");
          this.router.navigateByUrl('/iniciar-sesion');
          this.registerForm.reset();
        }
      })
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get country() {
    return this.registerForm.controls.country;
  }
}
