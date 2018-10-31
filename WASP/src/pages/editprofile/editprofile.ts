import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,
  AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import {Profile} from '../../models/profile.model';
import {UserProfileProvider} from '../../providers/user-profile/user-profile';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  rootPage:any = "";
  public EditProfileForm: FormGroup;
  public loading: Loading;

  profile= {} as Profile;

  user: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, 
    public toastCTrl: ToastController, 
    public actionSheetCtrl: ActionSheetController, public zone: NgZone,

   // public userProvider: UserProfileProvider, <== error here!!!
    ) { 

   
  } //end of constructor


   ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }   

// want to use service here.
    createProfile(){
      this.afAuth.authState.subscribe(auth => {
        this.afDatabase.object(`users/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot('NavTabsPage')
        
  
      )})
    }


}
