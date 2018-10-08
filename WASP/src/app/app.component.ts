import { Component } from '@angular/core';
import { Platform, App, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    authAF: AngularFireAuth, app: App,
    loadingCtrl: LoadingController) {

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        splashScreen.show();

        const authObserver = authAF.authState.subscribe( user => {
          if (user) {
            this.rootPage = "HomePage";
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
}


