import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: 'restaurant.page.html',
  styleUrls: ['restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  public restaurants;
  constructor( 
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
    this.http.get('http://127.0.0.1/lp_restaurant.php')
    .subscribe((data : any) =>
    {
       console.log(data);
       this.restaurants = data;
    },(error : any) =>
    {
       console.log(error);
    });
  }

  showRestaurant(restaurant_id, restaurant_name, restaurant_description, restaurant_price, restaurant_address) {
    this.router.navigate(['/show-restaurant/' + restaurant_id + '/' + restaurant_name + '/' +
    restaurant_description + '/' + restaurant_price + '/' + restaurant_address]);
  }
}