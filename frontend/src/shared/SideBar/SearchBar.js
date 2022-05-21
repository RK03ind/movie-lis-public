/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { DataContext } from "../../context/DataContext";
import styles from "./styles/SideBar.module.css";

const SearchBar = () => {
  const [debounceData, setDebounceData] = useState("");
  const [searchData] = useDebounce(debounceData, 200);
  const dataCtx = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const hideAndroidKeyboard = (event) => {
    if (event.key === "Enter") {
      searchInputRef.current.blur();
      navigate("/search");
    }
  };

  useEffect(() => {
    dataCtx.setSearchData(searchData);

    if (
      (!searchData ||
        searchData === "" ||
        !debounceData ||
        debounceData === "") &&
      location.pathname === "/search"
    ) {
      navigate(-1);
    } else if (
      location.pathname !== "/search" &&
      searchData &&
      searchData !== ""
    ) {
      navigate("/search");
    }
  }, [searchData]);

  return (
    <div className={styles.searchBar}>
      <BiSearchAlt size={25} />
      <input
        ref={searchInputRef}
        onKeyUp={hideAndroidKeyboard}
        type="text"
        placeholder="Search Movies..."
        onChange={(e) => setDebounceData(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
