import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,
  AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

import * as firebase from 'firebase/app'

import { AngularFireAuth } from 'angularfire2/auth';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoService } from '../../services/photo.service';

import {Profile} from '../../models/profile.model'



@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  rootPage:any = "";
  public EditProfileForm: FormGroup;
  public loading: Loading;

  //profile: Profile;

  profileData: AngularFireObject<Profile>; // what is this 

  captureDataUrl: string;
  photoRef: any;
  imageRef: any;
  user: any;
  filename: any;
  storageRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authAF: AngularFireAuth, public afDatabase: AngularFireDatabase, private camera: Camera, public toastCTrl: ToastController, 
    public actionSheetCtrl: ActionSheetController, public zone: NgZone, public srvPhoto: PhotoService, 
    ) {


    this.EditProfileForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      //image:[''],
      DOB:[''],

   });
   

  }



   ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.authAF.authState.subscribe(data => {
     
         this.profileData = this.afDatabase.object(`users/${data.uid}`); // GRABS DATA BASED ON USER AND SET TO ANGULARFIREOBJECT
        this.profileData.valueChanges().subscribe(res => {
            if(res) {
                this.user = res;
                
            }
        });
      
      });
  }   



  updateUser() {
    this.authAF.authState.subscribe(auth => {this.afDatabase.object(`users/${auth.uid}`).set(this.user).then(() => this.navCtrl.pop());
  })
}



}
