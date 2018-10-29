import { Component, ViewChild } from '@angular/core';
import { Platform, App, LoadingController,Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import {EditprofilePage} from '../pages/editprofile/editprofile';
import {NgModule} from '@angular/core';
import {Profile} from '../models/profile.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  
  rootPage:any = "";
  @ViewChild(Nav) nav:Nav;
  activePage: any;

  pages: Array<{title:string, component:any}>;
  public userInfo;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    authAF: AngularFireAuth, app: App,
    loadingCtrl: LoadingController, db:AngularFireDatabase) {


      this.pages =[
        
        {title:'edit profile Page',component: EditprofilePage} // add the pages of the menu here 
      ];

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        splashScreen.show();

        const authObserver = authAF.authState.subscribe( user => {


          if (user) {      
           
            this.rootPage = "NavTabsPage";
            authObserver.unsubscribe();
          } 
          else {
            this.rootPage = "LoginPage";
            authObserver.unsubscribe();
          }
        });
        // screenOrientation.lock('portrait');
        statusBar.styleDefault();
        //statusBar.overlaysWebView(false);
        splashScreen.hide();
      });
      
  }
 
  openPage(page){
    this.nav.setRoot(page.component);
    //this.activePage = page;
  }
  

  
} 


