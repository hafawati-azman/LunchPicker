import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-edit-eating-history',
  templateUrl: './edit-eating-history.page.html',
  styleUrls: ['./edit-eating-history.page.scss'],
})
export class EditEatingHistoryPage implements OnInit {

  editEatingHistory: FormGroup;
  public id: number;
  public history;
  public hd;

  constructor(
    private storage: Storage,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController,
  ) { 
    this.editEatingHistory = this.formBuilder.group({
      history_date: new FormControl(''),
      cuisine_id: new FormControl(''),
    })
  }

  ngOnInit() {
    this.storage.get('id')
    .then(((val) => {
      this.id = val;

      let data = {
         id: this.id,
      }

      this.http.post('http://127.0.0.1/lp_eatinghistory2.php', data)
            .subscribe((data: any) => {
            this.history = data;

        }, (error: any) => {
            console.log(JSON.stringify(error));
        });

  }))
    
  }

  editHistory() {
    this.hd= this.editEatingHistory.value.history_date;
    this.storage.get('id')
    .then(((val) => {
      this.id = val;
      console.log(this.id);

      let data = {
         id: this.id,
         history_date: this.hd.substring(0,10),
         cuisine_id: this.editEatingHistory.value.cuisine_id,
      }

      //console.log(data);

      this.http.post('http://127.0.0.1/lp_editeatinghistory.php', data).subscribe(
      async (result) => {
        console.log(result);
        this.router.navigate(['/user-profile']);
        const toast = await this.toastController.create({
          message: 'Congratulations, edit eating history is successful!',
          duration: 2000
         });
        toast.present();

      },
      (err) => {
        console.log(JSON.stringify(err));
        });

  }))

  }


  deleteEatingHistory() {
    this.storage.get('id')
    .then(((val) => {
      this.id = val;
      //console.log(this.user_id);
      let data = {
        id: this.id,
      }

    console.log(data);
    this.http.post('http://127.0.0.1/lp_deleteEatingHistory.php', data).subscribe(
      async (result) => {
        console.log(result);
        this.router.navigate(['/user-profile']);
        const toast = await this.toastController.create({
          message: 'Eating history has been deleted!',
          duration: 2000
         });
        toast.present();

      },
      (err) => {
        console.log(JSON.stringify(err));
      });
    }))

  }

}
