import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { APIMethodsEnum } from '../../enums';
import { IYoutubeData, IYoutubeOptions } from '../../interfaces';
import { VideosManagerService } from '../../services/videos-manager.service';
import { YoutubeApiService } from '../../services/youtube-api.service';

@Component({
  selector: 'app-youtube-trends',
  templateUrl: './youtube-trends.component.html',
  styleUrls: ['./youtube-trends.component.css']
})
export class YoutubeTrendsComponent implements OnInit, OnDestroy {
  videos: IYoutubeData;
  filtersForm = new FormGroup({
    title: new FormControl('')
  });
  apiMethod: APIMethodsEnum = APIMethodsEnum.videos;
  favourites = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private youtubeService: YoutubeApiService,
    private videosManagerService: VideosManagerService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getVideos({ chart: 'mostPopular' });

    this.videosManagerService.favouriteVideos$.pipe(takeUntil(this.destroy$)).subscribe(videos => {
      this.favourites = videos;
    });
  }

  getVideos(options?: IYoutubeOptions, add: boolean = false): void {
    // We only need the first result here,
    // but also we want to unsubscribe if we change route before we got the response, for example
    this.youtubeService.get$(options, this.apiMethod).pipe(first(), takeUntil(this.destroy$)).subscribe(videos => {
      if (add) {
        this.videos.items = this.videos.items.concat(videos.items);
        this.videos.nextPageToken = videos.nextPageToken;
      } else {
        this.videos = videos;
      }
    });
  }

  applyFilters(): void {
    const title = this.filtersForm.get('title').value.trim();

    if (title) {
      this.apiMethod = APIMethodsEnum.search;
      this.getVideos({ q: title });
    } else {
      this.apiMethod = APIMethodsEnum.videos;
      this.getVideos({ chart: 'mostPopular' });
    }
  }

  showMore(): void {
    const options: IYoutubeOptions = { pageToken: this.videos.nextPageToken };
    if (this.apiMethod === APIMethodsEnum.videos) {
      options.chart = 'mostPopular';
    }
    this.getVideos(options, true);
  }

  changeTab(event: MatTabChangeEvent): void {
    const tabLabel = event.tab.textLabel;

    if (tabLabel === 'Favourites') {
      this.apiMethod = APIMethodsEnum.videos;
      this.getVideos({ id: this.favourites } );
    } else {
      this.applyFilters();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
