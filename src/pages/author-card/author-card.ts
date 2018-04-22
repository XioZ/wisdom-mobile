import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  @Input('author') author: {};

  // user: {
  //   id: number;
  // };

  // isFollowing: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public api: Api,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorCardPage');
     // retrieve user id
    //  this.storage.get("user").then(user => {
    //   if (user.id) {
    //     this.user = user;
    //   }
    //   //this.checkFollowStatus();
    // });
  }
  
  viewAuthor(){

  }

  // checkFollowStatus() {
  //   let endpoint = `reader/1/checkFollow/${this.user.id}`;
  //   this.api.get(endpoint).subscribe(
  //     resp => {
  //       this.isFollowing = resp.result;
  //     },
  //     err => {
  //       let msg: string = `Action failed. Status: ${err.status}`;
  //       this.showToast(msg, false);
  //     }
  //   );
  // }

  toggleFollowStatus() {
    // if (this.isFollowing) this.unfollowAuthor();
    // else this.followAuthor();
  }

  // followAuthor() {
  //   let endpoint = `reader/1/follow/${this.user.id}`;
  //   this.api.put(endpoint).subscribe(
  //     resp => {
  //       this.isFollowing = true;
  //     },
  //     err => {
  //       let msg: string = `Action failed. Status: ${err.status}`;
  //       this.showToast(msg, false);
  //     }
  //   );
  // }

  // unfollowAuthor() {
  //   let endpoint = `reader/1/unfollow/${this.user.id}`;
  //   this.api.put(endpoint).subscribe(
  //     resp => {
  //       this.isFollowing = false;
  //     },
  //     err => {
  //       let msg: string = `Action failed. Status: ${err.status}`;
  //       this.showToast(msg, false);
  //     }
  //   );
  // }

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
