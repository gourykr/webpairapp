import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { FregisterPage } from '../fregister/fregister';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  userRegister() {
  this.navCtrl.push(RegisterPage);
  }
  
  franchiserRegister() {
  this.navCtrl.push(FregisterPage);
  }

  login() {
  this.navCtrl.push(LoginPage);
  }

}
