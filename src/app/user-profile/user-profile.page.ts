import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  
  constructor(
    private storage: Storage,
    private http:HttpClient,
    public toastController: ToastController,
    private router: Router
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
        console.log(data);

        this.http.post('http://127.0.0.1/lp_userprofile.php', data)
          .subscribe((data: any) => {
            console.log(data);
            this.users = data;

          }, (error: any) => {
              console.log(JSON.stringify(error));
            });
        
            this.http.post('http://127.0.0.1/lp_eatinghistory.php', data)
            .subscribe((data: any) => {
              console.log(data);
              this.history = data;
  
            }, (error: any) => {
                console.log(JSON.stringify(error));
              });
        
      }))
  }

  logout() {
    this.storage.clear();
    this.router.navigateByUrl('/home');
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }

  addEatingHistory() {
    this.router.navigateByUrl('/add-eating-history');
  }

  editEatingHistory(id) {
    this.storage.set('id',id);
    this.router.navigate(['/edit-eating-history/']);
  }


}
