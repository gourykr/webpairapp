import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Loading,App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditprofilePage } from '../editprofile/editprofile';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
loading: Loading;
data:any;
responseData : any;
profile = {"profile_image": "","contact_no": "","email":"","firstname":"","lastname":"","location_add_line1": "","location_add_line2":"","location_city":"","location_zipcode":"","location_country":"","entity_comment_count":"","entity_rating":"","entity_points":"","services":[]};
createSuccess = false;
userData = {"id": "","type":"User"};

  constructor(public navCtrl: NavController,public nav: NavController, public navParams: NavParams,private remoteService: RemoteServiceProvider,private alertCtrl: AlertController,private loadingCtrl: LoadingController,app:App) {
    this.nav = app.getRootNav();
    this.data = JSON.parse(localStorage.getItem('userData'));
    if(!this.data){
    }else{
    console.log(this.data);
    this.userData.id=this.data.id;

  }
  }

  ionViewCanEnter() {
    console.log("in ionViewCanEnter");
    this.showLoading();
    return new Promise((resolve,reject) => {
    this.remoteService.postData(this.userData,'getProfile').then((result) => {
       this.responseData = result;
       if(this.responseData.status==1){
       this.profile=this.responseData.data[0];
       console.log(this.profile);
      }else{
      this.showPopup("Error",this.responseData.message);
      }
      console.log(this.responseData);
      resolve(result)
    }, (err) => {
      this.showPopup("Error",err);
      this.loading.dismiss();
      reject(err)
    });  
    });
  }

  

  public logout() {
    localStorage.clear();
      this.nav.setRoot('loginPage');
  }
  
  public editprofile() {
      this.navCtrl.push(EditprofilePage,{data : this.profile});
  }

   showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
