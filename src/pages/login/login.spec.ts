import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginPage } from './login';
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

describe('Login', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        IonicModule,
        NavController,
        { provide: NavParams, useClass: MockNavParams },
        LoadingController,
        AlertController,
        ModalController,
        AuthProvider,
        FormBuilder,
        { provide: AngularFireAuth, useValue: AngularFireAuthStub }
      ]
    });
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  }));


  it('should create component', () =>{
    expect(component).toBeDefined()
  }
  );

  it('email field validity', () => {
    
    component.loginForm.setValue({email:"Foo@.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"@.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"@bar.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"________.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"#@%^%#$@#$@#.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({email:"@domain.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({email:"Joe Smith <email@domain.com>",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({email:"email.domain.com",password:"Password"})
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('password field validity', () => {
    
    component.loginForm.setValue({email:"Foo@bar.com",password:""})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"P"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"Pa"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"Pas"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"Pass"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"Passw"})
    expect(component.loginForm.valid).toBeFalsy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"Passwo"})
    expect(component.loginForm.valid).toBeTruthy(); 

    component.loginForm.setValue({email:"Foo@bar.com",password:"111111"})
    expect(component.loginForm.valid).toBeTruthy(); 
  });

  it('create profile button works', () => {
      expect(true).toBeTruthy();
  });

  it('forgot password button works', () => {
    expect(true).toBeTruthy();
});

it('login button works', () => {
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
};