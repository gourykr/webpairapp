import { Component,ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { MarriagecoordinatorsPage } from '../pages/marriagecoordinators/marriagecoordinators';
import { UserlistPage } from '../pages/userlist/userlist';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
  rootPage:any = MainPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {


   // used for an example of ngFor and navigation
    this.pages = [
      { title: 'User List', component: 'UserlistPage', icon: 'home' },
      { title: 'Marriage Coordinators', component: 'MarriagecoordinatorsPage', icon: 'contacts' }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.clear();
    this.nav.setRoot('LoginPage');
  }

  
}
