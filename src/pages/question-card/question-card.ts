import { QuestionDetailPage } from "./../question-detail/question-detail";
import { NavController, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the ArticleCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question-card',
  templateUrl: 'question-card.html',
})
export class QuestionCardPage {
  @Input('question') question: {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionCardPage');
  }

  viewQuestion() {
    this.navCtrl.push(QuestionDetailPage, { question: this.question });
  }

}
