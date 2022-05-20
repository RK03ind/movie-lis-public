/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
import { useQueryClient } from "react-query";
import usePostItems from "../../hooks/usePostItems";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import styles from "./styles/CreateListModal.module.css";

const CreateListModal = ({ toggler }) => {
  const createListModalRef = useRef();
  const queryClient = useQueryClient();
  const listNameRef = useRef();
  const visibilityRef = useRef();
  const createListAPI = usePostItems("/api/list/create", true);
  useOnClickOutside(createListModalRef, toggler);

  const postNewListData = () => {
    const listName = listNameRef.current.value;
    const visibility = visibilityRef.current.value;
    if (listName && visibility && listName !== "" && visibility !== "") {
      createListAPI.mutate({
        list_name: listNameRef.current.value,
        visibility: visibilityRef.current.value,
      });
    } else window.alert("Fill up all the fields");
  };

  useEffect(() => {
    if (createListAPI.isSuccess) {
      toggler();
      queryClient.invalidateQueries("list-data");
      window.alert("Watchlist created!");
    }
  }, [createListAPI.isSuccess]);

  useEffect(() => {
    if (createListAPI.isError) {
      toggler();
      window.alert(" Something went wrong!");
    }
  }, [createListAPI.isError]);

  return (
    <ModalWrapper>
      <div className={styles.createListModal} ref={createListModalRef}>
        <input
          type="text"
          placeholder="Watchlist Name"
          maxLength={35}
          ref={listNameRef}
        />
        <select ref={visibilityRef}>
          <option value="Private" defaultChecked>
            Private
          </option>
          <option value="Public">Public</option>
        </select>
        <button onClick={postNewListData}>Create List</button>
      </div>
    </ModalWrapper>
  );
};
export default CreateListModal;
