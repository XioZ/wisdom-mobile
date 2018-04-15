import { Component } from "@angular/core";
import {
  NavParams,
  ViewController,
  ToastController,
  AlertController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Api } from "../../providers/api";

/**
 * Generated class for the QuestionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-question-modal",
  templateUrl: "question-modal.html"
})
export class QuestionModalPage {
  author: { id: number; qtnPrice: number };
  reader: { id: number };
  title: string;
  question: string;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public api: Api
  ) {
    this.author = this.navParams.get("author");
    if (!this.author) this.showToast("Author undefined!", false);
    this.title = "";
    this.question = "";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad QuestionModalPage");
    // retrieve reader from storage
    this.storage.get("user").then(user => {
      if (!user) this.showToast("Failed to retrieve user from Storage!", false);
      else this.reader = user;
    });
  }

  showConfirmAndAskQuestion() {
    if (!this.title || !this.question) {
      this.showToast("Please enter a question with title!", false);
      return;
    }
    let confirm = this.alertCtrl.create({
      title: "Send this question?",
      message: `S$${
        this.author.qtnPrice
      } will be deducted from your balance, if the author replies.`,
      buttons: [
        {
          text: "Maybe later",
          handler: () => {
            // alert dismissed automatically
            // when button handler is clicked
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes!",
          handler: () => {
            // user has clicked the alert button
            // manually begin the alert's dismiss transition
            let navTransition = confirm.dismiss();

            // start some async method
            let endpoint = `question/${this.reader.id}/ask/${this.author.id}`;
            let body = { title: this.title, content: this.question };
            this.api.post(endpoint, body).subscribe(
              resp => {
                // update user in Storage
                this.storage.set("user", resp).then(() => {
                  this.showToast(
                    "Question sent! We'll let you know once the author replies.",
                    true
                  );
                });
                // only pop the previous page (where alert is triggered)
                // after alert dismiss animation is finished
                // and async operation is completed
                navTransition.then(() => {
                  this.viewCtrl.dismiss();
                });
              },
              err => {
                let msg: string = `Action failed. Status: ${err.status}`;
                if (err && err.status == 400) {
                  msg = `Insufficient balance! Question not sent.`;
                }
                this.showToast(msg, false);
              }
            );
            // return false to disable the automatic dismiss
            // of alert when handler button is clicked
            return false;
          }
        }
      ]
    });
    confirm.present();
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
