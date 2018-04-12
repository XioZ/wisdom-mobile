// import { DiscoverPage } from './../pages/discover/discover';
// import { ArticlePage } from './../pages/article/article';
// import { TopicsPage } from './../pages/topics/topics';
// import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // navCtrl not available in root component
  @ViewChild(Nav) nav: Nav; 

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    this.storage.get('user').then((user) => {
      console.log('user: ', user);
      if (user) { // user has previously logged in
        this.nav.setRoot(TabsPage);
      }
    });
  }
}
