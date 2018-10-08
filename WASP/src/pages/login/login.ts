import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from 'angularfire2/auth';
//import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(private afAuth:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  Login(user: User){
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
    if(result){
      this.navCtrl.setRoot('HomePage');
    }

    } 
    catch(e){
      console.log(e);
    }
  }

  Register(){
    this.navCtrl.push('RegisterPage');
  }

}
