import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  newUser: any;
  formError: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) {}

  //method for creating a new user. A new JSON object is created and sent to the node api
  createNewUser(createUser: any){
    this.formError = '';
    if(this.doPasswordsMatch(this.signUpForm.controls['password'].value, this.signUpForm.controls['confirmPassword'].value) == true){
      this.newUser = {
        "name": createUser.name,
        "email": createUser.email,
        "phoneNumber": createUser.phoneNumber,
        "address": createUser.address,
        "postalCode": createUser.postalCode,
        "password": createUser.password,
        "role": "user"
      }
      if(this.newUser != null){
        this.api.createUser(this.newUser).subscribe(
          data => {console.log(data);
              this.router.navigate(['/login']);
            },
          error => {//if status code other than in the 200 range returned, show error
            console.log('Error from API: ', error.error);
            if(error.status >= 401){
              this.formError = error.error;
            }
          })
      }
    }
    else
    {
      this.formError = "Passwords do not match";
    }
  }

  //error messages used during login/register validation
  error_messages = {
    'name': [
      { type: 'required', message: 'Full name is required.' },
      { type: 'pattern', message: 'Name can only consist of letters' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Invalid email format.' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
    ],
    'postalCode': [
      { type: 'required', message: 'Postal code is required.' },
      { type: 'pattern', message: 'Invalid postal code. Only digits allowed' },
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Invalid phone number.' },
      { type: 'minlength', message: 'Phone number must have at least 10 digits.' },
      { type: 'maxlength', message: 'Phone number must have at most 10 digits.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must have at least 6 characters.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Password must have at least 6 characters.' }
    ],
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //checking if passwords match
  doPasswordsMatch(firstPassword: string, secondPassword: string) {
        if (firstPassword !== secondPassword) {
            return false;
        } else {
          return true;
        }
    }

}
