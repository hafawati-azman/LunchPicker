import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      user_email: new FormControl(''),
      user_password: new FormControl(''),
    })
  }

  ngOnInit() {
  }

}
