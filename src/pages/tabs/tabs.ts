import { HomePage } from './../home/home';
import { DiscoverPage } from './../discover/discover';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MePage } from '../me/me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = DiscoverPage;
  tab3Root = AboutPage;
  tab4Root = MePage;

  constructor() {

  }
}
