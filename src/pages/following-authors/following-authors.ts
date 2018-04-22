import { Api } from "./../../providers/api";
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the FollowingAuthorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-following-authors',
  templateUrl: 'following-authors.html',
})
export class FollowingAuthorsPage {
  authors: Array<{}>;
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
    this.authors = [];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowingAuthorsPage');
    // retrieve user id
    this.storage.get("user").then(user => {
      if (user.id) {
        this.user = user;
        // display articles from user's followed authors in chronological order
        this.getAuthors();
      } else {
        // this.articles = [];
        this.showToast("Failed to retrieve saved topics from Storage.");
      }
    });
  }
  getAuthors(refresher?) {
    let endpoint = `reader/${this.user.id}/getFollowingAuthors`;
    this.api.get(endpoint).subscribe(
      resp => {
        this.authors = resp;
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

  trackByAuthorId(index, item) {
    return item.id;
  }


}
