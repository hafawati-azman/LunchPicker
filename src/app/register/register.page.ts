import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder
  ) { 
    this.registerForm = this.formBuilder.group({
      user_name: new FormControl(''),
      user_email: new FormControl(''),
      user_password: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  //registerUser() {
    //let data = {
      //user_name: this.registerForm.value.user_name,
      //user_email: this.registerForm.value.user_email,
      //user_password: this.registerForm.value.user_password,
    //}
    //this.http.post('http://127.0.0.1/register.php', data).subscribe(
      //(result) => {
        //console.log(result);
      //},
      //(err) => {
        //console.log(JSON.stringify(err));
      //});}

}
