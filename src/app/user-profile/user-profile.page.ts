import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public user_id;
  public id;
  public users;
  public history;
  public cuisinehistory; // cuisine id, value.
  public cuisinehistoryNumOnly; // array = value for cuisine id only but string.
  public systemgenerate; // array = value for cuisine id, integer.
  public x = 0;
  public mf = 1;
  public m = 0;
  public item;
 

  
  constructor(
    private storage: Storage,
    private http:HttpClient,
    public toastController: ToastController,
    private router: Router,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {

    // this.storage.get('user_id')
    //   .then(((val) => {
    //     this.user_id = val;
    //     console.log(this.user_id);
    //     let data = {
    //       user_id: this.user_id,
    //     }

    //     this.http.post('http://127.0.0.1/lp_userprofile.php', data)
    //       .subscribe((data: any) => {
    //         console.log(data);
    //         this.users = data;

    //       }, (error: any) => {
    //           console.log(JSON.stringify(error));
    //         });
        
    //         this.http.post('http://127.0.0.1/lp_eatinghistory.php', data)
    //         .subscribe((data: any) => {
    //           console.log(data);
    //           this.history = data;
  
    //         }, (error: any) => {
    //             console.log(JSON.stringify(error));
    //           });
        
    //   }))
  }

  ionViewWillEnter() {
    this.storage.get('user_id')
      .then(((val) => {
        this.user_id = val;
        
        let data = {
          user_id: this.user_id,
        }

        this.http.post('http://127.0.0.1/lp_userprofile.php', data)
          .subscribe((data: any) => {
            //console.log(data);
            this.users = data;

          }, (error: any) => {
              console.log(JSON.stringify(error));
            });
        
            this.http.post('http://127.0.0.1/lp_eatinghistory.php', data)
            .subscribe((data: any) => {
              //console.log(data);
              this.history = data;
  
            }, (error: any) => {
                console.log(JSON.stringify(error));
              });

              this.http.post('http://127.0.0.1/lp_cuisinehistorydata.php', data)
              .subscribe((data: any) => {
                this.cuisinehistory = data;
                this.storage.set('cuisinehistory', this.cuisinehistory);
                //console.log(this.cuisinehistory);
                this.cuisinehistoryNumOnly = this.cuisinehistory.map(t=>t.cuisine_id);
              
              var systemgenerate = this.cuisinehistoryNumOnly.map(Number);
              //console.log(systemgenerate);
              
              // line 105 - 113: counts average to make "system generate" type of cuisine.
              var totalSum = 0;
              for(var i in systemgenerate) {
                  totalSum += systemgenerate[i];
              }              
              var numsCnt = systemgenerate.length;              
              var average = totalSum / numsCnt;
              var average = Math.ceil(average);
              //console.log(average);

              this.storage.set('systemgenerate', average);
                   
              }, (error: any) => {
                  console.log(JSON.stringify(error));
                });
        
      }))
  }


  async logoutAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Sign out alert!',
      message: 'Are you sure want to sign out?',
      // buttons: ['OK', 'Go to Profile']
      buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.storage.clear();
          this.router.navigateByUrl('/home');
        }
      }, {
        text: 'No',
      }]
    });

    await alert.present();
  }


  logout() {
    this.logoutAlert();
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }

  addEatingHistory() {
    this.router.navigateByUrl('/add-eating-history');
  }

  makeAnalysis() {
    this.router.navigateByUrl('/analysis');
  }

  editEatingHistory(id) {
    this.storage.set('id',id);
    this.router.navigate(['/edit-eating-history/']);
  }


}


// trash.
// line 99 - 112: find max occurence in systemgenerate.
                // for (var i=0; i<this.systemgenerate.length; i++)
                // {
                //   for (var j=i; j<this.systemgenerate.length; j++)
                //   {
                //     if (this.systemgenerate[i] == this.systemgenerate[j])
                //     this.m++;
                //     if (this.mf<this.m)
                //     {
                //       this.mf=this.m; 
                //       this.item = this.systemgenerate[i];
                //     }
                //   }
                // this.m=0;
                // }


                // console.log(this.item);
                // this.storage.set('systemgenerate', this.item);
                // while(this.x < this.cuisinehistory.length) {
                //   this.systemgenerate = this.cuisinehistory[this.x].cuisine_id;                 
                //   console.log(this.systemgenerate);
                //   this.x = this.x + 1; 
                // }
                // this.systemgenerate = this.cuisinehistory;
                // // console.log(this.systemgenerate);
                // //  this.systemgenerate = Math.max.apply(null,Object.keys(this.cuisinehistory));


