import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const PageHeader = () => {
  const location = useLocation();
  const dataCtx = useContext(DataContext);
  return (
    <>
      <header>
        {location.pathname === "/trending"
          ? "Trending"
          : location.pathname === "/search"
          ? "Search Results"
          : location.pathname === "/login" || location.pathname === "/register"
          ? ""
          : location.pathname.includes("/list")
          ? dataCtx.listName
          : "Lists"}
      </header>
    </>
  );
};
export default PageHeader;
