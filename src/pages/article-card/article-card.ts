import { ArticlePage } from './../article/article';
import { NavController, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the ArticleCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-article-card',
  templateUrl: 'article-card.html',
})
export class ArticleCardPage {
  @Input('article') article: {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleCardPage');
  }

  viewArticle() {
    this.navCtrl.push(ArticlePage, { article: this.article });
  }

}
