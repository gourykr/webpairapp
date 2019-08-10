import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ReferPage } from '../refer/refer';

/**
 * Generated class for the FtabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ftabs',
  templateUrl: 'ftabs.html'
})
export class FtabsPage {

  homeRoot = 'FhomePage'
  profileRoot = 'ProfilePage'
  walletsRoot = 'WalletsPage'
  referRoot = 'ReferPage'


  constructor(public navCtrl: NavController) {}

}
