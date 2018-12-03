import { Component, ViewChild, Injectable  } from '@angular/core';
import { Platform, App, LoadingController,Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import {EditprofilePage} from '../pages/editprofile/editprofile';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../models/profile.model';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';
import { PaymentPage } from '../pages/payment/payment';





//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({

  templateUrl: 'app.html',
  
  
})
export class MyApp {
  
  rootPage:any = "";
  @ViewChild(Nav) nav:Nav;
  activePage: any;
 


  pages: Array<{title:string, component:any}>;
  profile = {} as Profile;
  profileData: AngularFireObject<Profile>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public authAF: AngularFireAuth, public app: App,
    loadingCtrl: LoadingController, private db:AngularFireDatabase, 
   ) {

     

      this.pages =[
        
       // add the pages of the menu here 
        
        {title:'editprofilePage',component: EditprofilePage},
        {title: 'FriendsPage',component: FriendsPage},
        {title: 'LoginPage', component: LoginPage},
        {title: 'PaymentPage', component: PaymentPage},
     
      ];

      

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        splashScreen.show();

        const authObserver = authAF.authState.subscribe( user => {

 

          if (user) { 

            this.profileData = this.db.object(`users/${user.uid}`); 
            this.profileData.valueChanges().subscribe(user => {
                 this.profile.firstname = user.firstname;
                 this.profile.lastname = user.lastname;
                
                 this.profile.image = user.image;
                 this.profile.phonenumber = user.phonenumber;
                 
      
             });
           this.nav.setRoot('NavTabsPage')
           // this.rootPage = "NavTabsPage"; // change this to Profile page when it is created
            authObserver.unsubscribe();
          } 
          else {
            this.nav.setRoot('LoginPage')
           // this.rootPage = "LoginPage";
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
    this.nav.push(page.component); // changed from .setroot to push
    this.activePage = page;
  }


  

  
} 


