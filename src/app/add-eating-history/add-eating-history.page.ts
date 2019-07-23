import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-eating-history',
  templateUrl: './add-eating-history.page.html',
  styleUrls: ['./add-eating-history.page.scss'],
})
export class AddEatingHistoryPage implements OnInit {

  addEatingHistory: FormGroup;
  public user_id;
  public users;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) { 
    this.addEatingHistory = this.formBuilder.group({
      date: new FormControl(''),
      cuisine_id: new FormControl(''),
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

  cancelAdd() {
    this.router.navigateByUrl('/user-profile');
  }

  addHistory() {
    this.storage.get('user_id')
    .then(((val) => {
      this.user_id = val;
      //console.log(this.user_id);
      let data = {
        user_id: this.user_id,
        date: this.addEatingHistory.value.date,
        cuisine_id: this.addEatingHistory.value.cuisine_id,
      }

    console.log(data);
    this.http.post('http://127.0.0.1/lp_addeatinghistory.php', data).subscribe(
      async (result) => {
        console.log(result);
        this.router.navigate(['/user-profile']);
        const toast = await this.toastController.create({
          message: 'Congratulations, you have successfully add eating history!',
          duration: 2000
         });
        toast.present();

      },
      (err) => {
        console.log(JSON.stringify(err));
      });
    }))
  }

}
