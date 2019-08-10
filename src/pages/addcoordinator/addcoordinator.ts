import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading  } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the AddcoordinatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcoordinator',
  templateUrl: 'addcoordinator.html',
})
export class AddcoordinatorPage {
  createSuccess = false;
  loading: Loading;
  responseData : any;
  userData = {"user_type": "Franchiser","name": "","email": "","mobile": "","image_url": "", "company": "", "whatsappno": "", "adharno": "","address": "","distric": "", "state": "","city": "","pincode":"","website":"","gst_in": "","password":""};
  imgPreview = 'assets/icon/user128.png';   
  constructor(private remoteService: RemoteServiceProvider,public navCtrl: NavController,public navParams: NavParams,private alertCtrl: AlertController,private loadingCtrl: LoadingController,private imagePicker: ImagePicker) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcoordinatorPage');
  }

  getPhoto() {
  let options = {
    maximumImagesCount: 1, 
    width: 800, 
    height: 800, 
    quality: 70, 
    outputType: 1
  };
  this.imagePicker.getPictures(options).then((results) => {
    this.imgPreview = 'data:image/jpeg;base64,'+results[0];
    this.userData.image_url='data:image/jpeg;base64,'+results[0];
  }, (err) => { });
}
   
   signup(){
     this.showLoading();
     this.remoteService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      if(this.responseData.status==1){
      this.showPopup("Success",this.responseData.message);
      }else{
      this.showPopup("Error",this.responseData.message);
      }
      this.loading.dismiss();
    }, (err) => {
      console.log(err);
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
