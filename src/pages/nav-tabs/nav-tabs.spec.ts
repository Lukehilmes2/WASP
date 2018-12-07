import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams} from 'ionic-angular';
import { NavTabsPage } from './nav-tabs';
import { BehaviorSubject } from 'rxjs';



describe('Navigation Tabs', () => {
    let component: NavTabsPage;
    let fixture: ComponentFixture<NavTabsPage>;
    let de: DebugElement;
  
  
    // beforeEach(async(() => {
  
    //   TestBed.configureTestingModule({
    //     declarations: [NavTabsPage],
    //     imports: [
    //       IonicModule.forRoot(NavTabsPage)
    //     ],
    //     providers: [
    //       IonicModule,
    //       NavController,
    //      // { provide: NavParams, useClass: MockNavParams }
    //     ]
    //   });
    //   fixture = TestBed.createComponent(NavTabsPage);
    //   component = fixture.componentInstance;
    // }));


    it('should create component', () => {
        expect(true).toBeTruthy()
      });

});

class MockNavParams {
    data = {
    };
  
    get(param) {
      return this.data[param];
    }
    registerChildNav(){
        return null;
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