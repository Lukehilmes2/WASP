import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ToastController, ActionSheetController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app'
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Profile } from '../models/profile.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PhotoService {

    profile = {} as Profile;
    profileData: AngularFireObject<Profile>;
    captureDataUrl: string;
    photoRef: any;
    imageRef: any;
    user: any;
    filename: any;
    location: any;
    storageRef: any;
    
    constructor(private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,
                private camera: Camera, public toastCTrl: ToastController, 
                public zone: NgZone, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

        this.user = firebase.auth().currentUser;  
        this.storageRef = firebase.storage().ref();



    }


    photo(sourceType: number) {
        // Initiliaze all camera options.. we can also set width and height limits
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: sourceType,
        }
        // Use the camera to get the options, then build with the image data, capture the url.
        this.camera.getPicture(options).then((imageData) => {
            this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
            this.upload();
        }, (err) => {
            console.log(err);
        });
    }

    upload() {
        this.loader();
        this.imageRef = this.storageRef.child(`${this.location}/${this.user.uid}/${this.filename}.jpg`);

        // This will store into storage
        this.imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
            // Do something here when the data is succesfully uploaded!

            if(this.location == 'avatars') {
                this.profile.image = snapshot.downloadURL;
                this.photoRef = this.profile.image;
                
            }
            this.updateProfile();
            //this.success();
        });


    }

    // success() {
    //     let msg = this.toastCTrl.create({
    //         message: "Image successfull updated.",
    //         duration: 3000,
    //         position: "top"
    //     });
    //     msg.present(); 
        
    // }

    loader() {
        let loading = this.loadingCtrl.create({
          content: 'Uploading your picture...'
        });
      
        loading.present();
      
        setTimeout(() => {
            //this.success();
            loading.dismiss();
        }, 3000);
      }

    openMenu(user:Profile, file:string, page:string) {

        this.user = user;
        this.filename = file;
        this.location = page;

        let actionSheet = this.actionSheetCtrl.create({
          title: 'Choose Profile Picture',
          buttons: [
            {
              text: 'Select Photo',
              role: 'select',
              handler: () => {
                this.photo(0);  
                console.log('Select Photo clicked');
              }
            },{
              text: 'Take Picture',
              handler: () => {
                this.photo(1);  
                console.log('Take Picture clicked');
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }

      updateProfile() {
        this.afAuth.authState.subscribe(auth => {
            this.afDatabase.object(`account/${auth.uid}`)
            .set(this.profile);
      })
    }
}
