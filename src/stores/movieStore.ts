import { observable, action, decorate, computed } from "mobx";
import {
  NowPlayingModel,
  GenreModel,
  SearchResultModel,
  Genre,
  SortOrder,
} from "../models";
import { API, API_DEFAULT_URLS } from "../api/api";
import { sort, filter, pickResultValues } from "../helpers/helpers";

export class MovieStore {
  public nowPlaying: NowPlayingModel = null;
  public genres: Genre[] = null;
  public result: SearchResultModel[] = null;
  public movieSortOrder: SortOrder = "Popularity Descending";
  public movieChosenGenres: number[] = null;
  public userScore: number | number[] = 3;
  /**
   * init async method in store that fetch datafrom the server
   *
   */
  @action
  initFetchAsync() {
    const requests = API_DEFAULT_URLS.map((url) => API.get(url));

    Promise.all(requests)
      .then((responses) => {
        console.log(responses);
        return responses.map((response) => {
          return response.data;
        });
      })
      .then((responses) => {
        this.saveNowPlaying(responses[0]);
        this.saveGenres(responses[1]);
        return;
      })
      .then(() => this.setResultValues())
      .catch((err) => {
        console.error(err);
      });
  }
  @computed get nextPage() {
    if (this.nowPlaying?.page) {
      return this.nowPlaying.page + 1;
    }
    return 1;
  }
  /**
   * load more movies async action
   *
   */
  @action.bound
  loadMoreMoviesAsync() {
    API.get(API_DEFAULT_URLS[0], {
      params: { page: this.nextPage },
    })
      .then((response) => {
        this.saveNowPlaying(response.data);
        return;
      })
      .then(() => {
        this.setResultValues();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  /**
   * save now playing values over old ones except results key, they stored all from first page
   *
   */
  @action.bound
  saveNowPlaying(nowPlaying: NowPlayingModel) {
    if (!this.nowPlaying) {
      this.nowPlaying = nowPlaying;
    } else {
      console.log(this.nowPlaying.results);
      this.nowPlaying = {
        results: [...this.nowPlaying.results, ...nowPlaying.results],
        page: nowPlaying.page,
        total_pages: nowPlaying.total_pages,
        dates: nowPlaying.dates,
        total_results: nowPlaying.total_results,
      };
    }
  }
  /**
   * action save genres to store
   *
   */
  @action.bound
  saveGenres(genres: GenreModel) {
    this.genres = genres.genres;
  }
  /**
   * action save sort order to store and trigger update all movies in page for sort and filter
   *
   */
  @action.bound
  changeSortOrder(sortOrder: SortOrder) {
    this.movieSortOrder = sortOrder;
    this.setResultValues();
  }
  /**
   * action save chosend genres to store and trigger update all movies in page for sort and filter
   *
   */
  @action.bound
  changeChosenGenres(movieChosenGenres: number[]) {
    this.movieChosenGenres = movieChosenGenres;
    this.setResultValues();
  }
  /**
   * action save user score to store and trigger update all movies in page for sort and filter
   *
   */
  @action.bound
  changeUserScore(userScore: number | number[]) {
    this.userScore = userScore;
    this.setResultValues();
  }
  /**
   * this is func update that triggered after all thanges to store that can affect on sort or filter items
   *
   */
  private setResultValues(): void {
    let result = sort(
      pickResultValues(this.nowPlaying.results),
      this.movieSortOrder
    );
    result = filter("ByGenres", result, this.movieChosenGenres);
    result = filter("ByUserScore", result, this.userScore);
    this.result = result;
  }
}

decorate(MovieStore, {
  nowPlaying: observable,
  genres: observable,
  result: observable,
  movieSortOrder: observable,
  movieChosenGenres: observable,
  userScore: observable,
});
