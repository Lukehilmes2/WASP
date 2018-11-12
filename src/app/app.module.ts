import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {FIREBASE_CONFIG} from './app.firebase.config';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';


import {UserProfileProvider} from '../providers/user-profile/user-profile'

import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'


import { MyApp } from './app.component';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';


import { PhotoService } from '../services/photo.service';
import { Camera } from '@ionic-native/camera';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { SocialPageModule } from '../pages/social/social.module';
import { EditprofilePageModule } from '../pages/editprofile/editprofile.module';



@NgModule({
  declarations: [
    MyApp,
    //EditprofilePage, // page for menu 
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    EditprofilePageModule
 
    
   
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditprofilePage, // page for menu

    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireDatabase,
    PhotoService,
    Camera,
    UserProfileProvider,
    
    
  ],
})
export class AppModule {}
