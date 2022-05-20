import styles from "./styles/ModalWrapper.module.css";
const ModalWrapper = ({ children }) => {
  return <div className={styles.modalWrapper}>{children}</div>;
};
export default ModalWrapper;
