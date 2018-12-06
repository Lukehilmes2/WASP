import { Component,ViewChild, OnInit, Renderer  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,
  AlertController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

import {Profile} from '../../models/profile.model'
import { MenuController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {Bets} from '../../models/bets';
import {ProfileProvider} from'../../providers/profile/profileProvider';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',


})
export class HomePage {
  
  profile:Profile;

  Bet = {} as Bets; // Bet model

  UserProfile ={} as Profile; // profile model
  OpponentProfile = {} as Profile; // profile model


  betList: Array<Bets> = []; // array of profile models of your friends

  profileData: any;
  user: any;
  friends =[];

  week14= []; // current week games in an array
  games=[]; // array to ngFor through 
  selectableTeams =[]; // array that you can select which team to bet on


  
 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth, 
    private afDataBase:AngularFireDatabase,
    public menuCtrl:MenuController,
    public profileService:ProfileProvider,
 
 
    ) {
   
      this.profileService.getUserProfile(this.UserProfile);
      
      }

  
      getBets(){
        // try to make friends names update when they change them. or could have an edit function to change them to what you want.
            this.afAuth.authState.subscribe(data => {
             this.profileData= firebase.database().ref(`users/${data.uid}/currentBets`); 
             this.profileData.on('value',betsSnapshot =>{
             
              betsSnapshot.forEach( BetSnap => {
                var bet = BetSnap.val();
               
                this.betList.push(bet);
                
                return false;
              });
        
             })
              
            })
        
          }




  ionViewDidLoad() {
    this.getBets();

    }
   


openMenu(){
  this.menuCtrl.open();
}

closeMenu() {
  this.menuCtrl.close();
}

toggleMenu() {
  this.menuCtrl.toggle();
}

goToNotifications(){
  this.navCtrl.push('NotificationsPage');
}



}
