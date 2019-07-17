import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public user_id: any;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      user_email: new FormControl(''),
      user_password: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  loginUser(){
    let data = {
      user_email: this.loginForm.value.user_email,
      user_password: this.loginForm.value.user_password
    }
    this.http.post('http://127.0.0.1/lp_userlogin.php', data).subscribe(
      (result) => {
        this.user_id=result;
        this.storage.set('user_id',this.user_id);
        this.router.navigateByUrl('/restaurant');
        ///this.presentLoading();
        //setTimeout(() => this.router.navigateByUrl('/home'), 1500);
      },
      (err) => {
        ///this.presentLoading();
        ///setTimeout(() => this.faillogin(), 1500);
        console.log(JSON.stringify(err));
      }
    );}


}
