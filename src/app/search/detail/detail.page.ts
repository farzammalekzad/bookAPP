import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {BookResultModel} from '../bookres.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  searchSub: Subscription;
  book: BookResultModel;
  isLoading = false;

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.searchSub = this.activatedRoute.paramMap.subscribe((paramMap) => {
     return this.searchService.getBookById(paramMap.get('bookId')).subscribe((book) => {
       this.book = book;
       this.isLoading = false;
      });
    });
  }
}
