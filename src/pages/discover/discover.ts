import { Storage } from "@ionic/storage";
import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import { NavController, ToastController, NavParams } from "ionic-angular";

/**
 * Generated class for the DiscoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {
  articles: Array<any>;
  interestedTopics: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.articles = [];
    this.interestedTopics = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DiscoverPage");
    // retrieve user's interested topics
    this.storage.get("user").then(user => {
      if (user.topics) {
        // not null, not undefined
        this.interestedTopics = user.topics;
        if (this.interestedTopics.length < 3) {
          this.showToast(
            "You haven't selected sufficient number of interested topics."
          );
          this.articles = []; // display nothing
        } else {
          this.getMostLikedArticles(this.interestedTopics[0]);
        }
      } else {
        this.interestedTopics = [];
        this.showToast("Failed to retrieve saved topics from Storage.");
      }
    });
  }

  getMostLikedArticles(topic: string) {
    // console.log('inside getmostlikedarticles')
    let endpoint = `article/mostLiked?topic=${topic}`;
    this.api.get(endpoint).subscribe(
      resp => {
        // console.log(resp)
        this.articles = resp;
      },
      err => {
        let msg: string =
          "Oops! Failed to retrieve trending articles. Please try again.";
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
