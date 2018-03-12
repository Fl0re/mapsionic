import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CartePage } from '../carte/carte';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartePage;

  constructor() {

  }
}
