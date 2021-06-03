import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {ActivatedRoute} from '@angular/router';
import {from, Subscription} from 'rxjs';
import {BookResultModel} from '../bookres.model';
import {Storage} from '@capacitor/storage';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Http} from '@capacitor-community/http';
import {LoadingController, Platform} from '@ionic/angular';
import {finalize, map} from 'rxjs/operators';
import {Browser} from '@capacitor/browser';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  searchSub: Subscription;
  book: BookResultModel;
  isLoading = false;
  downloadUrl = '';
  myFiles = [];
  downloadProgress = 0;
  data = [];
  cover: string;


  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              public platform: Platform,
              private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.isLoading = true;
    // eslint-disable-next-line max-len
    this.searchSub = this.activatedRoute.paramMap.subscribe((paramMap) => this.searchService.getBookById(paramMap.get('bookId')).subscribe((book) => {
       this.book = book;
       this.isLoading = false;
      }));
    }

   openBook = async (url) => {
    const URL = encodeURI(url);
    await Browser.open({url: URL});
  };

}

