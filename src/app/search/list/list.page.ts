import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Subscription} from 'rxjs';
import {BookResultModel} from '../bookres.model';
import {Storage} from '@capacitor/storage';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  isLoading = false;
  searchSub: Subscription;
  books: BookResultModel[];
  errMess: string;
  openBook: BookResultModel;
  constructor(private searchService: SearchService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.searchSub = this.searchService.getAllSearchResult().subscribe((bks) => {
      this.openBook = bks[0];
      this.books = bks.slice(1);
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.trialAlert();
  }

  deleteSearchResult() {
    this.searchService.searchResult.next([]);
  }

  async trialAlert() {
    const alert = await this.alertCtrl.create({
      header: 'توجه',
      subHeader: 'نسخه آزمایشی',
      // eslint-disable-next-line max-len
      message: 'شما تنها قادر به دانلود اولین کتاب یافته شده می باشید لطفا جهت استفاده کامل، نسخه بدون محدودیت را خریداری فرمایید',
      buttons: ['باشه']
    });
    await alert.present();
  }


  }


