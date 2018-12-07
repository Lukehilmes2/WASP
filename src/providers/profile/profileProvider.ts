import { HttpClient } from '@angular/common/http';
import { Injectable,NgZone, } from '@angular/core';
import {Profile} from '../../models/profile.model';
import {AngularFireAuth} from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import {App} from "ionic-angular";
import { ConditionalExpr } from '@angular/compiler';


@Injectable()
export class ProfileProvider {

  profile = {} as Profile;
  public EditProfileForm: FormGroup;
  profileData: AngularFireObject<Profile>;
  user: any;



  constructor(private afAuth: AngularFireAuth,
     private afDataBase: AngularFireDatabase,
     public app: App, public zone: NgZone,) {
    //console.log('Profile Provider');
  }


  updateProfile(profile:Profile){
    //Updates Current Users Profile
    this.afAuth.authState.subscribe(auth => {
      profile.email = auth.email;
      profile.UserID = auth.uid;
      this.afDataBase.object(`users/${auth.uid}`).update(profile); // make sure this is .update() or else it deletes everything in the node when you use .set().
       
  })
}

  getUserProfile(profile:Profile){
      // gets Current users Profile
    this.afAuth.authState.subscribe(data => {
      this.profileData = this.afDataBase.object(`users/${data.uid}`); 
      
      this.profileData.valueChanges().subscribe(user => {
       
           profile.email = user.email;
           profile.firstname = user.firstname;
           profile.lastname = user.lastname;
           profile.UserID = user.UserID;
           profile.phonenumber =user.phonenumber; 
           profile.image = user.image;
           profile.merchantAccount = user.merchantAccount;
              
           return profile;
          
       });
   });
  } // end of getUserProfile



}
