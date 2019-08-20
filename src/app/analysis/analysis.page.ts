import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {

  public user_id;
  public history;
  public analysishistory;

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
                //console.log(this.analysishistory[3]);
    
              }, (error: any) => {
                  console.log(JSON.stringify(error));
                });

  }))
}

}
