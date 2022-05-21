/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useInfiniteItems from "../../hooks/useInfiniteItems";
import MovieCard from "../../shared/MovieCard/MovieCard";
import { HashLoader } from "react-spinners";

const Trending = () => {
  const trendingMovies = useInfiniteItems(
    `https://api.themoviedb.org/3/trending/movie/day?page=`,
    false,
    true
  );

  const [ref, isInView] = useInView();

  useEffect(() => {
    if (isInView) {
      trendingMovies.fetchNextPage();
    }
  }, [isInView]);

  return (
    <>
      <HashLoader
        color="#20c997"
        css={{ marginTop: "calc(40vh - 120px)" }}
        loading={trendingMovies.isLoading}
        size={100}
      />
      {!trendingMovies.isLoading &&
        trendingMovies.data.pages.map((group, i) => {
          return group.results.map((item) => {
            return <MovieCard {...item} delete={false} key={item.id} />;
          });
        })}
      <div ref={ref}></div>
    </>
  );
};
export default Trending;
