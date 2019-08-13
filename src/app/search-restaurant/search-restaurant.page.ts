import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.page.html',
  styleUrls: ['./search-restaurant.page.scss'],
})
export class SearchRestaurantPage implements OnInit {

  searchRestaurantForm: FormGroup;
  public restaurants;
  public systemgenerate;

  constructor(
    private http: HttpClient, 
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private storage: Storage,
  ) {

    this.searchRestaurantForm = this.formBuilder.group({
      cuisine_id: new FormControl(''),
      restaurant_price: new FormControl(''),
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
    
  }

  searchRestaurant() {
 
    this.storage.set('cuisine_id', this.searchRestaurantForm.value.cuisine_id);
    this.storage.set('restaurant_price', this.searchRestaurantForm.value.restaurant_price);
    this.router.navigateByUrl('/search-restaurant-result');

  } // end search fx
  
  }
