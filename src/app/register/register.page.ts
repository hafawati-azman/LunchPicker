import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router
  ) { 
    this.registerForm = this.formBuilder.group({
      user_name: new FormControl(''),
      user_email: new FormControl(''),
      user_password: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  registerUser() {
    let data = {
      user_name: this.registerForm.value.user_name,
      user_email: this.registerForm.value.user_email,
      user_password: this.registerForm.value.user_password,
    }
    this.http.post('http://127.0.0.1/lp_registeruser.php', data).subscribe(
      async (result) => {
        console.log(result);
        this.router.navigateByUrl('/login');
        const toast = await this.toastController.create({
          message: 'Congratulations, you may now login!',
          duration: 2000
         });
        toast.present();

      },
      (err) => {
        console.log(JSON.stringify(err));
      });}

}
