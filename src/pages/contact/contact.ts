import { TopupPage } from "./../topup/topup";
import { Api } from "./../../providers/api";
import { Component } from "@angular/core";
import { 
  NavController, 
  NavParams, 
  ToastController,
  PopoverController,
  ModalController,
  FabContainer
 } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user: {
    id: number;
    name: string;
    email: string;
    balance: number;
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public api: Api,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
    // retrieve user id
    this.storage.get("user").then(user => {
      if (user.id) {
        this.user = user;
        // display articles from user's followed authors in chronological order
      } else {
        this.showToast("Failed to retrieve saved topics from Storage.");
      }
    });
  }
  
  topUp(fab: FabContainer) {
    //fab.close();
    let popover = this.popoverCtrl.create(TopupPage, {

    });
    popover.onDidDismiss(data => {
      this.ionViewDidLoad();
    });
    popover.present({});
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
}
