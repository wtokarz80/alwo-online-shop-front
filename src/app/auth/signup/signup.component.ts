import { Component, OnInit } from '@angular/core';
import {SignupRequestPayload} from '../models/signup-request.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService) {
    // this.signupRequestPayload = {
    //   username: '',
    //   password: ''
    // };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  signup(): void{
    // console.log(this.signupForm.value);
    // this.signupRequestPayload.username = this.signupForm.get('username').value;
    // this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupForm.value)
      .subscribe(data => {
        console.log(data);
      });
    this.signupForm.patchValue( {
      username: '',
      password: ''
    });
  }
}
