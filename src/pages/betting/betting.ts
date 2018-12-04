import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase, { User } from 'firebase/app';
import 'firebase/database';

import {Profile} from '../../models/profile.model';
import {Bets} from '../../models/bets';
import {sportsProvider} from'../../providers/sportsProvider/sports.provider';



@IonicPage()
@Component({
  selector: 'page-betting',
  templateUrl: 'betting.html',
})

export class BettingPage {

  Bet = {} as Bets; //model

  UserProfile ={} as Profile;
  OpponentProfile = {} as Profile;

  leagues = ['NFL','NHL','NBA',"MLB"];
  typesOFBets =['Game','Over/Under','Odds'];

  friendsList: Array<Object> = [];
  profileData: any;
  user: any;
  friends =[];

  week14= [];
  games=[];
  selectableTeams =[];






  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDataBase:AngularFireDatabase,
    public afAuth: AngularFireAuth,private afDatabase:AngularFireDatabase,
    public sportsProvider:sportsProvider,) {
      
      this.getFriends();
      this.week14 = sportsProvider.week14;
      this.getGames();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BettingPage');
    
  }

  getFriends(){
    // try to make friends names update when they change them. or could have an edit function to change them to what you want.
        this.afAuth.authState.subscribe(data => {
         this.profileData= firebase.database().ref(`users/${data.uid}/friends`); 
         this.profileData.on('value',friendsSnapshot =>{
         // this.friendsList = [];
          friendsSnapshot.forEach( friendsSnap => {
            var friend = friendsSnap.val();
           
            this.friendsList.push(friend);
            this.friends.push(friend);
            return false;
          });
    
         })
          
        })
    
      }


  getGames(){
    var game={};
    for (var i in this.week14) {
      var team1 = this.week14[i].game.team1;
      var team2 = this.week14[i].game.team2;
      game ={'team1':team1,'team2':team2};
      this.games.push(game);
    
  }
  return this.games;

  }

  selectTeam(){
    console.log()

  }

  createBet(){
    console.log(this.Bet.oppUser);
  }



}
