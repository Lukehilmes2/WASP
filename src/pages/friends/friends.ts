import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase, { User } from 'firebase/app';
import 'firebase/database';

import {Profile} from '../../models/profile.model';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  public friendsList: Array<Object> = [];
  profileData: any;
  profile = {} as Profile;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDataBase:AngularFireDatabase,
    public afAuth: AngularFireAuth,private afDatabase:AngularFireDatabase,) {
      
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');

 this.displayFriends();

    


  }

  gotoAddFriends(){
    this.navCtrl.push('FindFriendsPage');

  }

  displayFriends(){

    this.afAuth.authState.subscribe(data => {
     this.profileData= firebase.database().ref(`users/${data.uid}/friends`); 
     this.profileData.on('value',friendsSnapshot =>{
      this.friendsList = [];
      friendsSnapshot.forEach( friendsSnap => {

        this.friendsList.push(friendsSnap.val());
        console.log(friendsSnap)
        return false;
      });

     })
      
    })


  }

}
