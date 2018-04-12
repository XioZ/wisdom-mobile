import { Api } from "./../../providers/api";
import { TabsPage } from "./../tabs/tabs";
import { topics } from "./../../const";
import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the TopicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-topics",
  templateUrl: "topics.html"
})
export class TopicsPage {
  topicsList: Array<{ name: string; imgUrl: string }>; // available topics
  userSavedTopics: Array<string>; // user's interested topics, before modification
  selectedTopics: Array<boolean>; // monitor user selection
  numTopicsSelected: number;
  user: { id: number; saved: string[] };

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public api: Api,
    public storage: Storage
  ) {
    this.topicsList = topics;
    this.userSavedTopics = [];
    this.selectedTopics = [];
    this.numTopicsSelected = 0;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TopicsPage");
    this.storage.get("user").then(user => {
      if (user) {
        console.log(user);
        // not null, not undefined
        this.user = user;
        this.userSavedTopics = user.saved;
        this.initialiseSelectedTopics();
      } else {
        this.showToast("Failed to retrieve user data from Storage.");
      }
    });
  }

  // mark user's followed topic as true and otherwise as false
  // based on topic index
  initialiseSelectedTopics() {
    if (this.selectedTopics) this.selectedTopics = [];
    for (let i = 0; i < this.topicsList.length; i++) {
      // check if a system-defined topic is followed by the user
      if (
        this.userSavedTopics.find(element => {
          return element.toUpperCase == this.topicsList[i].name.toUpperCase;
        })
      ) {
        // topic followed by the user
        this.selectedTopics.push(true);
        this.numTopicsSelected++;
      } else {
        // topic not followed
        this.selectedTopics.push(false);
      }
    }
    console.log(this.selectedTopics);
  }

  toggleSelection(topic: { name: string; imgUrl: string }, i: number) {
    if (this.selectedTopics[i]) this.numTopicsSelected--;
    else this.numTopicsSelected++;
    this.selectedTopics[i] = !this.selectedTopics[i]; // toggle selection
    // console.log(this.numTopicsSelected);
    console.log(`toggled selection of ${topic.name}`);
    // console.log(this.selectedTopics);
  }

  updateInterestedTopics() {
    if (this.selectedTopics.length < 3) {
      let msg = "You're encouraged to follow more than 3 topics.";
      this.showToast(msg);
      return;
    }
    let body: string[] = [];
    for (let i = 0; i < this.selectedTopics.length; i++) {
      if (this.selectedTopics[i]) {
        body.push(this.topicsList[i].name);
      }
    }

    let endpoint = `reader/${this.user.id}/topics`;
    this.api.put(endpoint, body).subscribe(
      resp => {
        this.storage.set("user", resp).then(() => {
          // console.log(resp.topics)
          this.navCtrl.setRoot(TabsPage);
        });
      },
      err => {
        let msg: string =
          "Failed to update your interested topics. Please try again.";
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

  skip() {
    this.navCtrl.setRoot(
      TabsPage,
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
