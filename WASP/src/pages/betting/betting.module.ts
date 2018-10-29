import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BettingPage } from './betting';

@NgModule({
  declarations: [
    BettingPage,
  ],
  imports: [
    IonicPageModule.forChild(BettingPage),
  ],
})
export class BettingPageModule {}
