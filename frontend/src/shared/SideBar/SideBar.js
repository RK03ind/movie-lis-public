import styles from "./styles/SideBar.module.css";

import { BiCameraMovie, BiHome } from "react-icons/bi";
import { AiFillFire } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const signOut = () => {
    setTimeout(() => {
      authCtx.setUserData(null);
      localStorage.setItem("user-data", null);
      navigate("/login", { replace: true });
    }, 600);
  };

  return (
    <aside className={styles.sideBar}>
      <header>
        <BiCameraMovie size={40} /> MovieList
      </header>
      <SearchBar />
      <div
        className={`${styles.sidebarItem} ${
          location.pathname === "/" ? styles.active : ""
        }`}
        onClick={() =>
          authCtx.userData ? navigate("/") : navigate("/register")
        }
      >
        <BiHome size={30} />
        Home
      </div>
      <div
        className={`${styles.sidebarItem} ${
          location.pathname === "/trending" ? styles.active : ""
        }`}
        onClick={() => navigate("/trending")}
      >
        <AiFillFire size={30} /> Trending
      </div>
      {authCtx.userData ? (
        <div className={styles.sidebarItem} onClick={signOut}>
          <GoSignOut size={30} /> Signout
        </div>
      ) : (
        <div
          className={`${styles.sidebarItem} ${
            location.pathname === "/login" || location.pathname === "/register"
              ? styles.active
              : ""
          }`}
          onClick={() => navigate("/login")}
        >
          <FaUser size={30} /> Signin/up
        </div>
      )}
    </aside>
  );
};

export default SideBar;
