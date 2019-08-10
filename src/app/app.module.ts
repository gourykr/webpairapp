import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64/ngx';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ReferPageModule } from '../pages/refer/refer.module';
import { AdduserPageModule } from '../pages/adduser/adduser.module';
import { AddcoordinatorPageModule } from '../pages/addcoordinator/addcoordinator.module';
import { EditcoordinatorPageModule } from '../pages/editcoordinator/editcoordinator.module';

import { EdituserPageModule } from '../pages/edituser/edituser.module';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { HomePageModule } from '../pages/home/home.module';   
import { FhomePageModule } from '../pages/fhome/fhome.module';
import { FuserdetailsPageModule } from '../pages/fuserdetails/fuserdetails.module';
import { TabsPage } from '../pages/tabs/tabs';
import { FtabsPage } from '../pages/ftabs/ftabs';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { RegisterPage } from '../pages/register/register';
import { ForgotPage } from '../pages/forgot/forgot';
import { FregisterPage } from '../pages/fregister/fregister';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserlistPageModule } from '../pages/userlist/userlist.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    FtabsPage,
    LoginPage,
    MainPage,
    RegisterPage,
    FregisterPage,
    UserDetailsPage,
    ForgotPage,
    EditprofilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    FhomePageModule,
    ReferPageModule,
    FuserdetailsPageModule,
    AdduserPageModule,
    EdituserPageModule,
    AddcoordinatorPageModule,
    EditcoordinatorPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    FtabsPage,
    LoginPage,
    MainPage,
    RegisterPage,
    FregisterPage,
    UserDetailsPage,   
    ForgotPage,
    EditprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    ImagePicker,
    Base64
  ]
})
export class AppModule {}
