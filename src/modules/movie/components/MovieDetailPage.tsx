import { useParams, Link } from "react-router-dom";
import { useGetMoviesTans } from "../hooks/useGetMoviesTans";
import {
  LoaderCircle,
  Star,
  Calendar,
  Clock,
  Film,
  ArrowLeft,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const { movies, loading } = useGetMoviesTans();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<
    { id: string; author: string; text: string }[]
  >([
    { id: "1", author: "Alice", text: "Great movie!" },
    { id: "2", author: "Bob", text: "Loved it!" },
  ]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-white w-12 h-12" />
      </div>
    );

  const movie = movies?.find((m) => m._id === id);
  if (!movie)
    return (
      <div className="text-center text-red-400 mt-20 text-xl font-semibold">
        Movie not found
      </div>
    );

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      { id: Math.random().toString(), author: "Anonymous", text: commentText },
    ]);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors font-medium mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to movies
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Movie details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-semibold text-yellow-400">
                      {movie.imdb.rating}/10
                    </span>
                    <span className="text-slate-400">
                      ({movie.imdb.votes.toLocaleString()} votes)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{movie.runtime} min</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Film className="w-5 h-5 text-yellow-400" />
                  Plot
                </h2>
                <p className="text-slate-300 leading-relaxed">{movie.plot}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Directors
                  </h3>
                  <div className="space-y-2">
                    {movie.directors.map((director, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <span className="text-slate-300">{director}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-yellow-400" />
              Comments
            </h2>

            <div className="mb-8">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Share your thoughts about this movie..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                  />
                  <button
                    onClick={handleAddComment}
                    className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition-colors duration-200 transform hover:scale-105"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="flex gap-3 p-4 bg-slate-700/30 rounded-xl"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">
                          {c.author}
                        </span>
                        <span className="text-slate-500 text-sm">just now</span>
                      </div>
                      <p className="text-slate-300">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
