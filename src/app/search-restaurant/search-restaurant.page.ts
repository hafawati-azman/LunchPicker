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

  searchRestaurant() {
    let data = {
      cuisine_id: this.searchRestaurantForm.value.cuisine_id,
      restaurant_price: this.searchRestaurantForm.value.restaurant_price,
    }
    console.log(data);
    this.http.post('http://127.0.0.1/lp_searchRestaurantsql.php', data).subscribe(
      (result) => {
        
        console.log(result);
        //this.router.navigateByUrl('/search-restaurant-result');
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
