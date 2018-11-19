import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase, { User } from 'firebase/app';
import 'firebase/database';

import {Profile} from '../../models/profile.model';
import {Bets} from '../../models/bets'



@IonicPage()
@Component({
  selector: 'page-betting',
  templateUrl: 'betting.html',
})

export class BettingPage {

  Bet = {} as Bets;
  UserProfile ={} as Profile;
  OpponentProfile = {} as Profile;

  leagues = ['NFL','NHL','NBA',"MLB"];
  typesOFBets =['Game','Over/Under','Odds'];

  friendsList: Array<Object> = [];
  profileData: any;
  user: any;
  friends =[];

  games =['game1','game2','game3']; // temps, get this from the sports api 



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDataBase:AngularFireDatabase,
    public afAuth: AngularFireAuth,private afDatabase:AngularFireDatabase,) {
      
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BettingPage');
    this.getFriends();
  }

  getFriends(){
    this.afAuth.authState.subscribe(data => {
      this.profileData= firebase.database().ref(`users/${data.uid}/friends`); 
      this.profileData.on('value',friendsSnapshot =>{
       this.friendsList = [];
       friendsSnapshot.forEach( friendsSnap => {
 
         this.friendsList.push(friendsSnap.val());
         this.friends.push({Name:friendsSnap.val().firstname +" "+friendsSnap.val().lastname}) // not ideal at all 
       
       });
 
      })
       
     })

  }



}
