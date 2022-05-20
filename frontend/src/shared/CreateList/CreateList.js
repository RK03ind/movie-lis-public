import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import CreateListModal from "../CreateListModal/CreateListModal";
import styles from "./styles/CreateList.module.css";

const CreateList = () => {
  const [showModal, setModal] = useState(false);
  const toggleModal = () => setModal((prevState) => !prevState);

  return (
    <>
      <div className={styles.addList} onClick={toggleModal}>
        <BsPlusLg size={30} />
      </div>
      {showModal && <CreateListModal toggler={toggleModal} />}
    </>
  );
};

export default CreateList;
