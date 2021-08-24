import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {find, map} from 'rxjs/operators';
import {BookResultModel} from './bookres.model';
import {Storage} from '@capacitor/storage';

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
    return this.http.post<BookResultModel[]>('http://localhost:3000/search/search', {...dataSearch})
      .pipe(map(async (resData) => {
        await this.searchResult.next(resData);
        return resData;
    }), );
  }

  getBookById(id: string) {
     return this.getAllSearchResult().pipe(map((books) => {
       return books.find((book) => {
         return book.id === id;
       });
     }));
  }

}
