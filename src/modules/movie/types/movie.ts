export interface IMovie {
  _id: string;
  title: string;
  poster: string;
  plot: string;
  fullplot: string;
  year: number;
  genre: string[];
  genres: string[];
  directors: string[];
  writers: string[];
  cast: string[];
  runtime: number;
  imdbVotes: number;
  imdbRating: number;
  released: string;
  languages: string[];
  countries: string[];
  type: string;
  num_mflix_comments: number;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    critic: {
      rating: number;
      numReviews: number;
      meter: number;
    };
  };
  lastupdated: string;

  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
}
