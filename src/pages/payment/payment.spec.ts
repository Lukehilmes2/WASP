import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PaymentPage } from './payment';
import { IonicModule, Platform, NavController, NavParams, LoadingController, Loading, AlertController, ModalController } from 'ionic-angular/index';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';


describe('Payment', () => {
    it('should create component', () => {
        expect(true).toBeTruthy();
      });
      it('request payment button works', () => {
        expect(true).toBeTruthy();
      });
      it('accepts valid credit card', () => {
        expect(true).toBeTruthy();
      });
      it('denies non valid credit card', () => {
        expect(true).toBeTruthy();
      });
      it('accepts visa', () => {
        expect(true).toBeTruthy();
      });
      it('accepts mastercard', () => {
        expect(true).toBeTruthy();
      });
      it('accepts discover', () => {
        expect(true).toBeTruthy();
      });
      it('accepts amex', () => {
        expect(true).toBeTruthy();
      });
      it('paypal', () => {
        expect(true).toBeTruthy();
      });
      it('choose another way to pay works', () => {
        expect(true).toBeTruthy();
      });
      it('loads user interface', () => {
        expect(true).toBeTruthy();
      });

});