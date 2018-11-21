import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase, { User } from 'firebase/app';
import 'firebase/database';

import {Profile} from '../../models/profile.model';





@IonicPage()
@Component({
  selector: 'page-find-friends',
  templateUrl: 'find-friends.html',
})
export class FindFriendsPage {
  
  profileData: AngularFireObject<Profile>;
  profile = {} as Profile;
  userID:string;
 

  users=[];
  



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDataBase:AngularFireDatabase,
    public afAuth: AngularFireAuth) {
      
  
  }


// serach function for the search bar
  onSearch(event){

this.searchUser(event.target.value,this.profile)
this.users[0] =this.profile;


}


searchUser(email:string,profile:Profile){
  email = email.toLowerCase();

  var ref = firebase.database().ref("users").orderByChild('email').equalTo(email);

  ref.on("child_added", function(snapshot) {

   var user = snapshot.val();
   profile.firstname = user.firstname;
   profile.lastname = user.lastname;
   profile.UserID = user.UserID;
   profile.email = user.email;
   profile.image = user.image;
   
   //return profile;

  }); 
  
  }

  addFriend(){
      this.afAuth.authState.subscribe(auth => {
      this.afDataBase.object(`users/${auth.uid}/friends/${this.profile.UserID}`).update(this.profile)
        .then(() => this.navCtrl.setRoot('NavTabsPage')
      

    )})


  }


 

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindFriendsPage');
  }

}
