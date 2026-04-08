import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getMovieDetails } from "../apis/movieApi";
import type { Credits } from "../types/credit";
import type { Detail } from "../types/detail";
import { useCustomFetch } from "./useCustomFetch";

export const useMovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Detail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const {
    data,
    isLoading,
    error,
  } = useCustomFetch(
    async () => {
      if (!movieId) {
        //에러는 이 훅이 알아서 처리
        throw new Error("영화 ID가 없습니다.");
      }
      const [detailData, creditsData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
      ]);
      return { detailData, creditsData };
    },
    [movieId],
  );

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      setCredits(null);
      return;
    }
    if (!data) return;
    setMovie(data.detailData);
    setCredits(data.creditsData);
  }, [movieId, data]);

  return { movie, credits, isLoading, error };
};
