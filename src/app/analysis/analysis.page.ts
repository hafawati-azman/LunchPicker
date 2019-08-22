import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  
  public user_id;
  public history;
  public analysishistory;
  public datachart;
  public cuisine;
  public price;
  public x=0;
  public fastFood=0;
  public sumFastFood=0;
  public asian=0;
  public sumAsian=0;
  public western=0;
  public sumWestern=0;
  public snack=0;
  public sumSnack=0;
  public dessert=0;
  public sumDessert=0;
  public others=0;
  public sumOthers=0;
  public y=0;
  public asianExpense = [];
  public i=0;
  public totalSpending = [];
  public m = 0;
  public mf;
  public item;

  constructor(
    private storage: Storage,
    private http:HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.storage.get('user_id')
      .then(((val) => {
        this.user_id = val;
        
        let data = {
          user_id: this.user_id,
        }
        
            this.http.post('http://127.0.0.1/lp_eatinghistory.php', data)
            .subscribe((data: any) => {
              
              this.history = data;
  
            }, (error: any) => {
                console.log(JSON.stringify(error));
              });

              //array of cuisine id and food price.
              this.http.post('http://127.0.0.1/lp_analysishistory.php', data)
              .subscribe((data: any) => {
                
                this.analysishistory = data;
                
                this.cuisine = this.analysishistory.map(t=>t.cuisine_id);
                this.price = this.analysishistory.map(t=>t.food_price);
                this.price = this.price.map(Number);
              
                // calculate total spending for each cuisine.
                while(this.x < this.cuisine.length)
                {
                  if(this.cuisine[this.x]=="100")
                  {
                    this.fastFood = this.price[this.x];
                    this.sumFastFood += this.fastFood;
                  }
                  if(this.cuisine[this.x]=="101")
                  {
                    this.asian = this.price[this.x];
                    this.sumAsian += this.asian;
                  }
                  if(this.cuisine[this.x]=="102")
                  {
                    this.western = this.price[this.x];
                    this.sumWestern += this.western;
                  }
                  if(this.cuisine[this.x]=="103")
                  {
                    this.snack = this.price[this.x];
                    this.sumSnack += this.snack;
                  }
                  if(this.cuisine[this.x]=="104")
                  {
                    this.dessert = this.price[this.x];
                    this.sumDessert += this.dessert;
                  }
                  if(this.cuisine[this.x]=="105")
                  {
                    this.others = this.price[this.x];
                    this.sumOthers += this.others;
                  }
                  
                  this.x = this.x + 1;
                }

                // doughnutchart to show total spending for all cuisines.
                this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
                  type: "doughnut",
                  data: {
                    labels: ["Fast Food", "Asian", "Western", "Snack", "Dessert", "Others"],
                    datasets: [
                      {
                        label: "Amount of money spent",
                        data: [this.sumFastFood, this.sumAsian, this.sumWestern, this.sumSnack, this.sumDessert, this.sumOthers],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)"
                        ],
                        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
                      }
                    ]
                  }
                });
                
                //list down prices for all asian cuisine.
                while(this.y < this.cuisine.length)
                {
                  if(this.cuisine[this.y]=="101")
                  {
                    this.asianExpense.push(this.price[this.y]);
                  }
                  this.y += 1;
                }
                console.log(this.asianExpense);
                
                //put total spending for each cuisine in one array.
                this.totalSpending.push(this.sumFastFood);
                this.totalSpending.push(this.sumAsian);
                this.totalSpending.push(this.sumWestern);
                this.totalSpending.push(this.sumSnack);
                this.totalSpending.push(this.sumDessert);
                this.totalSpending.push(this.sumOthers);
                console.log(this.totalSpending);
    
                this.barChart = new Chart(this.barCanvas.nativeElement, {
                  type: "bar",
                  data: {
                    labels: ["Asian", "Western"],
                    datasets: [
                      {
                        label: "total spending",
                        data: [this.sumAsian, this.sumWestern],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                          "rgba(255,99,132,1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                      }
                    ]
                  },
                  options: {
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    }
                  }
                });
              }, (error: any) => {
                  console.log(JSON.stringify(error));
                });

  }))
}

}
