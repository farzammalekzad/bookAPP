import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {BookResultModel} from './bookres.model';

interface DataSearch {
  title: string;
  num: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchResult = new BehaviorSubject<BookResultModel[]>([]);

  constructor(private http: HttpClient) { }

  getAllSearchResult() {
    return this.searchResult.asObservable();
  }

  titleSearch(title: string, num: number) {
    const dataSearch = {
      title,
      num
    };
    return this.http.post<BookResultModel[]>('http://localhost:3000/search', {...dataSearch})
      .pipe(map((resData) => {
        this.searchResult.next(resData);
        return resData;
    }));
  }
}
