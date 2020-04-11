import { orderBy } from "lodash";
import { SearchResultModel, SortOrder, Result } from "../models";
import { pick } from "lodash";

export type FilterType = "ByGenres" | "ByUserScore";
/**
 * the outsourced function, that makes sorting movies on a page
 *
 */
export const sort = (movies: SearchResultModel[], sortOrder: SortOrder) => {
  if (sortOrder === "Popularity Descending") {
    return orderBy(movies, (b) => b.popularity, "desc");
  } else if (sortOrder === "Popularity Ascending") {
    return orderBy(movies, (b) => b.popularity, "asc");
  } else if (sortOrder === "Rating Descending") {
    return orderBy(movies, (b) => b.vote_average, "desc");
  } else if (sortOrder === "Rating Ascending") {
    return orderBy(movies, (b) => b.vote_average, "asc");
  } else if (sortOrder === "Release Date Descending") {
    return orderBy(movies, (b) => b.release_date, "desc");
  } else if (sortOrder === "Release Date Ascending") {
    return orderBy(movies, (b) => b.release_date, "asc");
  } else if (sortOrder === "Title (A-Z)") {
    return orderBy(movies, (b) => b.title, "asc");
  } else if (sortOrder === "Title (Z-A)") {
    return orderBy(movies, (b) => b.title, "desc");
  } else {
    throw new Error("Unknown sort order");
  }
};
/**
 * the outsourced function, that makes filter movies on a page
 *
 */
export const filter = (
  type: FilterType,
  movies: SearchResultModel[],
  filterValue: any
) => {
  let filtered = movies;

  if (type === "ByGenres") {
    if (filterValue?.length > 0) {
      filtered = movies.filter((movie) => {
        return filterValue?.every((id: number) => movie.genre_ids.includes(id));
      });
    }
  } else if (type === "ByUserScore") {
    filtered = filtered.filter((movie) => {
      return movie.vote_average >= filterValue;
    });
  }
  return filtered;
};
/**
 * the outsourced function, pick only values by key that are really needed
 *
 */
export const pickResultValues = (results: Result[]): SearchResultModel[] => {
  return results.map((item) =>
    pick(item, [
      "title",
      "poster_path",
      "genre_ids",
      "popularity",
      "vote_average",
      "release_date",
    ])
  );
};
