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
  selector: "page-question-detail",
  templateUrl: "question-detail.html"
})
export class QuestionDetailPage {
  question: {
    author: {id: number}
    id: number;
    title: string;
    content: string;
    price: number;
  };
  author: {id: number};

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public api: Api
  ) {
    this.question = this.navParams.get("question");
    this.author = this.question.author;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ArticlePage");
    this.retrieveQuestion(); // and check save status & follow status in callback
  }

  retrieveQuestion() {
    // let endpoint = `question/${this.question.id}`;
    // this.api.get(endpoint).subscribe(
    //   resp => {
    //     this.question = resp;
    //     if (resp.content) {
    //       // str.replace() only replaces first occurence
    //       // use regular expression and set global replacement
    //       this.question.content = resp.content
    //         // .replace(/<div>/g, "TAG OPEN")
    //         // .replace(new RegExp("</div>", "g"), "TAG CLOSE")
    //         .replace(/<br>/g, "<br>");
    //       // console.log(this.article);
    //     }
    //     if (resp.author) {
    //       this.author = resp.author;
    //     }
    //   },
    //   err => {
    //     let msg: string = `Failed to retrieve the complete article. Status: ${
    //       err.status
    //     }`;
    //     this.showToast(msg, false);
    //   }
    // );
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
