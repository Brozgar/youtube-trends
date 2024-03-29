# Youtube Trends

> A small task completed for the recruiter's evaluation. Time was of the essence, so I did only the basic architecture with minimum functionality to provide mvp.
>
>![Screenshot of the app](./screenshot.jpg)

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:4200
yarn run start
```

Then you need to add your API key to access Youtube API v3. You can do that in [Google Developers Console](https://console.developers.google.com/) The key is stored in the service (since it's the only configurable constant I didn't move it to a separate config file). The service is located in ```src/app/services/youtube-api.service.ts```.

Note that unit testing wasn't implemented to save time as it's not required by the task. However the basic setup is there in case I would add it later just for fun.

## Task description

Create a web application with Angular 7+ that loads the data from a third-party API (i.e. top-50 from YouTube or Google Books). There should be a possibility to load more and to filter by text.

There should be an option to show all results or only the selected ones (favourites).

Use RXJS and reactive forms. Pressing F5 should no clear the selected favourites.

## Comments on the project

I tried to finish the task as fast as possible, which took me around 8 hours, which includes time spent on researching Youtube API nad other tools required for the task (it's been a while since I worked with Youtube API).

I decided to use local storage to prevent favourites from resetting. It is due to the fact that the app is not using a database, which I would use for that purpose otherwise (maybe both for improved performance).

