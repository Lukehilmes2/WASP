import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'nav-tabs.html',

})
export class NavTabsPage {


  homeTab = 'HomePage';
  socialTab = 'SocialPage';
  bettingTab = 'BettingPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
