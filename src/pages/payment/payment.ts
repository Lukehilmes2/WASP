import { Braintree, ApplePayOptions, PaymentUIOptions, PaymentUIResult } from '@ionic-native/braintree';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import * as dropin from 'braintree-web-drop-in';
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'payment.html',
})

export class PaymentPage {
    BRAINTREE_TOKEN = 'sandbox_dwyqs646_wms26tngpxd9t4r5';
    braintreeIsReady: boolean;
    dropIninstance: any;
    appleOptions: ApplePayOptions = {
        merchantId: 'wms26tngpxd9t4r5',
        currency: 'USD',
        country: 'US'
    };

    paymentOptions: PaymentUIOptions = {
        amount: '14.99',
        primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
    };
    constructor(private braintree: Braintree) {
        this.braintree.initialize(this.BRAINTREE_TOKEN);
        //this.braintree.setupApplePay(this.appleOptions);
        //this.braintree.presentDropInPaymentUI(this.paymentOptions);

        

          }
          

    

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
              alert("incorrect information");
              console.log("Nope");
            // deal with error
          }
          else {
            //send nonce to the server
            console.log("Paid!")
    
          }
        });
      }



}




