import styles from "./styles/MobileNav.module.css";
import { BiCameraMovie } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "../SideBar/SearchBar";
import SideBar from "../SideBar/SideBar";
import { useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
const MobileNav = () => {
  const [isSidebarOpen, setSidebarState] = useState(false);
  const sidebarRef = useRef();
  const toggleSidebar = () => setSidebarState((prevState) => !prevState);
  useOnClickOutside(sidebarRef, toggleSidebar);
  return (
    <>
      <nav className={styles.mobileNav}>
        <BiCameraMovie size={42} />
        <SearchBar />
        <GiHamburgerMenu size={32} onClick={toggleSidebar} />
      </nav>
      {isSidebarOpen && (
        <ModalWrapper>
          <div ref={sidebarRef}>
            <SideBar toggler={toggleSidebar} />
          </div>
        </ModalWrapper>
      )}
    </>
  );
};
export default MobileNav;
