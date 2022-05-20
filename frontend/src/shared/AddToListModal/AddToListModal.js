/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles/AddToList.module.css";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import useGetItems from "../../hooks/useGetItems";
import WatchListItem from "./WatchListItem";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
import { useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import { useQueryClient } from "react-query";

const AddToListModal = (props) => {
  const listAPI = useGetItems("/api/list/", true, false, "list-data");
  const movie = {
    id: props.id,
    poster_path: props.poster_path,
    original_title: props.original_title,
    genre_ids: props.genre_ids,
    overview: props.overview,
    vote_average: props.vote_average,
  };
  const modalRef = useRef();
  const queryClient = useQueryClient();
  useOnClickOutside(modalRef, props.toggler);

  useEffect(() => {
    queryClient.invalidateQueries();
  }, []);

  return (
    <ModalWrapper>
      <div className={styles.addToListModal} ref={modalRef}>
        <span>Your Watchlists</span>
        <div>
          <HashLoader
            color="#20c997"
            css={{
              marginTop: "calc(50% - 90px)",
              marginLeft: "calc(50% - 40px)",
              padding: "8px",
            }}
            loading={listAPI.isLoading}
            size={80}
          />
          {!listAPI.isLoading &&
            listAPI.data.length !== 0 &&
            listAPI.data.map((item) => {
              return <WatchListItem {...item} movie={movie} />;
            })}
          {!listAPI.isLoading && listAPI.data.length === 0 && (
            <h1 style={{ color: "var(--primary-color)" }}>No List Found</h1>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddToListModal;
