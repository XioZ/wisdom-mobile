import { Api } from "./../../providers/api";
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  questions: Array<{}>;
  user: {
    id: number;
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public api: Api,
    public toastCtrl: ToastController
  ) {
    this.questions = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
    // retrieve user id
    this.storage.get("user").then(user => {
      if (user.id) {
        this.user = user;
        // display articles from user's followed authors in chronological order
        this.getQuestionsByReader();
      } else {
        // this.articles = [];
        this.showToast("Failed to retrieve saved topics from Storage.");
      }
    });
  }


  getQuestionsByReader(refresher?) {
    let endpoint = `question?readerId=${this.user.id}`;
    this.api.get(endpoint).subscribe(
      resp => {
        this.questions = resp;
        if (refresher) refresher.complete();
      },
      err => {
        if (refresher) refresher.complete();
        let msg: string =
          "Oops! Failed to retrieve articles from your followed authors. Please try again.";
        if (err.status) {
          msg += ` Status: ${err.status}`;
        }
        this.showToast(msg);
      }
    );
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  trackByQuestionId(index, item) {
    return item.id;
  }

}
