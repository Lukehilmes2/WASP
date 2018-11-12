
import { Injectable } from '@angular/core';
import {Profile} from '../../models/profile.model';
import {AngularFireAuth} from 'angularfire2/auth';


import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';




@Injectable()
export class UserProfileProvider {

  // possibly call instance of this profile?
  
  profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams:NavParams, 
    private afDataBase: AngularFireDatabase) {

      
  }

  createProfile(profile:Profile){
    this.afAuth.authState.subscribe(auth => {
      this.afDataBase.object(`users/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot('NavTabsPage')
      

    )})
  }

}
