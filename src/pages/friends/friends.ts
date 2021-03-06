import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase, { User } from 'firebase/app';
import 'firebase/database';

import {Profile} from '../../models/profile.model';

import {ProfileProvider} from '../../providers/profile/profileProvider';
import { from } from 'rxjs/observable/from';

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
    public afAuth: AngularFireAuth,private afDatabase:AngularFireDatabase,
    public profileService: ProfileProvider) {
      
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');

 this.displayFriends();

    


  }

  gotoAddFriends(){
    this.navCtrl.push('FindFriendsPage');

  }

  displayFriends(){
// try to make friends names update when they change them. or could have an edit function to change them to what you want.
    this.afAuth.authState.subscribe(data => {
     this.profileData= firebase.database().ref(`users/${data.uid}/friends`); 
     this.profileData.on('value',friendsSnapshot =>{
      this.friendsList = [];
      friendsSnapshot.forEach( friendsSnap => {
        var friend = friendsSnap.val();
       

        this.friendsList.push(friend);
        console.log(friend.image);

        return false;
      });

     })
      
    })

  }

}
