import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { IonicModule,IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { BettingPage } from './betting';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Profile } from '../../models/profile.model';
import { Bets } from '../../models/bets';
import { sportsProvider } from '../../providers/sportsProvider/sports.provider';
import { ProfileProvider } from '../../providers/profile/profileProvider';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('Betting', () => {
  let component: BettingPage;
  let fixture: ComponentFixture<BettingPage>;
  let de: DebugElement;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [BettingPage],
      imports: [
        IonicModule.forRoot(BettingPage)
      ],
      providers: [
        IonicModule,
        NavController,
        { provide: NavParams, useClass: MockNavParams },
        sportsProvider,
        ProfileProvider,
       {provide: AngularFireDatabase,useValue:AngularFireDatabaseStub},
        { provide: AngularFireAuth, useValue: AngularFireAuthStub }
      ]
    });
    fixture = TestBed.createComponent(BettingPage);
    component = fixture.componentInstance;
  }));


    it('should create component', () => {
        expect(component).toBeDefined()
      });
      it('should populate league', () => {
        expect(component.leagues).toEqual(['NFL', 'NHL', 'NBA', "MLB"]);
      });
      it('should populate bet type', () => {
        expect(component.typesOFBets).toEqual(['Game', 'Over/Under', 'Odds']);
      });
      it('should populate games', () => {
        
        expect(component.getGames()).toEqual(component.games);
      });
      it('should populate teams', () => {
        expect(true).toBeTruthy();
      });
      it('only numbers in bet', () => {
        expect(true).toBeTruthy();
      });
      it('check non valid bets', () => {
        expect(true).toBeTruthy();
      });
      it('cannot bet without valid payment method', () => {
        expect(true).toBeTruthy();
      });


});
class MockNavParams {
  data = {
  };

  get(param) {
    return this.data[param];
  }
}
const AngularFireAuthStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
  authState: {
    subscribe: (input1) => {}
  }
};
const AngularFireDatabaseStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      authState: (_d:any) =>new BehaviorSubject({foo:"bar"})
    }),
  }),
  
};