import { useState } from "react";
import { AllMovies } from "./AllMovies";
import { DramaMovies } from "./DramaMovies";
import { AddMovie } from "./AddMovie";
import { Film, Plus, Filter } from "lucide-react";

export const MovieContent = ({
  dataType,
  onBack,
}: {
  dataType: string;
  onBack: () => void;
}) => {
  if (dataType === "addMovie") {
    return <AddMovie onBack={onBack} />;
  }
  if (dataType === "all") {
    return <AllMovies />;
  }
  if (dataType === "drama") {
    return <DramaMovies />;
  }
  return <AllMovies />;
};

export const MovieMain = () => {
  const [dataType, setDataType] = useState<string>("all");

  const changeDataType = (type: string) => {
    setDataType(type);
  };

  const navItems = [
    { id: "all", label: "All Movies", icon: Film },
    { id: "drama", label: "Drama", icon: Filter },
  ];

  if (dataType === "addMovie") {
    return (
      <MovieContent dataType={dataType} onBack={() => setDataType("all")} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Movie Collection
              </h1>
              <p className="text-slate-400">
                Discover and explore your favorite films
              </p>
            </div>
            <button
              onClick={() => changeDataType("addMovie")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Movie
            </button>
          </div>
        </header>

        <nav className="mb-8">
          <div className="flex flex-wrap gap-2 bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => changeDataType(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    dataType === item.id
                      ? "bg-yellow-400 text-black shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <main>
          <MovieContent dataType={dataType} onBack={() => setDataType("all")} />
        </main>
      </div>
    </div>
  );
};
