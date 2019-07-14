import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-restaurant',
  templateUrl: './show-restaurant.page.html',
  styleUrls: ['./show-restaurant.page.scss'],
})
export class ShowRestaurantPage implements OnInit {
  
  restaurant_id: number;
  restaurant_name: string; 
  restaurant_description: string;
  restaurant_price: number;
  restaurant_address: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=> {
      this.restaurant_id = data.restaurant_id;
      this.restaurant_name = data.restaurant_name;
      this.restaurant_description = data.restaurant_description;
      this.restaurant_price = data.restaurant_price;
      this.restaurant_address = data.restaurant_address;
      console.log(data);
      
    });
  }

}
