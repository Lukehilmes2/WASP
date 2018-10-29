import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,
  AlertController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public signupForm: FormGroup;
  public loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authAF: AngularFireAuth, 
    private db:AngularFireDatabase,
 
    ) {

    this.signupForm = formBuilder.group({
     email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
     password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
   });


  }


    signupUser(){
    if (!this.signupForm.valid){
  
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then( authData => {
        this.authAF.authState.subscribe(data => {

          
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

}