import { useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { DataContext } from "./context/DataContext";
import Search from "./pages/search/Search";
import Trending from "./pages/trending/Trending";
import WatchList from "./pages/watchlist/WatchList";

import SideBar from "./shared/SideBar/SideBar";
import PageHeader from "./shared/PageHeader/PageHeader";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import { AuthContext } from "./context/AuthContext";
import MovieList from "./pages/movielist/MovieList";

function App() {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  return (
    //1064
    <>
      <Router>
        <div className="main-wrapper">
          <SideBar />
          <div className="content-wrapper">
            <PageHeader />
            <main id="mainList">
              <Routes>
                {authCtx.userData ? (
                  <>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={<WatchList />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/list/:id" element={<MovieList />} />
                  </>
                ) : (
                  <>
                    <Route path="*" element={<Navigate to="/register" />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Signin />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/list/:id" element={<MovieList />} />
                  </>
                )}
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
