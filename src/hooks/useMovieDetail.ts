import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getMovieDetails } from "../apis/movieApi";
import type { Credits } from "../types/credit";
import type { Detail } from "../types/detail";

export const useMovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Detail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      setCredits(null);
      setError("영화 ID가 없습니다.");
      setIsLoading(false);
      return;
    }

    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [detailData, creditsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
        ]);
        setMovie(detailData);
        setCredits(creditsData);
        setError(null);
      } catch (e) {
        setMovie(null);
        setCredits(null);
        setError(
          e instanceof Error
            ? e.message
            : "알 수 없는 오류가 발생했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMovieData();
  }, [movieId]);

  return { movie, credits, isLoading, error };
};
