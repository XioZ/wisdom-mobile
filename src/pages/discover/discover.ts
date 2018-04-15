import { Storage } from "@ionic/storage";
import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import {
  NavController,
  ToastController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { TopicsPopoverPage } from "../topics-popover/topics-popover";

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
  showTopic: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public storage: Storage
  ) {
    this.articles = [];
    this.interestedTopics = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DiscoverPage");
    this.getSavedTopicsAndFetchArticles();
  }

  getSavedTopicsAndFetchArticles(refresher?) {
    // retrieve user's interested topics
    this.storage.get("user").then(user => {
      if (user && user.topics) {
        // not null, not undefined
        this.interestedTopics = user.topics;
        if (this.interestedTopics.length < 3) {
          this.showToast(
            "Help us find you the articles you like by adding more interested topics in Me Tab."
          );
        }
        if (this.showTopic) {
          // showTopic alrd set, triggered by refresh
          // check if the current interested topics contain showTopic
          if (this.interestedTopics.indexOf(this.showTopic) > -1) {
            this.getMostLikedArticles(refresher);
          } else {
            // this topic not contained in user's current saved interested topics
            // default to display 1st topic in his saved topics
            this.showTopic = this.interestedTopics[0];
            this.getMostLikedArticles(refresher);
          }
        } else {
          // first time discover page is loaded
          // display trending articles of user's 1st interested topic
          this.showTopic = this.interestedTopics[0];
          this.getMostLikedArticles(refresher);
        }
      } else {
        // user or his saved topics not found
        // this.interestedTopics = [];
        this.showToast("Failed to retrieve saved topics from Storage.");
      }
    });
  }

  // display most upvoted articles based on the showing topic
  getMostLikedArticles(refresher?) {
    if (!this.showTopic) return;
    // console.log('inside getmostlikedarticles')
    let endpoint = `article/mostLiked?topic=${this.showTopic}`;
    this.api.get(endpoint).subscribe(
      resp => {
        // console.log(resp)
        if (refresher) refresher.complete();
        this.articles = resp;
      },
      err => {
        if (refresher) refresher.complete();
        let msg: string =
          "Oops! Failed to retrieve trending articles. Please try again.";
        if (err.status) {
          msg += ` Status: ${err.status}`;
        }
        this.showToast(msg);
      }
    );
  }

  showTopicsPopover(event) {
    let popover = this.popoverCtrl.create(TopicsPopoverPage, {
      topics: this.interestedTopics
    });
    popover.onDidDismiss(data => {
      if (data && data.topic) {
        this.showTopic = data.topic;
        this.getMostLikedArticles();
      }
    });
    popover.present({ ev: event });
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3500,
      position: "top"
    });
    toast.present();
  }

  trackByArticleId(index, item) {
    return item.id;
  }
}
