import { QuestionModalPage } from "./../pages/question-modal/question-modal";
import { RewardPopoverPage } from "./../pages/reward-popover/reward-popover";
import { HomePage } from "./../pages/home/home";
import { ArticlePage } from "./../pages/article/article";
import { ArticleCardPage } from "./../pages/article-card/article-card";
import { TopicsPage } from "./../pages/topics/topics";
import { DiscoverPage } from "./../pages/discover/discover";
import { SignupPage } from "./../pages/signup/signup";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { IonicStorageModule } from "@ionic/storage";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "./../pages/login/login";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Api } from "../providers/api";
import { HttpClientModule } from "@angular/common/http";

import { TimeAgoPipe } from "time-ago-pipe";
import { TopicsPopoverPage } from "../pages/topics-popover/topics-popover";
import { QuestionCardPage } from "../pages/question-card/question-card";
import { QuestionDetailPage } from "../pages/question-detail/question-detail";
import { TopupPage } from "../pages/topup/topup";
import { SavedArticlesPage } from "../pages/saved-articles/saved-articles";
import { FollowingAuthorsPage } from "../pages/following-authors/following-authors";
import { AuthorCardPage } from "../pages/author-card/author-card";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    LoginPage,
    SignupPage,
    DiscoverPage,
    TopicsPage,
    ArticleCardPage,
    ArticlePage,
    HomePage,
    RewardPopoverPage,
    QuestionModalPage,
    TopicsPopoverPage,
    TimeAgoPipe,
    QuestionCardPage,
    QuestionDetailPage,
    TopupPage,
    SavedArticlesPage,
    FollowingAuthorsPage,
    AuthorCardPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot() // to use Ionic storage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    LoginPage,
    SignupPage,
    DiscoverPage,
    TopicsPage,
    ArticleCardPage,
    ArticlePage,
    HomePage,
    RewardPopoverPage,
    QuestionModalPage,
    TopicsPopoverPage,
    QuestionCardPage,
    QuestionDetailPage,
    TopupPage,
    SavedArticlesPage,
    FollowingAuthorsPage,
    AuthorCardPage
  ],
  providers: [
    Api,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage
  ]
})
export class AppModule {}
