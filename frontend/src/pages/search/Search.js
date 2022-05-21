/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useInfiniteItems from "../../hooks/useInfiniteItems";
import MovieCard from "../../shared/MovieCard/MovieCard";
import { DataContext } from "../../context/DataContext";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dataCtx = useContext(DataContext);
  const navigate = useNavigate();
  const searchData = useInfiniteItems(
    `https://api.themoviedb.org/3/search/movie?query=${dataCtx.searchData}`,
    false,
    true,
    true
  );

  const [ref, isInView] = useInView();

  useEffect(() => {
    if (isInView) {
      searchData.fetchNextPage();
    }
  }, [isInView]);

  useEffect(() => {
    if (searchData.isError) {
      navigate("/");
    }
  }, [searchData.isError]);

  return (
    <>
      <HashLoader
        color="#20c997"
        css={{ marginTop: "calc(40vh - 120px)" }}
        loading={searchData.isLoading}
        size={100}
      />

      {!searchData.isLoading &&
        searchData.data.pages[0].results.length === 0 && (
          <h1 style={{ color: "var(--primary-color)" }}>
            No Results were found
          </h1>
        )}

      {!searchData.isLoading &&
        searchData.data.pages.map((group, i) => {
          return group.results.map((item) => {
            return <MovieCard {...item} delete={false} key={item.id} />;
          });
        })}
      <div ref={ref}></div>
    </>
  );
};
export default Search;
