// get cuisine id, restaurant price from search restaurant page.
// keep in storage, retrieve it here & then done the sql.

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search-restaurant-result',
  templateUrl: './search-restaurant-result.page.html',
  styleUrls: ['./search-restaurant-result.page.scss'],
})
export class SearchRestaurantResultPage implements OnInit {

  public cuisine_id;
  public restaurant_price;
  public restaurants;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.storage.get('cuisine_id')
      .then(((val) => {
        this.cuisine_id = val;

      this.storage.get('restaurant_price')
      .then(((val2) => {
        this.restaurant_price = val2;
        
        let data = {
          cuisine_id: this.cuisine_id,
          restaurant_price: this.restaurant_price,
        }
        
        console.log(data);
        this.http.post('http://127.0.0.1/lp_searchRestaurantsql.php', data).subscribe(
      (result) => {
        console.log(result);
        this.restaurants=result;
        this.storage.set('restaurants', this.restaurants);
        console.log(this.restaurants);
        
      },
      (err) => {
        ///this.presentLoading();
        ///setTimeout(() => this.faillogin(), 1500);
        console.log(JSON.stringify(err));
      }

      
    );

  
  
  
      })) // end of storage claim for restaurant price
    })) // end of storage claim for cuisine id

}

}
