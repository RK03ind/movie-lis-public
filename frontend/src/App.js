import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Search from "./pages/search/Search";
import Trending from "./pages/trending/Trending";
import WatchList from "./pages/watchlist/WatchList";
import SideBar from "./shared/SideBar/SideBar";
import PageHeader from "./shared/PageHeader/PageHeader";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import { AuthContext } from "./context/AuthContext";
import MovieList from "./pages/movielist/MovieList";
import useMediaQuery from "./hooks/useMediaQuery";
import MobileNav from "./shared/MobileNav/MobileNav";
import use100vh from "./hooks/use100vh";
const queryClient = new QueryClient();

function App() {
  // const is2ndLayout = useMediaQuery({ query: "(max-width: 1064px)" });
  const is1024px = useMediaQuery("(max-width: 1024px)");
  const authCtx = useContext(AuthContext);
  const vhHeight = use100vh();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="main-wrapper" style={{ height: vhHeight }}>
          {!is1024px || !window.matchMedia("(max-width: 1024px)") ? (
            <SideBar />
          ) : (
            <MobileNav />
          )}

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
    </QueryClientProvider>
  );
}

export default App;
