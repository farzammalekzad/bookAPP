import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Subscription} from 'rxjs';
import {BookResultModel} from '../bookres.model';
import {Storage} from '@capacitor/storage';

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
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.isLoading = true;
    this.searchSub = this.searchService.getAllSearchResult().subscribe((bks) => {
      this.books = bks;
      this.isLoading = false;
    });
  }

  deleteSearchResult() {
    this.searchService.searchResult.next([]);
  }


  }


