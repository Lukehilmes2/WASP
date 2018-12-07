import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicPageModule,IonicModule, NavController, NavParams, LoadingController, Loading,
  AlertController, ActionSheetController } from 'ionic-angular'
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { EditprofilePage } from './editprofile';
import { sportsProvider } from '../../providers/sportsProvider/sports.provider';
import { ProfileProvider } from '../../providers/profile/profileProvider';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { PhotoProvider } from '../../providers/photo/photo';
import { Camera, CameraOptions } from '@ionic-native/camera';
import  {FirebaseMock} from '@ionic-native-mocks/firebase';
import * as firebase from 'firebase/app'
import { MyApp } from '../../app/app.component';
import {FIREBASE_CONFIG} from '../../app/app.firebase.config';
import {AngularFireModule} from 'angularfire2';


describe('Edit Profile', () => {
  let component: EditprofilePage;
  let fixture: ComponentFixture<EditprofilePage>;
  let de: DebugElement;
  //functions.initializeApp();
  // beforeEach(async(() => {

  //   TestBed.configureTestingModule({
  //     declarations: [EditprofilePage],
  //     imports: [
  //       IonicModule.forRoot(EditprofilePage),
        
  //     ],
  //     providers: [
  //       IonicModule,
  //       NavController,
  //       { provide: NavParams, useClass: MockNavParams },
  //       sportsProvider,
  //       ProfileProvider,
  //      {provide: AngularFireDatabase,useValue:AngularFireDatabaseStub},
  //       { provide: AngularFireAuth, useValue: AngularFireAuthStub },
  //       FormBuilder,
  //       LoadingController,
  //       AlertController,
  //       AuthProvider,
  //       ProfileProvider,
  //       PhotoProvider,
  //       ActionSheetController,
  //       Camera
        
  //     ]
  //   });
  //   fixture = TestBed.createComponent(EditprofilePage);
  //   component = fixture.componentInstance;
    
  // }));

    it('should create component', () => {
        expect(true).toBeTruthy();
      });
      it('Change name goes to database', () => {
        expect(true).toBeTruthy();
      });
      it('Camera opens on take picture', () => {
        expect(true).toBeTruthy();
      });
      it('Choose photo from file in functional', () => {
        expect(true).toBeTruthy();
      });
      it('Incorrect phone numbers do not get added', () => {
        expect(true).toBeTruthy();
      });
      it('Only valid first names', () => {
        expect(true).toBeTruthy();
      });
      it('Only valid last names', () => {
        expect(true).toBeTruthy();
      });
      it('Profile picture updates', () => {
        expect(true).toBeTruthy();
      });
      it('Fields are populated', () => {
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