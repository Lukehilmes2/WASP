import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginPage } from './login';
import { IonicModule, Platform, NavController, NavParams,LoadingController, Loading,AlertController, ModalController} from 'ionic-angular/index';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs';

describe('Login', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        IonicModule,
        NavController,
        {provide: NavParams, useClass: MockNavParams},
        LoadingController,
        AlertController,
        ModalController,
        AuthProvider,
        {provide:AngularFireAuth, useValue: AngularFireAuthStub}
      ]
    });
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  }));


  it('should create component', () => expect(component).toBeDefined());
  it('should be true', () => 
  expect(true).toBe(true)
  );

});

class MockNavParams{
  data = {
  };

  get(param){
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
};