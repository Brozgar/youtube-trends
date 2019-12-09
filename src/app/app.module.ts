import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmbedVideo } from 'ngx-embed-video/dist';

import { AppComponent } from './components/app.component';
import { YoutubeTrendsComponent } from './components/youtube-trends/youtube-trends.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideosGridComponent } from './components/videos-grid/videos-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeTrendsComponent,
    VideosGridComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot([
      { path: '', component: YoutubeTrendsComponent },
    ]),
    HttpClientModule,
    EmbedVideo.forRoot(),
    MatTabsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
