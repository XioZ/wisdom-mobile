import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

/**
 * Generated class for the TopicsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-topics-popover",
  templateUrl: "topics-popover.html"
})
export class TopicsPopoverPage {
  topics: string[];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.topics = this.navParams.get("topics");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TopicsPopoverPage");
  }

  topicSelected(topic: string) {
    this.viewCtrl.dismiss({ topic: topic });
  }
}
