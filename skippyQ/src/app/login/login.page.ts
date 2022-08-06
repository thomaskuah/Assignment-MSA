import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import firebase from 'firebase';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private myToast: any;
  email: string;
  password: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private storage: Storage,
    public loadingController: LoadingController
  ) {

    this.storage.create();
  }

  login() {
    this.simpleLoader();
    console.log(this.email);
    // TODO: Based on user role go to different page
    console.log(this.email);
    console.log(this.password);

    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)

      .then((userCred) => {
        // this.router.navigate(['/tabs/new-loan']);
        // this.storage.get('role').then(e => {
        //   console.log(e)
        // })

        firebase
          .firestore()
          .collection('users')
          .doc(this.email)
          .get()
          .then((doc) => {

            console.log(doc.data().role);

            this.storage.set("role", doc.data().role).then(e => {
              if (doc.data().role == "user") {
                this.router.navigate(['/tabs/new-loan']);
              } else if (doc.data().role == "manager") {
                this.router.navigate(['/tabs/manage']);
              } else {
                this.router.navigate(['/tabs/new-loan']);
              }
              
              this.storage.set('email', this.email)
            })
           
          });
        // this.storage
        //   .set('role', this.email)
        //   .then(() => {
        //       this.loadingController.dismiss();

        //     });

        this.presentToast('Welcome to Loan Management Platform');
        this.loadingController.dismiss();
      })
      .catch((e) => {
        this.presentToast('Wrong credentials');
        this.loadingController.dismiss();
      });
  }
  presentToast(msg) {
    this.myToast = this.toastCtrl
      .create({
        message: msg,
        duration: 2000,
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
  }

  simpleLoader() {
    this.loadingController
      .create({
        message: 'Loading...',
      })
      .then((response) => {
        response.present();
      });
  }
}
