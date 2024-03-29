import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {SearchService} from '../search.service';
import {Subscription} from 'rxjs';
import {Network} from '@capacitor/network';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  private searchSub: Subscription;
  constructor(private routes: Router,
              private loadingCtrl: LoadingController,
              private searchService: SearchService,
              private alertCtrl: AlertController) { }

  async ngOnInit() {
    let connection = false;
    const loading = await this.loadingCtrl.create({
      message: 'آماده سازی نسخه آزمایشی'
    });
    await loading.present();
    await setTimeout(() => {
      connection = true;
      loading.dismiss();
      this.logCurrentStatus();
      alert.present();
    }, 1000);
    const alert = await this.alertCtrl.create({
      header: 'خوش آمدید',
      message: 'جستجو کتاب تنها برای عناوین زبان اصلی مجاز است. کیبورد خود را بر روی زبان انگلیسی قرار دهید.',
      buttons: ['باشه']
    });

  }

 async getSearchResult(title: string, num: number) {
    const loading = await this.loadingCtrl.create({
        message: 'در حال بررسی'
    });
    await loading.present();
    this.searchSub = this.searchService.titleSearch(title, num).subscribe(() => {
      loading.dismiss();
      this.routes.navigateByUrl('/search/tabs/list');
    });
  }

  onSearch(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const title = form.value.search;
    const searchNum = form.value.num;
    form.reset();
    return this.getSearchResult(title, searchNum);
  }

  logCurrentStatus = async () => {
    const status = await Network.getStatus();
    if (!status.connected) {
      const alert = await this.alertCtrl.create({
        header: 'اتصال به اینترنت',
        message: 'شما به اینترنت متصل نمی باشید',
        buttons: ['باشه']
      });
      await alert.present();
    }
  };

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

}
