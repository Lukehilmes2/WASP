import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FindFriendsPage } from './find-friends';
import 'firebase/database';
import { BehaviorSubject } from 'rxjs';


describe('Find friends', () => {
    let component: FindFriendsPage;
    let fixture: ComponentFixture<FindFriendsPage>;
    let de: DebugElement;
  
  
    beforeEach(async(() => {
  
      TestBed.configureTestingModule({
        declarations: [FindFriendsPage],
        imports: [
          IonicModule.forRoot(FindFriendsPage)
        ],
        providers: [
          IonicModule,
          NavController,
          { provide: NavParams, useClass: MockNavParams },
          {provide: AngularFireDatabase,useValue:AngularFireDatabaseStub},
          { provide: AngularFireAuth, useValue: AngularFireAuthStub }
        ]
      });
      fixture = TestBed.createComponent(FindFriendsPage);
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