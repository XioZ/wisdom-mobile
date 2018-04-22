import { QuestionModalPage } from "./../question-modal/question-modal";
import { Component, Input } from '@angular/core';
import {
  NavController,
  NavParams,
  ToastController,
  ModalController
} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Api } from "./../../providers/api";

/**
 * Generated class for the AuthorCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-author-card',
  templateUrl: 'author-card.html',
})
export class AuthorCardPage {
  @Input('author') author: { id: number };

  user: {
    id: number;
  };

  isFollowing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public api: Api,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorCardPage');
    this.storage.get("user").then(user => {
      if (user.id) {
        this.user = user;
        console.log('userId' + user.id);
        // display articles from user's followed authors in chronological order
        this.checkFollowStatus();
      }
    });
  }

  viewAuthor() {

  }

  checkFollowStatus() {
    let endpoint = `reader/${this.author.id}/checkFollow/${this.user.id}`;
    this.api.get(endpoint).subscribe(
      resp => {
        this.isFollowing = resp.result;
      },
      err => {
        let msg: string = `Action failed. Status: ${err.status}`;
        this.showToast(msg, false);
      }
    );
  }

  toggleFollowStatus() {
    if (this.isFollowing) this.unfollowAuthor();
    else this.followAuthor();
  }

  followAuthor() {
    let endpoint = `reader/${this.author.id}/follow/${this.user.id}`;
    this.api.put(endpoint).subscribe(
      resp => {
        this.isFollowing = true;
      },
      err => {
        let msg: string = `Action failed. Status: ${err.status}`;
        this.showToast(msg, false);
      }
    );
  }

  unfollowAuthor() {
    let endpoint = `reader/${this.author.id}/unfollow/${this.user.id}`;
    this.api.put(endpoint).subscribe(
      resp => {
        this.isFollowing = false;
      },
      err => {
        let msg: string = `Action failed. Status: ${err.status}`;
        this.showToast(msg, false);
      }
    );
  }

  askQuestion() {
    let modal = this.modalCtrl.create(QuestionModalPage, {
      author: this.author
    });
    console.log(this.author);
    modal.present();
  }

  showToast(msg: string, success: boolean) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      cssClass: success ? "toast-success" : "toast-error"
    });
    toast.present();
  }

}
