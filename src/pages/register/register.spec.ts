import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, LoadingController, Loading,
    AlertController,
    MenuController} from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from './register';
import 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import {ProfileProvider} from '../../providers/profile/profileProvider';
import { FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';


describe('Register', () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;
    let de: DebugElement;
  
  
    beforeEach(async(() => {
  
      TestBed.configureTestingModule({
        declarations: [RegisterPage],
        imports: [
          IonicModule.forRoot(RegisterPage)
        ],
        providers: [
          IonicModule,
          NavController,
          { provide: NavParams, useClass: MockNavParams },
          AuthProvider,
          FormBuilder,
          LoadingController,
          AlertController,
          {provide: AngularFireDatabase,useValue:AngularFireDatabaseStub},
          { provide: AngularFireAuth, useValue: AngularFireAuthStub }
        ]
      });
      fixture = TestBed.createComponent(RegisterPage);
      component = fixture.componentInstance;
    }));

    it('should create component', () => {
        expect(component).toBeDefined();
      });
      it('email field validity', () => {
    
        component.signupForm.setValue({email:"Foo@.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"@.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"@bar.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"________.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"#@%^%#$@#$@#.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy();
    
        component.signupForm.setValue({email:"@domain.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy();
    
        component.signupForm.setValue({email:"Joe Smith <email@domain.com>",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy();
    
        component.signupForm.setValue({email:"email.domain.com",password:"Password"})
        expect(component.signupForm.valid).toBeFalsy();
      });
    
      it('password field validity', () => {
        
        component.signupForm.setValue({email:"Foo@bar.com",password:""})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"P"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"Pa"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"Pas"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"Pass"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"Passw"})
        expect(component.signupForm.valid).toBeFalsy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"Passwo"})
        expect(component.signupForm.valid).toBeTruthy(); 
    
        component.signupForm.setValue({email:"Foo@bar.com",password:"111111"})
        expect(component.signupForm.valid).toBeTruthy(); 
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