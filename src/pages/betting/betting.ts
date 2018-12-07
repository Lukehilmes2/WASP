import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase, { User } from 'firebase/app';
import 'firebase/database';

import { Profile } from '../../models/profile.model';
import { Bets } from '../../models/bets';
import { sportsProvider } from '../../providers/sportsProvider/sports.provider';
import { ProfileProvider } from '../../providers/profile/profileProvider';




@IonicPage()
@Component({
  selector: 'page-betting',
  templateUrl: 'betting.html',
})

export class BettingPage {

  Bet = {} as Bets; // Bet model

  UserProfile = {} as Profile; // profile model
  UserProfile2 = {} as Profile; // profile model  OpponentProfile = {} as Profile; // profile model

  leagues = ['NFL', 'NHL', 'NBA', "MLB"];
  typesOFBets = ['Game', 'Over/Under', 'Odds'];

  friendsList: Array<Profile> = []; // array of profile models of your friends
  profileData: any;
  user: any;
  friends = [];

  week14 = []; // current week games in an array
  games = []; // array to ngFor through 
  selectableTeams = []; // array that you can select which team to bet on




  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDataBase:AngularFireDatabase,
    public afAuth: AngularFireAuth,private afDatabase:AngularFireDatabase,
    public sportsProvider:sportsProvider,
    public profileService:ProfileProvider,
    ) {
      
      this.profileService.getUserProfile(this.UserProfile2); // think this gets the opponents profile
      this.Bet.date = new Date().toDateString(); // gets date and sets it to Bet.date
      this.getFriends();
      this.week14 = sportsProvider.week14; // assigns to the json object
      this.getGames();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BettingPage');

  }

  getFriends() {
    // try to make friends names update when they change them. or could have an edit function to change them to what you want.
    this.afAuth.authState.subscribe(data => {

      this.profileData = firebase.database().ref(`users/${data.uid}/friends`);
      this.profileData.on('value', friendsSnapshot => {
        // this.friendsList = [];
        friendsSnapshot.forEach(friendsSnap => {
          var friend = friendsSnap.val();

          this.friendsList.push(friend);
          this.friends.push(friend);
          return false;
        });

      })

    })

  }

  setUserNames() {

    var oppProfile = this.friendsList[this.Bet.oppUser];
    this.Bet.oppUserID = oppProfile.UserID;
    this.Bet.oppUserName = oppProfile.firstname;
    this.Bet.oppPic = oppProfile.image;

    // user name here 
    this.Bet.usersName = this.UserProfile2.firstname;
    this.Bet.userPic = this.UserProfile2.image;

  }


  getGames() {
    var game = {};
    for (var i in this.week14) {
      var team1 = this.week14[i].game.team1;
      var team2 = this.week14[i].game.team2;
      game = { 'team1': team1, 'team2': team2 };
      this.games.push(game);
    }
    return this.games;
  }



  selectTeam() {
    this.getGames();
    this.selectableTeams.push(this.games[this.Bet.game].team1);
    this.selectableTeams.push(this.games[this.Bet.game].team2);

    // console.log(this.Bet.game)

  }

  createBet() {
    this.setUserNames();
    this.assignTeams();
 
    this.placeBet();
  }


  assignTeams() {

    this.getGames();

    if (this.Bet.usersTeam == 0) {
      this.Bet.usersTeam = this.games[this.Bet.game].team1;
      this.Bet.oppTeam = this.games[this.Bet.game].team2;
    }// end if 
    else {
      this.Bet.usersTeam = this.games[this.Bet.game].team2;
      this.Bet.oppTeam = this.games[this.Bet.game].team1;
    } // end else

  }// end assignTeams()


    placeBet(){ // takes the bet and uploads it to firebase hopfully for both you and the person betting against

        this.afAuth.authState.subscribe(data => {
         this.profileData= firebase.database().ref(`users/${data.uid}/currentBets`); 
         this.profileData.push(this.Bet);
         
        });
    }


}


