import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Subscription} from 'rxjs';
import {BookResultModel} from '../bookres.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
  isLoading = false;
  searchSub: Subscription;
  books: BookResultModel[];
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchSub = this.searchService.getAllSearchResult().subscribe((bks) => {
        this.isLoading = true;
        this.books = bks;
        this.isLoading = false;
    });
  }
  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

}
