import { useGetMoviesTans } from "../hooks/useGetMoviesTans";
import { MovieCard } from "./MovieCard";
import { Link } from "react-router-dom";
import {
  LoaderCircle,
  AlertCircle,
  Drama,
  Star,
  Clock,
  Calendar,
  Filter,
} from "lucide-react";

export const DramaMovies = () => {
  const { movies, loading, isError } = useGetMoviesTans("Drama");

  const avgRating = movies?.length
    ? (
        movies.reduce((sum, movie) => sum + movie.imdb.rating, 0) /
        movies.length
      ).toFixed(1)
    : 0;

  const totalAwards =
    movies?.reduce((sum, movie) => sum + movie.awards.wins, 0) || 0;

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative">
          <LoaderCircle className="animate-spin w-12 h-12 text-yellow-400" />
          <div className="absolute inset-0 animate-ping">
            <LoaderCircle className="w-12 h-12 text-yellow-400/30" />
          </div>
        </div>
        <p className="mt-4 text-slate-400 font-medium">
          Loading drama movies...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-400">
            Failed to load drama movies. Please try again later.
          </p>
        </div>
      </div>
    );

  if (!movies?.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center max-w-md backdrop-blur-sm">
          <Drama className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            No drama movies found
          </h2>
          <p className="text-slate-400">
            Check back later for new drama releases!
          </p>
        </div>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-yellow-400/10 to-orange-400/10 rounded-2xl p-6 border border-yellow-400/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-3 rounded-xl">
              <Drama className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Drama Movies
              </h1>
              <p className="text-slate-400">
                Emotional stories that touch the heart
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {movies.length}
              </div>
              <div className="text-sm text-slate-400">Movies</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">
                  {avgRating}
                </span>
              </div>
              <div className="text-sm text-slate-400">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {totalAwards}
              </div>
              <div className="text-sm text-slate-400">Awards Won</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="w-4 h-4" />
          <span>Showing all drama movies</span>
        </div>
        <div className="flex gap-2">
          <Link className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
            Latest
          </Link>
          <Link className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
            Top Rated
          </Link>
          <Link className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
            Most Awards
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <Link
            key={movie._id}
            to={`/movie/${movie._id}`}
            className="group cursor-pointer transform transition-all duration-300 hover:z-10"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className="animate-fadeIn">
              <MovieCard movie={movie} />
            </div>
          </Link>
        ))}
      </div>

      {movies.length > 0 && (
        <div className="mt-12 bg-slate-800/30 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Featured Drama
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {movies.slice(0, 2).map((movie) => (
              <Link
                key={movie._id}
                to={`/movie/${movie._id}`}
                className="flex gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all group"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-2 line-clamp-2">
                    {movie.plot}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {movie.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {movie.runtime}min
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {movie.imdb.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
