import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, LoadingController, Loading,
    AlertController,
    MenuController} from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './home';
import 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import {ProfileProvider} from '../../providers/profile/profileProvider';
import { FormBuilder } from '@angular/forms';


describe('Home', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let de: DebugElement;
  
  
    beforeEach(async(() => {
  
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(HomePage)
        ],
        providers: [
          IonicModule,
          NavController,
          { provide: NavParams, useClass: MockNavParams },
          FormBuilder,
          LoadingController,
          AlertController,
          {provide: AngularFireDatabase,useValue:AngularFireDatabaseStub},
          { provide: AngularFireAuth, useValue: AngularFireAuthStub },
          MenuController,
          ProfileProvider
        ]
      });
      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
    }));


    it('should create component', () => {
        expect(component).toBeDefined()
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