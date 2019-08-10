import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Loading,App } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';



/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
loading: Loading;
data:any;
responseData : any;
profile = {"image_url": "","mobile": "","email":"","firstname":"","lastname":"","location_add_line1": "","location_add_line2":"","location_city":"","location_zipcode":"","location_country":"","entity_comment_count":"","entity_rating":"","entity_points":"","services":[]};
createSuccess = false;
userData = {"id": "","type":"User"};
sendinterest={"user_id": "","other_uid":""};

  constructor(public navCtrl: NavController,public nav: NavController, public navParams: NavParams,private remoteService: RemoteServiceProvider,private alertCtrl: AlertController,private loadingCtrl: LoadingController,app:App) {

    this.userData.id=navParams.get('id');
    this.sendinterest.other_uid=this.userData.id;
    this.data = JSON.parse(localStorage.getItem('userData'));
    if(!this.data){
    }else{
    console.log(this.data);
    this.sendinterest.user_id=this.data.id;

  }
  }

  ionViewDidLoad() {
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

  sendInterest() {
    return new Promise((resolve,reject) => {
    this.remoteService.postData(this.sendinterest,'sendinterest').then((result) => {
       this.responseData = result;
       if(this.responseData.status==1){
       this.showPopup("Error",this.responseData.message);
      }else{
      this.showPopup("Error",this.responseData.message);
      }
      console.log(this.responseData);
      resolve(result)
    }, (err) => {
      this.showPopup("Error",err);
      reject(err)
    });  
    });
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
