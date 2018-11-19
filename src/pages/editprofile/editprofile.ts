import { Component,NgZone, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,
  AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import {Profile} from '../../models/profile.model';

import {ProfileProvider} from '../../providers/profile/profileProvider'


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

 rootPage:any = "";
  public EditProfileForm: FormGroup;
  public loading: Loading;

  profileData: AngularFireObject<Profile>;
  profile = {} as Profile;
  user: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, 
    public toastCTrl: ToastController, 
    public actionSheetCtrl: ActionSheetController, public zone: NgZone,
    public profileService:ProfileProvider,

    ) { 
       
  } //end of constructor


   ionViewDidLoad() { 
    console.log('ionViewDidLoad EditProfilePage');

   this.profileService.getUserProfile(this.profile); // gets user profile info and loads info into fields 

  }   

  
// want to use service here.
     updateProfile(){
      this.profileService.updateProfile(this.profile);
      this.navCtrl.setRoot('NavTabsPage');
     
  } 

  changeProfilePic(){
    
  }


}
