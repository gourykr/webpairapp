import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Loading,App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { FuserdetailsPage } from '../fuserdetails/fuserdetails';
import { AdduserPage } from '../adduser/adduser';
import { EdituserPage } from '../edituser/edituser';
/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {
loading: Loading;
data:any;
responseData : any;
profile = {"profile_image": "","contact_no": "","email":"","firstname":"","lastname":"","location_add_line1": "","location_add_line2":"","location_city":"","location_zipcode":"","location_country":"","entity_comment_count":"","entity_rating":"","entity_points":"","services":[]};
createSuccess = false;
userData = {"id": "","search":""};

  constructor(public navCtrl: NavController,public nav: NavController, public navParams: NavParams,private remoteService: RemoteServiceProvider,private alertCtrl: AlertController,private loadingCtrl: LoadingController,app:App) {
    this.nav = app.getRootNav();

  this.data = JSON.parse(localStorage.getItem('userData'));
    if(!this.data){
    }else{
    console.log(this.data);
    //this.userData.id=this.data.id;
    this.userData.id='35';
    }
  }

 ionViewDidLoad() {
    console.log("in ionViewCanEnter");
    this.showLoading();
    return new Promise((resolve,reject) => {
    this.remoteService.postData(this.userData,'getFuserlist').then((result) => {
       this.responseData = result;
       if(this.responseData.status==1){
       this.profile=this.responseData.data;
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

  searchterm(){

    return new Promise((resolve,reject) => {
    this.remoteService.postData(this.userData,'getFuserlist').then((result) => {
       this.responseData = result;
       if(this.responseData.status==1){
       this.profile=this.responseData.data;
       console.log(this.profile);
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

  edituserdetails(id) {
  this.navCtrl.push(EdituserPage,{'id':id});
  }

  adduser(){
  this.navCtrl.push(AdduserPage);
  }

  public logout() {
    localStorage.clear();
    this.navCtrl.push(LoginPage);
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
