import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, FabContainer } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-article",
  templateUrl: "article.html"
})
export class ArticlePage {
  article: { author: { id: number }; id: number };
  reader: { id: number; saved: Array<{ id: number }> };
  author: { id: number };
  savedByUser: boolean;
  isFollowing: boolean = false;
  upvoted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public api: Api,
    public toastCtrl: ToastController
  ) {
    this.article = this.navParams.get("article");
    this.author = this.article.author;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ArticlePage");
    // retrieve reader from storage
    this.storage.get("user").then(user => {
      this.reader = user;
      this.savedByUser =
        undefined !==
        this.reader.saved.find(item => {
          return item.id == this.article.id;
        });
      this.checkFollowStatus();
    });
  }

  saveArticle(fab: FabContainer) {
    fab.close();
    let endpoint = `article/${this.reader.id}/save/${this.article.id}`;
    this.api.put(endpoint).subscribe(
      resp => {
        this.storage.set("user", resp).then(() => {
          this.savedByUser = true;
        });
      },
      err => {
        let msg: string = `Failed to save the article. Please try again. Status: ${
          err.status
        }`;
        this.showToast(msg);
      }
    );
  }

  unsaveArticle(fab: FabContainer) {
    fab.close();
    let endpoint = `article/${this.reader.id}/unsave/${this.article.id}`;
    this.api.put(endpoint).subscribe(
      resp => {
        this.storage.set("user", resp).then(() => {
          this.savedByUser = false;
        });
      },
      err => {
        let msg: string = `Failure. Status: ${err.status}`;
        this.showToast(msg);
      }
    );
  }

  giveUpvote(fab: FabContainer) {
    fab.close();
    let endpoint = `article/${this.article.id}/like`;
    this.api.post(endpoint).subscribe(
      resp => {
        // to update article's upvote number
        this.article = resp;
        this.upvoted = true;
      },
      err => {
        let msg: string = `Failure. Status: ${err.status}`;
        this.showToast(msg);
      }
    );
  }

  checkFollowStatus() {
    let endpoint = `reader/${this.author.id}/checkFollow/${this.reader.id}`;
    this.api.get(endpoint).subscribe(
      resp => {
        this.isFollowing = resp.result;
      },
      err => {
        let msg: string = `Failure. Status: ${err.status}`;
        this.showToast(msg);
      }
    );
  }

  toggleFollowStatus() {
    if (this.isFollowing) this.unfollowAuthor();
    else this.followAuthor();
  }

  followAuthor() {
    let endpoint = `reader/${this.author.id}/follow/${this.reader.id}`;
    this.api.put(endpoint).subscribe(
      resp => {
        this.isFollowing = true;
      },
      err => {
        let msg: string = `Failure. Status: ${err.status}`;
        this.showToast(msg);
      }
    );
  }

  unfollowAuthor() {
    let endpoint = `reader/${this.author.id}/unfollow/${this.reader.id}`;
    this.api.put(endpoint).subscribe(
      resp => {
        this.isFollowing = false;
      },
      err => {
        let msg: string = `Failure. Status: ${err.status}`;
        this.showToast(msg);
      }
    );
  }

  giveReward(fab: FabContainer) {
    fab.close();
    
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "bottom",
      cssClass: "{ width: 50%; }"
    });
    toast.present();
  }
}
