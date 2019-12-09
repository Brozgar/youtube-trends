import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video/dist';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICachedVideos, IYoutubeData, IYoutubeVideoResource } from '../../interfaces';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { VideosManagerService } from '../../services/videos-manager.service';

@Component({
  selector: 'app-videos-grid',
  templateUrl: './videos-grid.component.html',
  styleUrls: ['./videos-grid.component.css']
})
export class VideosGridComponent implements OnInit, OnDestroy {
  @Input() videos: IYoutubeData = { items: [] } as IYoutubeData;

  @Output() showMore$: EventEmitter<any> = new EventEmitter<any>();

  faHeart = faHeart;
  cachedVideos: ICachedVideos[] = [];
  favourites: string[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private embedService: EmbedVideoService,
    private videosManagerService: VideosManagerService,
    ) { }

  ngOnInit(): void {
    this.videosManagerService.favouriteVideos$.pipe(takeUntil(this.destroy$)).subscribe(videos => {
      this.favourites = videos;
    });
  }

  getVideoIFrame(videoId: string): string {
    const cachedVideos = this.cachedVideos.find(v => v.id === videoId);

    // If we call embed instead of a cached value
    // it would make unwanted http requests when the videos are already loaded
    if (!cachedVideos) {
      const videoHTML = this.embedService.embed_youtube(videoId, {
        attr: { width: 300, height: 160 }
      });

      this.cachedVideos.push({ id: videoId, html: videoHTML });

      return videoHTML;
    }

    return cachedVideos.html;
  }

  showMore() {
    this.showMore$.emit();
  }

  addToFavourites(id: string) {
    this.favourites.push(id);
    this.videosManagerService.updateFavourites(this.favourites);
  }

  removeFromFavourites(id: string) {
    this.favourites = this.favourites.filter(fav => fav !== id);
    this.videosManagerService.updateFavourites(this.favourites);
  }

  isFavourite(video: IYoutubeVideoResource) {
    // @ts-ignore
    return this.favourites.find( fav => fav === video.id.videoId || fav === video.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
