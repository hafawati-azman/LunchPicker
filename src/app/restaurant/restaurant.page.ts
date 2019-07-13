import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant',
  templateUrl: 'restaurant.page.html',
  styleUrls: ['restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  public restaurants;
  constructor( private http: HttpClient) {}

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
}