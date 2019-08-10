import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Loading,App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditprofilePage } from '../editprofile/editprofile';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
loading: Loading;
data:any;
responseData : any;
profile = {"image_url":"","mobile":"","email":"","name":"","whatsappno":"","adharno": "","company":"","address":"","distric":"","village":"","city":"","state":"","pincode":"","website":"","gst_in":"","profile_id":"","payment_status":""};
createSuccess = false;
userData = {"id": "","type":"Franchisor"};

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
    return new Promise((resolve, reject) => {    
      if (this.responseData) {
      if (this.profile.name) {
       this.loading.dismiss();
        resolve(true)
        }else{
        this.loading.dismiss();
        reject(true)
        }

      } else {
        this.remoteService.postData(this.userData,'getProfile').then((result) => {
      this.responseData = result;
      console.log(this.responseData.data);
     if(this.responseData.status==1){
      this.profile.image_url=this.responseData.data[0].image_url;
      this.profile.mobile=this.responseData.data[0].mobile;
      this.profile.email=this.responseData.data[0].email;
      this.profile.name=this.responseData.data[0].name;
      this.profile.whatsappno=this.responseData.data[0].whatsappno;
      this.profile.adharno=this.responseData.data[0].adharno;
      this.profile.company=this.responseData.data[0].company;
      this.profile.address=this.responseData.data[0].address;
      this.profile.distric=this.responseData.data[0].distric;
      this.profile.village=this.responseData.data[0].village;
      this.profile.city=this.responseData.data[0].city;
      this.profile.state=this.responseData.data[0].state;
      this.profile.pincode=this.responseData.data[0].pincode;
      this.profile.website=this.responseData.data[0].website;
      this.profile.gst_in=this.responseData.data[0].gst_in;
      this.profile.profile_id=this.responseData.data[0].profile_id;
      this.profile.payment_status=this.responseData.data[0].payment_status;
      console.log(this.profile);
      }else{
      this.showPopup("Error",this.responseData.message);
      }
      this.loading.dismiss();
      resolve(result);
      
    }, (err) => {
      console.log(err.error.error);
      this.showPopup("Error",err.error.error.error);
      if(err.error.error.error=='Invalid token'){
      this.logout();
      }
      this.loading.dismiss();

      reject(err)
    });
    
      }
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

