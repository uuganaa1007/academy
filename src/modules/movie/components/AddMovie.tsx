import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Plus,
  X,
  Film,
  Calendar,
  Clock,
  User,
  Save,
  ArrowLeft,
  Upload,
} from "lucide-react";
import type { IMovie } from "../types/movie";

interface AddMovieProps {
  onBack: () => void;
}

export const AddMovie = ({ onBack }: AddMovieProps) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    plot: "",
    fullplot: "",
    year: new Date().getFullYear(),
    runtime: 120,
    genres: [] as string[],
    directors: [] as string[],
    writers: [] as string[],
    cast: [] as string[],
    poster: "",
    languages: [] as string[],
    countries: [] as string[],
  });

  const [newGenre, setNewGenre] = useState("");
  const [newDirector, setNewDirector] = useState("");
  const [newWriter, setNewWriter] = useState("");
  const [newCast, setNewCast] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const addMovieMutation = useMutation({
    mutationFn: async (movieData: Partial<IMovie>) => {
      const response = await fetch("http://localhost:3001/movie/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...movieData,
          imdb: {
            rating: 0,
            votes: 0,
            id: Date.now(),
          },
          awards: {
            wins: 0,
            nominations: 0,
            text: "No awards yet.",
          },
          tomatoes: {
            viewer: { rating: 0, numReviews: 0, meter: 0 },
            critic: { rating: 0, numReviews: 0, meter: 0 },
          },
          type: "movie",
          num_mflix_comments: 0,
          lastupdated: new Date().toISOString(),
          released: new Date().toISOString(),
          genre: movieData.genres || [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      onBack();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMovieMutation.mutate(formData);
  };

  const addToArray = (
    value: string,
    array: string[],
    setter: (arr: string[]) => void,
    inputSetter: (val: string) => void,
  ) => {
    if (value.trim()) {
      setter([...array, value.trim()]);
      inputSetter("");
    }
  };

  const removeFromArray = (
    index: number,
    array: string[],
    setter: (arr: string[]) => void,
  ) => {
    setter(array.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to movies
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Plus className="w-6 h-6 text-black" />
            </div>
            Add New Movie
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <Film className="w-4 h-4 text-yellow-400" />
                  Movie Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                  placeholder="Enter movie title..."
                />
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Short Plot
                </label>
                <textarea
                  required
                  value={formData.plot}
                  onChange={(e) =>
                    setFormData({ ...formData, plot: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all resize-none"
                  rows={3}
                  placeholder="Brief plot summary..."
                />
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Full Plot
                </label>
                <textarea
                  value={formData.fullplot}
                  onChange={(e) =>
                    setFormData({ ...formData, fullplot: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all resize-none"
                  rows={5}
                  placeholder="Detailed plot description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                  <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                  />
                </div>

                <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                  <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    Runtime (min)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.runtime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        runtime: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                  />
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-yellow-400" />
                  Poster URL
                </label>
                <input
                  type="url"
                  value={formData.poster}
                  onChange={(e) =>
                    setFormData({ ...formData, poster: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                  placeholder="https://example.com/poster.jpg"
                />
                {formData.poster && (
                  <div className="mt-4">
                    <img
                      src={formData.poster}
                      alt="Poster preview"
                      className="w-32 h-48 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/200x300?text=No+Image";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Genres
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          newGenre,
                          formData.genres,
                          (genres) => setFormData({ ...formData, genres }),
                          setNewGenre,
                        );
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    placeholder="Add genre..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToArray(
                        newGenre,
                        formData.genres,
                        (genres) => setFormData({ ...formData, genres }),
                        setNewGenre,
                      )
                    }
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {genre}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(index, formData.genres, (genres) =>
                            setFormData({ ...formData, genres }),
                          )
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-400" />
                  Directors
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          newDirector,
                          formData.directors,
                          (directors) =>
                            setFormData({ ...formData, directors }),
                          setNewDirector,
                        );
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    placeholder="Add director..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToArray(
                        newDirector,
                        formData.directors,
                        (directors) => setFormData({ ...formData, directors }),
                        setNewDirector,
                      )
                    }
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.directors.map((director, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {director}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(
                            index,
                            formData.directors,
                            (directors) =>
                              setFormData({ ...formData, directors }),
                          )
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Writers
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newWriter}
                    onChange={(e) => setNewWriter(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          newWriter,
                          formData.writers,
                          (writers) => setFormData({ ...formData, writers }),
                          setNewWriter,
                        );
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    placeholder="Add writer..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToArray(
                        newWriter,
                        formData.writers,
                        (writers) => setFormData({ ...formData, writers }),
                        setNewWriter,
                      )
                    }
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.writers.map((writer, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {writer}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(index, formData.writers, (writers) =>
                            setFormData({ ...formData, writers }),
                          )
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Cast
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newCast}
                    onChange={(e) => setNewCast(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          newCast,
                          formData.cast,
                          (cast) => setFormData({ ...formData, cast }),
                          setNewCast,
                        );
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    placeholder="Add cast member..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToArray(
                        newCast,
                        formData.cast,
                        (cast) => setFormData({ ...formData, cast }),
                        setNewCast,
                      )
                    }
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.cast.map((member, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(index, formData.cast, (cast) =>
                            setFormData({ ...formData, cast }),
                          )
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Languages
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          newLanguage,
                          formData.languages,
                          (languages) =>
                            setFormData({ ...formData, languages }),
                          setNewLanguage,
                        );
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    placeholder="Add language..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToArray(
                        newLanguage,
                        formData.languages,
                        (languages) => setFormData({ ...formData, languages }),
                        setNewLanguage,
                      )
                    }
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {language}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(
                            index,
                            formData.languages,
                            (languages) =>
                              setFormData({ ...formData, languages }),
                          )
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <label className="block text-white font-semibold mb-3">
                  Countries
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          newCountry,
                          formData.countries,
                          (countries) =>
                            setFormData({ ...formData, countries }),
                          setNewCountry,
                        );
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-700/70 transition-all"
                    placeholder="Add country..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToArray(
                        newCountry,
                        formData.countries,
                        (countries) => setFormData({ ...formData, countries }),
                        setNewCountry,
                      )
                    }
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.countries.map((country, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-400/20 text-red-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {country}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(
                            index,
                            formData.countries,
                            (countries) =>
                              setFormData({ ...formData, countries }),
                          )
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={addMovieMutation.isPending}
              className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-black font-bold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {addMovieMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Adding Movie...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Add Movie
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
