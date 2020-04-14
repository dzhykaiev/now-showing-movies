// --- Now playing
export interface NowPlayingModel {
  results: Result[];
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}

export interface Result {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

// --- Genre
export interface GenreModel {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

// --- Search result
export interface SearchResultModel {
  title: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  release_date: string;
  id: number;
}

// ---
export type SortOrder =
  | "Popularity Descending"
  | "Popularity Ascending"
  | "Rating Descending"
  | "Rating Ascending"
  | "Release Date Descending"
  | "Release Date Ascending"
  | "Title (A-Z)"
  | "Title (Z-A)";

type UnionKeyToValue<U extends string> = {
  [key in U]: key;
};

export const sortOrderValues: Readonly<UnionKeyToValue<SortOrder>> = {
  "Popularity Descending": "Popularity Descending",
  "Popularity Ascending": "Popularity Ascending",
  "Rating Descending": "Rating Descending",
  "Rating Ascending": "Rating Ascending",
  "Release Date Descending": "Release Date Descending",
  "Release Date Ascending": "Release Date Ascending",
  "Title (A-Z)": "Title (A-Z)",
  "Title (Z-A)": "Title (Z-A)",
};

export type Status = "pending" | "error" | "done" | "initial";
