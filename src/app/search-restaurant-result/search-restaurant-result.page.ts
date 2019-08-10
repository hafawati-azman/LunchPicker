import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-restaurant-result',
  templateUrl: './search-restaurant-result.page.html',
  styleUrls: ['./search-restaurant-result.page.scss'],
})
export class SearchRestaurantResultPage implements OnInit {

  public restaurants;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.get('http://127.0.0.1/lp_searchRestaurantsql.php')
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
