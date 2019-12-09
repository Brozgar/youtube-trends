import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosManagerService {
  constructor() { }

  favourites = JSON.parse(localStorage.getItem('favourites'));
  favouriteVideos$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    this.favourites || []
  );

  updateFavourites(favourites: string[]) {
    localStorage.setItem('favourites', JSON.stringify(favourites));
    this.favouriteVideos$.next(favourites);
  }
}
