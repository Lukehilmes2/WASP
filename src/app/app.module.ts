import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {FIREBASE_CONFIG} from './app.firebase.config';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

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
import {FriendsPageModule} from '../pages/friends/friends.module';
import { FriendsPage } from '../pages/friends/friends';
import { ProfileProvider } from '../providers/profile/profileProvider';
import {LoginPageModule} from '../pages/login/login.module';
import { PhotoProvider } from '../providers/photo/photo';





@NgModule({
  declarations: [
    MyApp,
    
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    EditprofilePageModule,
    FriendsPageModule,
    LoginPageModule,
 
    
   
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditprofilePage,
    FriendsPage, // page for menu
    
   

    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireDatabase,
    PhotoService,
    Camera,
    ProfileProvider,
    PhotoProvider,
    
  
    

    
    
  ],
})
export class AppModule {}
