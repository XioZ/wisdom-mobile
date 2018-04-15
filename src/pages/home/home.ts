import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  articles: Array<{}>;
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
    this.articles = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
    // retrieve user id
    this.storage.get("user").then(user => {
      if (user.id) {
        this.user = user;
        // display articles from user's followed authors in chronological order
        this.getArticlesFromFollowedAuthors();
      } else {
        // this.articles = [];
        this.showToast("Failed to retrieve saved topics from Storage.");
      }
    });
  }

  getArticlesFromFollowedAuthors(refresher?) {
    let endpoint = `article/newest?readerId=${this.user.id}`;
    this.api.get(endpoint).subscribe(
      resp => {
        this.articles = resp;
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

  trackByArticleId(index, item) {
    return item.id;
  }
}
