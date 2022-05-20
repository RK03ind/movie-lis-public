/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";
import useGetItems from "../../hooks/useGetItems";
import CreateList from "../../shared/CreateList/CreateList";
import ListItem from "../../shared/ListItem/ListItem";

const WatchList = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const listAPI = useGetItems("/api/list/", true, false, "list-data");

  useEffect(() => {
    if (!listAPI.isLoading && listAPI.data.length === 0) {
      setTimeout(() => {
        window.alert(
          "No Watchlist found. Create a new Watchlist to add movies"
        );
      }, 600);
    }
  }, [listAPI.isLoading]);

  return (
    <>
      <HashLoader
        color="#20c997"
        css={{ marginTop: "calc(40vh - 100px)" }}
        loading={listAPI.isLoading}
        size={100}
      />
      {!listAPI.isLoading && (
        <>
          <CreateList />
          {listAPI.data.map((item) => {
            return <ListItem {...item} key={item._id} />;
          })}
        </>
      )}
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};
export default WatchList;
