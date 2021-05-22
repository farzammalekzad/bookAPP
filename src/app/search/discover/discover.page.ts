import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {SearchService} from '../search.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  private searchSub: Subscription;

  constructor(private routes: Router, private loadingCtrl: LoadingController, private searchService: SearchService) { }

  ngOnInit() {
  }

 async getSearchResult(title: string, num: number) {
    const loading = await this.loadingCtrl.create({
        message: 'در حال ارسال'
    });
    await loading.present();
    this.searchSub = await this.searchService.titleSearch(title, num).subscribe((resData) => {
      console.log(resData);
    });
    await loading.dismiss();
    await this.routes.navigateByUrl('/search/tabs/list');
  }

  onSearch(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const title = form.value.search;
    const num = form.value.num;
    form.reset();
    return this.getSearchResult(title, num);
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

}
