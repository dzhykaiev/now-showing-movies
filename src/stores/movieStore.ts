import { observable, action, decorate, computed } from "mobx";
import {
  NowPlayingModel,
  GenreModel,
  SearchResultModel,
  Genre,
  SortOrder,
  Status,
} from "../models";
import { API } from "../api/api";
import { sort, filter } from "../helpers/helpers";

export class MovieStore {
  public nowPlaying: NowPlayingModel = null;
  public genres: Genre[] = null;
  public movieSortOrder: SortOrder = "Popularity Descending";
  public movieChosenGenres: number[] = null;
  public userScore: number | number[] = 3;
  public status: Status = "initial";

  constructor() {
    this.fetchListMovieGenres();
  }
  /**
   * init async method in store that fetch data from the server
   *
   */
  @action.bound
  fetchData(nextPage: number) {
    this.fetchNowPlayingMovies(nextPage);
  }

  @action
  async fetchNowPlayingMovies(nextPage: number) {
    this.status = "pending";
    return await API.get("movie/now_playing", {
      params: { page: nextPage },
    })
      .then((response: { data: NowPlayingModel }) => {
        if (this.nowPlaying?.results) {
          this.nowPlaying = {
            ...response.data,
            results: [...this.nowPlaying.results, ...response.data.results],
          };
        } else {
          this.nowPlaying = response.data;
        }
      })
      .catch((err) => {
        console.error(err);
        this.status = "error";
      })
      .finally(() => {
        this.status = "done";
      });
  }

  @action
  async fetchListMovieGenres() {
    return await API.get("genre/movie/list")
      .then((response) => {
        return response.data;
      })
      .then((genres: GenreModel) => {
        this.genres = genres.genres;
      });
  }

  @computed get hasMore() {
    if (this.status === "initial") {
      return true;
    } else {
      return (
        Boolean(this.nowPlaying?.total_pages - this.nowPlaying?.page) &&
        this.status !== "pending"
      );
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
