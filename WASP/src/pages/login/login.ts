import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading,
  AlertController, ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    goToResetPassword(){
      let modal = this.modalCtrl.create('ResetPasswordPage');
      modal.present();
    }

    createAccount(){
      this.navCtrl.push('RegisterPage');
    }

     loginUser(){
      if (!this.loginForm.valid){
       
      } else {
         this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          this.navCtrl.setRoot('AccountPage');

        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: "Username or Password invalid",
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
    }
}