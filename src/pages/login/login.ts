import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading  } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../tabs/tabs';
import { FtabsPage } from '../ftabs/ftabs';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
loading: Loading;
responseData : any;
data : any;
createSuccess = false;
userData = {"type": "","email": "","password": ""};

  constructor(private remoteService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    console.log(this.data);
    if(!this.data){

    }else{
    if(this.data.user_type==1){
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.navCtrl.setRoot(FtabsPage);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signin(){
     this.showLoading()
     this.remoteService.postData(this.userData,'signin').then((result) => {
      this.responseData = result;
      if(this.responseData.status==1){
      localStorage.setItem('userData', JSON.stringify(this.responseData.data[0] || null));
      console.log(this.responseData.data[0].user_type)
      if(this.responseData.data[0].user_type==1){
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.navCtrl.setRoot(FtabsPage);
      }
      }else{
      this.showPopup("Error",this.responseData.message);
      }
      this.loading.dismiss();
    }, (err) => {
       console.log(err);
       this.loading.dismiss();
    });

  }

  gotosignup() {
  this.navCtrl.push(RegisterPage);
  }
  gotoforgot() {
  this.navCtrl.push(ForgotPage);
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
