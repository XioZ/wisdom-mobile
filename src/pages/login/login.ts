import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  // template: `  `
})
export class LoginPage {
  private email: string;
  private pwd: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public api: Api,
    public storage: Storage) {
      this.email = 'zachery1028@gmail.com';
      this.pwd = 'password';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    let endpoint = 'reader/login';
    let body = {
      email: this.email,
      pwd: this.pwd
    };
    this.api.post(endpoint, body).subscribe(
      resp => {
        this.storage.set("user", resp).then(() => {
          // navigate to next page after user has been stored
          this.navCtrl.setRoot(TabsPage);
        });
      },
      err => {
        let msg: string = 'Sign in failed! Incorrect email or password.';
        if (err.status != 401) { // unauthorized
          msg += ` Status: ${err.status}`
        }

        let toast = this.toastCtrl.create({
          message: msg,
          duration: 2000,
          position: 'top'
          // cssClass: '{}' // TODO: style alert
        });
        toast.present();
      });
  }

  goSignup() {
    this.navCtrl.setRoot(SignupPage);
  }
}
