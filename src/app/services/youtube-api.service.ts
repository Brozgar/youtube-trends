import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import apiConfig from '../configs/apiConfig';
import { APIMethodsEnum } from '../enums';
import { IYoutubeData, IYoutubeOptions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  apiUrl = apiConfig.apiUrl;
  apiKey = apiConfig.apiKey;

  constructor(private http: HttpClient) { }

  get$(options?: IYoutubeOptions, apiMethod: APIMethodsEnum = APIMethodsEnum.videos): Observable<IYoutubeData> {
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

    return this.http.get<IYoutubeData>(`${this.apiUrl}/${apiMethod}`, {
      params
    });
  }
}
