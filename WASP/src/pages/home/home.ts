import { Component } from '@angular/core';
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


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',


})
export class HomePage {
  profile:Profile;
  


  

 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth, 
    private afDataBase:AngularFireDatabase,
    public menuCtrl:MenuController,
 
 
    ) {
      
      }

  
  ionViewDidLoad() {
  

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



}
