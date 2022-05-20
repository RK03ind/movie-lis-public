import axios from "axios";
import { useInfiniteQuery } from "react-query";

// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

const useInfiniteItems = (
  url,
  isJWTTokenRequired = false,
  isBearerTokenRequired = false,
  isSearch = false
) => {
  // const authCtx = useContext(AuthContext);
  // const navigate = useNavigate();

  return useInfiniteQuery(
    url,
    async ({ pageParam = 1 }) => {
      if (!isJWTTokenRequired && !isBearerTokenRequired) {
        const { data } = await axios.get(`${url}${pageParam}`);
        return data;
      } else if (isJWTTokenRequired) {
        const { data } = await axios.get(`${url}${pageParam}`, {
          headers: {
            "x-auth-token": authCtx.userData.token,
          },
        });
        return data;
      } else if (isSearch && isBearerTokenRequired) {
        const { data } = await axios.get(`${url}&page=${pageParam}`, {
          headers: {
            Authorization: `Bearer //TMDB Bearer Token`,
          },
        });
        return data;
      } else {
        const { data } = await axios.get(`${url}${pageParam}`, {
          headers: {
            Authorization: `Bearer //TMDB Bearer Token`,
          },
        });
        return data;
      }
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage.page + 1);
        return lastPage.page + 1;
      },
    }
  );
};

export default useInfiniteItems;
