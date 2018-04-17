import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the SavedArticlesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-saved-articles',
  templateUrl: 'saved-articles.html',
})
export class SavedArticlesPage {
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
    console.log('ionViewDidLoad SavedArticlesPage');
  // retrieve user id
  this.storage.get("user").then(user => {
    if (user.id) {
      this.user = user;
      this.getSavedArticles();
    } else {
      this.showToast("Failed to retrieve saved topics from Storage.");
    }
  });
  }

  getSavedArticles(refresher?){
    let endpoint = `article/${this.user.id}/getSavedArticles`;
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
