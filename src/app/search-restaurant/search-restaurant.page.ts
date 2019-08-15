import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.page.html',
  styleUrls: ['./search-restaurant.page.scss'],
})
export class SearchRestaurantPage implements OnInit {

  searchRestaurantForm: FormGroup;
  public restaurants;
  public systemgenerate;

  validation_messages = {
    'cuisine_id': [
      { type: 'required', message: 'Type of cuisine is required.' }
    ],
    'restaurant_price': [
      { type: 'required', message: 'Price is required.' }
    ],
  }

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {

    this.searchRestaurantForm = this.formBuilder.group({
      cuisine_id: new FormControl('', Validators.required),
      restaurant_price: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.storage.get('systemgenerate')
      .then(((val) => {
        this.systemgenerate = val;
        console.log(this.systemgenerate);
      }))  

    this.presentAlert();
  
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Reminder!',
      message: 'Please make sure that \'\Eating History\'\ in your Profile page has a minimum of 5 entries before you select \'\Let System Generate\'\ option in Type of cuisine.',
      // buttons: ['OK', 'Go to Profile']
      buttons: [
      {
        text: 'Go to Profile',
        handler: () => {
          this.router.navigateByUrl('/user-profile');
        }
      }, {
        text: 'Continue',
      }]
    });

    await alert.present();
  }

  searchRestaurant() {
 
    this.storage.set('cuisine_id', this.searchRestaurantForm.value.cuisine_id);
    this.storage.set('restaurant_price', this.searchRestaurantForm.value.restaurant_price);
    this.router.navigateByUrl('/search-restaurant-result');

  } // end search fx
  
  }
