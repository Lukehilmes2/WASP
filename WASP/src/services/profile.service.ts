/* import { Injectable} from '@angular/core';
import firebase, { User } from 'firebase/app';
//import 'firebase/database';

import { AngularFireAuth } from 'angularfire2/auth';
import {Profile} from '../models/profile.model'
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProfileService {

    public userProfile:firebase.database.Reference; 
    public currentUser: User;

    profile = {} as Profile;
    

    constructor( private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private afDataBase: AngularFireDatabase ){


        
    }// end of constructor 

    createProfile(profile){
        this.afAuth.authState.take(1).subscribe(auth=>{
            this.afDataBase.object(`users/${auth.uid}`).set(profile)
            .then(()=> this.navCtrl.setRoot('HomePage'))


        })
    
    }




}// end of class  */