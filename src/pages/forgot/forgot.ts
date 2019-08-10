import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

loading: Loading;
responseData : any;
createSuccess = false;
userData = {"email": "","type":""};

  constructor(private remoteService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    
  }

  forgotpassword(){
     this.showLoading()
     this.remoteService.postData(this.userData,'forgotPassword').then((result) => {
      this.responseData = result;
      if(this.responseData.status==1){
      this.showPopup("Success",this.responseData.message);
      }else{
      this.showPopup("Error",this.responseData.message);
      }
      this.loading.dismiss();
    }, (err) => {
      this.showPopup("Error",err.error.error.error);
      this.loading.dismiss();
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
