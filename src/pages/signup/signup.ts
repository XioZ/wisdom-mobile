import { TopicsPage } from "./../topics/topics";
import { LoginPage } from "./../login/login";
import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  private fName: string = "";
  private lName: string = "";
  private email: string = "";
  private pwd: string = "";

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public api: Api,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  doSignup() {
    if (!this.fName || !this.lName || !this.email || !this.pwd) {
      this.showToast("Please fill in all fields!", false);
      return;
    }
    let endpoint = "reader";
    let body = {
      name: this.fName + " " + this.lName,
      email: this.email,
      pwd: this.pwd
    };
    this.api.post(endpoint, body).subscribe(
      resp => {
        // user login to retrieve id
        this.api.post(`${endpoint}/login`, body).subscribe(
          resp => {
            // transition to next page only when user has been stored away
            this.storage.set("user", resp).then(() => {
              // console.log(resp);
              // this.storage.get("user").then(user => {
              //   console.log(user);
              // });
              this.navCtrl.setRoot(TopicsPage);
            });
          },
          err => {
            let msg = `Account created but login failed. Status: ${err.status}`;
            this.showToast(msg, false);
          }
        );
      },
      err => {
        let msg = "Create account failed. ";
        if (err.status == 400 || err.status == 409) {
          // empty request OR email conflict
          msg += `Status: ${err.status}`;
        }
        this.showToast(msg, false);
      }
    );
  }

  goLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  showToast(msg: string, success: boolean) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3500,
      position: "top",
      cssClass: success ? "toast-success" : "toast-error"
    });
    toast.present();
  }
}
