import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,
  AlertController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList ,AngularFireObject} from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailValidator } from '../../validators/email';

import {Profile} from '../../models/profile.model';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public signupForm: FormGroup;
  public loading: Loading;
  profileData: AngularFireObject<Profile>;
  profile = {} as Profile;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authAF: AngularFireAuth, 
    private db:AngularFireDatabase,
 
    ) {

    this.signupForm = formBuilder.group({
     email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
     password: ['', Validators.compose([Validators.minLength(6), Validators.required])],

   });


  }


    signupUser(){
    if (!this.signupForm.valid){
  
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then( authData => {
        this.authAF.authState.subscribe(data => {
          this.createProfile();
          
        this.navCtrl.setRoot('LoginPage');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "Email already in use",
            buttons: [{
                text: "Ok",
                role: 'cancel'
              }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
      )}
}

  gotoLogin(){
    this.navCtrl.push('LoginPage');
  }
  createProfile(){
    this.authAF.authState.subscribe(auth => {
      
      this.profile.firstname = "";
      this.profile.lastname = "";
      this.profile.image = 'https://firebasestorage.googleapis.com/v0/b/w-a-s-p.appspot.com/o/StockLogo%2FwaspLogo.png?alt=media&token=f6174989-96b3-47de-bc2e-64c0ff19060c';
      
      this.db.object(`users/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot('LoginPage')
      

    )})
  }

}