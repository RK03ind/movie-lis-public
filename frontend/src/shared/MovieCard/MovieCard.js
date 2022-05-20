/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles/MovieCard.module.css";
import { RiAddFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import genre from "../../genre";
import { useContext, useEffect, useState } from "react";
import AddToListModal from "../AddToListModal/AddToListModal";
import { AuthContext } from "../../context/AuthContext";
import useDeleteItems from "../../hooks/useDeleteItems";
import { useQueryClient } from "react-query";
const MovieCard = (props) => {
  const [modalState, setModalState] = useState(false);
  const queryClient = useQueryClient();
  const deleteItemAPI = useDeleteItems(
    `/api/list/delete/${props.list_id}/${props.id}`,
    true
  );
  const authCtx = useContext(AuthContext);
  const toggleModal = () => {
    if (authCtx.userData) {
      setModalState((prevState) => !prevState);
    } else {
      window.alert("Login to add movie to a list");
    }
  };

  const deleteItem = () => {
    if (window.confirm("Are you sure about that ?") && props.delete) {
      deleteItemAPI.mutate();
    }
  };

  useEffect(() => {
    if (deleteItemAPI.isSuccess || deleteItemAPI.isError) {
      queryClient.invalidateQueries();
    }
  }, [deleteItemAPI.isSuccess, deleteItemAPI.isError]);

  return (
    <>
      {props.poster_path && (
        <div className={styles.movieCard}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${props.poster_path}`}
            alt=""
          />
          <div className={styles.movieCardContent}>
            <div className={styles.movieCardHeader}>
              <span>{props.original_title}</span>
              <span>
                {props.genre_ids.map((id, index) => {
                  if (index === 2 || props.genre_ids.length - 1 === index) {
                    return ` ${genre[id]}`;
                  } else if (index <= 2) {
                    return ` ${genre[id]},`;
                  }
                })}
              </span>
            </div>

            <div className={styles.movieCardDetails}>
              <span>Synopsis</span>
              <span>{props.overview}</span>
            </div>

            <div className={styles.movieCardFooter}>
              <div>{`${props.vote_average}/10`}</div>
              <div>
                {props.delete ? (
                  <MdDelete size={38} onClick={deleteItem} />
                ) : (
                  <RiAddFill size={38} onClick={toggleModal} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {modalState && <AddToListModal {...props} toggler={toggleModal} />}
    </>
  );
};

export default MovieCard;
