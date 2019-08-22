import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
//import { async } from 'q';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  editProfileForm: FormGroup;
  public user_id;
  public users;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) { 
    this.editProfileForm = this.formBuilder.group({
      user_name: new FormControl(''),
      user_email: new FormControl(''),
      user_password: new FormControl(''),
    })
  }

  ngOnInit() {
    this.storage.get('user_id')
      .then(((val) => {
        this.user_id = val;
        let data = {
          user_id: this.user_id,
        }

        this.http.post('http://127.0.0.1/lp_userprofile.php', data)
          .subscribe((data: any) => {
            //console.log(data);
            this.users = data;

          }, (error: any) => {
              console.log(JSON.stringify(error));
            });
      }))
  }

  async editUserProfile() {
    this.storage.get('user_id')
    .then(((val) => {
      this.user_id = val;
      //console.log(this.user_id);
      let data = {
        user_id: this.user_id,
        user_name: this.editProfileForm.value.user_name,
        user_email: this.editProfileForm.value.user_email,
        user_password: this.editProfileForm.value.user_password,
      }

    //console.log(data);
    this.http.post('http://127.0.0.1/lp_edituserprofile.php', data).subscribe(
      async (result) => {
        console.log(result);
        this.router.navigate(['/user-profile']);
        const toast = await this.toastController.create({
          message: 'Congratulations, update successful!',
          duration: 2000
         });
        toast.present();

      },
      (err) => {
        console.log(JSON.stringify(err));
      });
    }))
  }

  cancelEdit() {
    this.router.navigateByUrl('/user-profile');
  }

}
