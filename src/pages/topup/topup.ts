import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { ViewController, NavParams, ToastController } from "ionic-angular";
import { Api } from "../../providers/api";

/**
 * Generated class for the TopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  enteredAmt: number;
  selectedAmt: number;
  user: {
    id: number;
  };
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: Api,
    public storage: Storage
  ) {
    this.selectedAmt = 0;
    this.enteredAmt = 0;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RewardPopoverPage");
    this.viewCtrl.showBackButton(true);
    this.viewCtrl.setBackButtonText("x");
    // retrieve user id
    this.storage.get("user").then(user => {
      if (user.id) {
        this.user = user;
        // display articles from user's followed authors in chronological order
      }
    });
  }

  selectAmount(amt: number) {
    this.enteredAmt = 0;
    this.selectedAmt = amt;
  }

  topUpWallet() {
    // TODO: api call
    let readerId = this.user.id;
    let endpoint = `reader/${readerId}/topUp`;
    let body: { amount: string } = { amount: "0" };
    if (this.selectedAmt) {
      body.amount = `${this.selectedAmt}`;
    } else if (this.enteredAmt) {
      if (this.enteredAmt % 1 != 0) {
        this.showToast("Only integer amount is allowed!", false);
        return;
      }
      body.amount = `${this.enteredAmt}`;
    } else {
      this.showToast("Please indicate an amount!", false);
      return;
    }
    this.api.put(endpoint, body).subscribe(
      resp => {
        // green success msg
        this.showToast("Thank you for your support!", true);
        // update user balance
        this.storage.set("user", resp).then(() => {
          // return the reward amount to article page
          // to update num of rewards
          this.viewCtrl.dismiss({
            amount: this.selectedAmt ? this.selectedAmt : this.enteredAmt
          });
        });
      },
      err => {
        let msg: string = `Action failed. Status: ${err.status}`;
        if (err.status == 406) {
          // insufficient balance
          msg = `Insufficient balance. Please top up.`;
        }
        this.showToast(msg, false);
      }
    );
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
