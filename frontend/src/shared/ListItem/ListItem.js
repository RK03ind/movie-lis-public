/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useDeleteItems from "../../hooks/useDeleteItems";
import styles from "./styles/ListItem.module.css";

const ListItem = ({ _id, list_name, visibility, movie_count }) => {
  const [showDel, setDelVisibility] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteListAPI = useDeleteItems(`/api/list/delete/${_id}`, true);

  const clickHandler = (e) => {
    if (e.target.nodeName === "DIV" || e.target.nodeName === "SPAN")
      return goToMoviesList();
    deleteList();
  };

  const goToMoviesList = () => {
    navigate(`/list/${_id}`);
  };

  const deleteList = () => {
    if (window.confirm("Are you sure about that ?")) {
      deleteListAPI.mutate();
    }
  };
  useEffect(() => {
    if (deleteListAPI.isSuccess || deleteListAPI.isError) {
      queryClient.invalidateQueries();
    }
  }, [deleteListAPI.isSuccess, deleteListAPI.isError]);

  return (
    <div
      className={styles.listItem}
      onMouseEnter={() => setDelVisibility(true)}
      onMouseLeave={() => setDelVisibility(false)}
      onClick={clickHandler}
    >
      <span>{list_name}</span>
      <span>{`${movie_count} movies`}</span>
      <span>{visibility}</span>
      {showDel && (
        <div>
          <MdDeleteForever size={30} />
        </div>
      )}
    </div>
  );
};
export default ListItem;
