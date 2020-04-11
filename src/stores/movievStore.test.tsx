import { MovieStore } from "./movieStore";
import { wait } from "@testing-library/react";
import {
  SortOrder,
  NowPlayingModel,
  Genre,
  sortOrderValues,
} from "../models/movieModel";

describe("Testing MovieStore - Sync", () => {
  // arrange
  let sut: MovieStore;
  beforeEach(() => {
    sut = new MovieStore();
  });
  test("Check init values", () => {
    // assert
    expect<NowPlayingModel>(sut.nowPlaying).toBeNull();
    expect<Genre[]>(sut.genres).toBeNull();
    expect<SortOrder>(sut.movieSortOrder).toEqual<SortOrder>(
      "Popularity Descending"
    );
    expect<number[]>(sut.movieChosenGenres).toBeNull();
    expect<number | number[]>(sut.userScore).toEqual<number | number[]>(3);
  });

  test("Check changeSortOrder method for all sort values", () => {
    for (const key in sortOrderValues) {
      // act
      sut.changeSortOrder(key as SortOrder);
      // assert
      expect<SortOrder>(sut.movieSortOrder).toEqual<SortOrder>(
        key as SortOrder
      );
    }
  });

  test("Check changeUserScore method for all sort values", () => {
    for (let i = 0; i <= 10; i = i + 0.5) {
      // act
      sut.changeUserScore(i);
      // assert
      expect<number | number[]>(sut.userScore).toEqual<number | number[]>(i);
    }
  });

  test("Check changeChosenGenres method ", () => {
    const genre: number[] = [1, 2, 3];
    // act
    sut.changeChosenGenres(genre);
    // assert
    expect<number[]>(sut.movieChosenGenres).toEqual<number[]>(genre);
  });
});

describe("Testing MovieStore - Async", () => {
  let sut: MovieStore;
  beforeAll(() => {
    // arrange
    sut = new MovieStore();
    //act
    sut.fetchData();
  });

  test("Check if loadMoreMoviesAsync method save nowPlaying data", async (done) => {
    await wait(() => {
      // shallow NowPlayingModel check
      expect<NowPlayingModel>(sut.nowPlaying).toBeTruthy();
      expect<NowPlayingModel["page"]>(sut.nowPlaying.page).toBeGreaterThan(0);
      expect<NowPlayingModel["total_results"]>(
        sut.nowPlaying.total_results
      ).toBeGreaterThan(0);
      expect<NowPlayingModel["dates"]>(sut.nowPlaying.dates).toEqual(
        expect.objectContaining({
          maximum: expect.any(String),
          minimum: expect.any(String),
        })
      );
      expect<NowPlayingModel["total_pages"]>(
        sut.nowPlaying.total_pages
      ).toBeGreaterThan(0);
      done();
    });
  });

  test("Check if loadMoreMoviesAsync method save results: Result[]", async (done) => {
    await wait(() => {
      // Deeper NowPlayingModel check for result: Result[]
      expect(sut.nowPlaying.results).toContainEqual(
        expect.objectContaining({
          popularity: expect.any(Number),
          vote_count: expect.any(Number),
          video: expect.any(Boolean),
          poster_path: expect.any(String),
          id: expect.any(Number),
          adult: expect.any(Boolean),
          backdrop_path: expect.any(String),
          original_language: expect.any(String),
          original_title: expect.any(String),
          genre_ids: expect.arrayContaining([expect.any(Number)]),
          title: expect.any(String),
          vote_average: expect.any(Number),
          overview: expect.any(String),
          release_date: expect.any(String),
        })
      );
    });
    done();
  });

  test("Check if loadMoreMoviesAsync method save genres: Genre[]", async (done) => {
    await wait(() => {
      expect(sut.genres).toContainEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        })
      );
    });
    done();
  });

  test("Check if loadMoreMoviesAsync method - load more", async (done) => {
    await wait(() => {
      expect(sut.nowPlaying.results.length).toEqual(20);
      expect(sut.nowPlaying.page).toEqual(1);
    });
    sut.fetchData(2);
    await wait(() => {
      expect(sut.nowPlaying.results.length).toEqual(40);
      expect(sut.nowPlaying.page).toEqual(2);
    });
    done();
  });
});
