import type { IMovie } from "../types/movie";
import { Calendar, Star, Play } from "lucide-react";

export const MovieCard = ({ movie }: { movie: IMovie }) => {
  return (
    <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-105 cursor-pointer">
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <div className="bg-yellow-400 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-6 h-6 text-black fill-black" />
        </div>
      </div>

      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h4 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors">
          {movie.title}
        </h4>
        <p className="text-slate-300 text-sm mb-3 line-clamp-2 leading-relaxed">
          {movie.plot}
        </p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3 h-3 fill-yellow-400" />
            <span className="font-medium">{movie.imdb.rating}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {movie.genres.length > 2 && (
            <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
              +{movie.genres.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
