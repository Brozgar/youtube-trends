import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeData, IYoutubeOptions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  apiUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyDMWoxS04GRyFs2ppUL_7Tfzv_e6s8NkEc';

  constructor(private http: HttpClient) { }

  get$(options?: IYoutubeOptions, apiMethod: string = 'videos'): Observable<IYoutubeData> {
    if (options.id && Array.isArray(options.id)) {
      options.id = options.id.join(',');
    }

    const params = {
      part: 'snippet',
      order: 'viewCount',
      key: this.apiKey,
      maxResults: '10',
      type: 'video',
      ...options
    };

    console.log(options);

    return this.http.get<IYoutubeData>(`${this.apiUrl}/${apiMethod}`, {
      params
    });
  }
}
