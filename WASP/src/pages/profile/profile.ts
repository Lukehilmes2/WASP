import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {Profile} from '../../models/profile.model'
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;


  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }




/* gotoHome(){
  this.navCtrl.push("HomePage");
}

gotoBets(){
  this.navCtrl.push('BetsPage');
} */


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
