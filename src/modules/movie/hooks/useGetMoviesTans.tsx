import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { IMovie } from "../types/movie";

export const useGetMoviesTans = (genre?: string) => {
  const { data, isLoading, isError, refetch } = useQuery<IMovie[]>({
    queryKey: ["movies", genre],
    queryFn: async () => {
      return fetch(
        `http://localhost:3001/movie/movies?genre=${genre || ""}`,
      ).then((res) => {
        return res.json();
      });
    },
  });

  // Force refetch when component mounts to ensure fresh data
  useEffect(() => {
    refetch();
  }, [genre]);

  return { movies: data, loading: isLoading, isError };
};
