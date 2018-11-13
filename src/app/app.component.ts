import { Component, ViewChild } from '@angular/core';
import { Platform, App, LoadingController,Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import {EditprofilePage} from '../pages/editprofile/editprofile';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Profile } from '../models/profile.model';


//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  
  rootPage:any = "";
  @ViewChild(Nav) nav:Nav;
  activePage: any;
 


  pages: Array<{title:string, component:any}>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
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

            
           
            this.rootPage = "NavTabsPage"; // change this to Profile page when it is created
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

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  openPage(page){
    this.nav.push(page.component); // changed from .setroot to push
    //this.activePage = page;
  }
  

  
} 


