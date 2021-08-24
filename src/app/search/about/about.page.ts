import { Component, OnInit } from '@angular/core';
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMalekzadSite = async () => {
    await Browser.open({url: 'http://www.ketabyab.mohammad-malekzad.ir'});
  };

  openMalekzadInsta = async () => {
    await Browser.open({url: 'https://www.instagram.com/reference_book_iran/'});
  };

}
