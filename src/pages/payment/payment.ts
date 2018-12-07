import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Profile } from '../../models/profile.model';
import * as dropin from 'braintree-web-drop-in';

declare var require: any
var braintree = require("braintree");

@IonicPage()
@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html',
})

export class PaymentPage {
    BRAINTREE_TOKEN = 'sandbox_dwyqs646_wms26tngpxd9t4r5';
    MERCHANT_ID = 'wms26tngpxd9t4r5';
    PUBLIC_KEY = 'tbv5pdskbtrvvr5j';
    PRIVATE_KEY = 'da56e8a3fdfd15d90739880fb1bd5639';

    profileData: AngularFireObject<Profile>;
    profile = {} as Profile;
    user: any;

    braintreeIsReady: boolean;
    dropIninstance: any;

    // gateway = braintree.connect(
    //     {
    //         environment: braintree.Environment.Sandbox,
    //         merchantId: this.MERCHANT_ID,
    //         publicKey: this.PUBLIC_KEY,
    //         privateKey: this.PRIVATE_KEY
    //     });


    constructor(public navCtrl: NavController, public navParams: NavParams,
        public authData: AuthProvider, public formBuilder: FormBuilder,
        public loadingCtrl: LoadingController, public alertCtrl: AlertController,
        public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {

        this.user = firebase.auth().currentUser;







    }

    //   generateClientToken() {
    //     console.log("Generating client token...");

    //     var gateway = braintree.connect(
    //       {
    //         environment: braintree.Environment.Sandbox,
    //         merchantId: this.MERCHANT_ID,
    //         publicKey: this.PUBLIC_KEY,
    //         privateKey: this.PRIVATE_KEY
    //       })
    //       console.log(gateway);
    //       gateway.clientToken.generate({
    //         customerId: this.user.uid
    //       }, function (err, response) {
    //         console.log(response)
    //         if (err) {
    //           console.log("Bad");
    //         }
    //         else {
    //           console.log(response.clientToken);
    //           this.BRAINTREE_TOKEN = response.clientToken;
    //         }
    //       });
    //   }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PaymentPage');
        dropin.create({
            authorization: this.BRAINTREE_TOKEN,
            selector: '#dropin-container',
            paypal: {},
            venmo: {
                allowNewBrowserTab: false
              }
        }, (err, dropinInstance) => {
                if (err) {
                  // Handle any errors that might've occurred when creating Drop-in
                  console.error(err);
                  return;
                }
                console.log(dropinInstance);
                this.dropIninstance = dropinInstance;
                this.braintreeIsReady = true;


              });
              


    }

    ionViewWillLeave(){
        console.log("Tearing down...");
        this.dropIninstance.teardown(function(err) {
            if (err) { console.error('An error occurred during teardown:', err); }
        });
    }


    pay() {


        this.dropIninstance.requestPaymentMethod((err, payload) => {
            if (err) {
                let alert = this.alertCtrl.create({
                    title: 'Incorrect Information',
                    subTitle: 'Enter a valid payment',
                    buttons: ['Dismiss']
                });
                alert.present();
                //console.log("Nope");
                // deal with error
            }
            else {
                //send nonce to the server
                let alert = this.alertCtrl.create({
                    title: 'Payment Accepted',
                    buttons: ['Dismiss']
                });
                alert.present();


                console.log(payload.nonce)

            }
        });
    }



}




