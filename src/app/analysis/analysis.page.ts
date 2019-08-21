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

  constructor(
    private storage: Storage,
    private http:HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 0, 0],
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
              console.log(data);
              this.history = data;
  
            }, (error: any) => {
                console.log(JSON.stringify(error));
              });

              //array of cuisine id and food price.
              this.http.post('http://127.0.0.1/lp_analysishistory.php', data)
              .subscribe((data: any) => {
                console.log(data);
                this.analysishistory = data;
                
                
                console.log(this.analysishistory.map(t=>t.cuisine_id));
                
                // if(this.analysishistory.map(t=>t.cuisine_id)[0]=="101")
                // {
                //   var x = this.analysishistory.map(t=>t.food_price)[0];
                // }
                this.datachart = this.analysishistory.map(t=>t.food_price);
                //console.log(this.analysishistory[3]);

                this.barChart = new Chart(this.barCanvas.nativeElement, {
                  type: "bar",
                  data: {
                    // labels: ["Fast Food", "Asian", "Western", "Snack", "Dessert", "Others"],
                    labels: this.analysishistory.map(t=>t.cuisine_id),
                    datasets: [
                      {
                        label: "Amount of money spent",
                        // data: [10, 10.5, 10.7, 0, 0, 0],
                        
                        data: this.datachart,
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
