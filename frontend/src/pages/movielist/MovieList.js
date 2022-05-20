/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import useGetItems from "../../hooks/useGetItems";
import MovieCard from "../../shared/MovieCard/MovieCard";

const MovieList = () => {
  const { id } = useParams();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const movieListAPI = useGetItems(
    `/api/list/${id}`,
    authCtx.userData ? true : false,
    false,
    id
  );

  useEffect(() => {
    if (movieListAPI.isSuccess) {
      dataCtx.setListName(movieListAPI.data.list_name);
    }
  }, [movieListAPI.isSuccess]);

  return (
    <>
      <HashLoader
        color="#20c997"
        css={{ marginTop: "calc(40vh - 100px)" }}
        loading={movieListAPI.isLoading}
        size={100}
      />
      {!movieListAPI.isLoading && movieListAPI.data.list.length !== 0 && (
        <>
          {movieListAPI.data.list.map((item) => {
            return (
              <MovieCard
                {...item}
                key={item.id}
                delete={movieListAPI.data.same_user}
                list_id={movieListAPI.data._id}
              />
            );
          })}
        </>
      )}
      {!movieListAPI.isLoading && movieListAPI.data.list.length === 0 && (
        <h1 style={{ color: "var(--primary-color)" }}>No movie Found</h1>
      )}
    </>
  );
};
export default MovieList;
