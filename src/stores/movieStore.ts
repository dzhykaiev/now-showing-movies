import { observable, action, decorate, computed } from "mobx";
import {
  NowPlayingModel,
  GenreModel,
  SearchResultModel,
  Genre,
  SortOrder,
  Status,
} from "../models";
import { API, API_DEFAULT_URLS } from "../api/api";
import { sort, filter } from "../helpers/helpers";

export class MovieStore {
  public nowPlaying: NowPlayingModel = null;
  public genres: Genre[] = null;
  public movieSortOrder: SortOrder = "Popularity Descending";
  public movieChosenGenres: number[] = null;
  public userScore: number | number[] = 3;
  public status: Status = null;
  /**
   * init async method in store that fetch data from the server
   *
   */
  @action.bound
  fetchData(nextPage?: number) {
    if (this.status !== "pending") {
      this.status = "pending";

      let urls = [API_DEFAULT_URLS[0]];
      if (!this.genres) {
        urls = [...urls, API_DEFAULT_URLS[1]];
      }
      const requests = urls.map((url) =>
        API.get(url, {
          params: { page: nextPage },
        })
      );

      Promise.all(requests)
        .then((responses) => {
          return responses.map((response) => {
            return response.data;
          });
        })
        .then((responses) => {
          this.status = "success";
          if (responses[0]) {
            this.saveNowPlaying(responses[0]);
          }
          if (responses[1]) {
            this.saveGenres(responses[1]);
          }
          return;
        })

        .catch((err) => {
          this.status = "error";
          console.error(err);
        });
    }
  }

  @computed get hasMore() {
    if (this.status === null) {
      return true;
    } else {
      return Boolean(this.nowPlaying?.total_pages - this.nowPlaying?.page);
    }
  }

  @computed get result(): SearchResultModel[] {
    if (this.nowPlaying) {
      let result: SearchResultModel[] = this.nowPlaying.results;
      result = filter("ByGenres", result, this.movieChosenGenres);
      result = filter("ByUserScore", result, this.userScore);
      result = sort(result, this.movieSortOrder);
      return result;
    }
    return null;
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
   * change sorting order
   *
   */
  @action.bound
  changeSortOrder(sortOrder: SortOrder) {
    this.movieSortOrder = sortOrder;
  }
  /**
   * change genres filter
   *
   */
  @action.bound
  changeChosenGenres(movieChosenGenres: number[]) {
    this.movieChosenGenres = movieChosenGenres;
  }
  /**
   * change user score filter
   *
   */
  @action.bound
  changeUserScore(userScore: number | number[]) {
    this.userScore = userScore;
  }
}

decorate(MovieStore, {
  nowPlaying: observable,
  genres: observable,
  movieSortOrder: observable,
  movieChosenGenres: observable,
  userScore: observable,
  status: observable,
});
