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
  public hd;
  
  validation_messages = {
    'history_date': [
      { type: 'required', message: 'Date is required.' }
    ],
    'cuisine_id': [
      { type: 'required', message: 'Type of cuisine is required.' }
    ]
  }

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) { 
    this.addEatingHistory = this.formBuilder.group({
      history_date: new FormControl('', Validators.required),
      cuisine_id: new FormControl('', Validators.required),
      restaurant_name: new FormControl(''),
      food_price: new FormControl(''),
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
    this.hd= this.addEatingHistory.value.history_date;
    //console.log(this.hd.substring(0,10));
    
    this.storage.get('user_id')
    .then(((val) => {
      this.user_id = val;
      //console.log(this.user_id);
      
      

      let data = {
        user_id: this.user_id,
        //hd: this.addEatingHistory.value.history_date,
        history_date: this.hd.substring(0,10),
        cuisine_id: this.addEatingHistory.value.cuisine_id,
        restaurant_name: this.addEatingHistory.value.restaurant_name,
        food_price: this.addEatingHistory.value.food_price,
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
