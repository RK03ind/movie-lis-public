import axios from "axios";
import { useInfiniteQuery } from "react-query";

const useInfiniteItems = (
  url,
  isJWTTokenRequired = false,
  isBearerTokenRequired = false,
  isSearch = false
) => {
  return useInfiniteQuery(
    url,
    async ({ pageParam = 1 }) => {
      if (!isJWTTokenRequired && !isBearerTokenRequired) {
        const { data } = await axios.get(`${url}${pageParam}`);
        return data;
      } else if (isJWTTokenRequired) {
        const { data } = await axios.get(`${url}${pageParam}`, {
          headers: {
            "x-auth-token": "authCtx.userData.token",
          },
        });
        return data;
      } else if (isSearch && isBearerTokenRequired) {
        const { data } = await axios.get(`${url}&page=${pageParam}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2M5YTRhMGIzNmJkMDg5NzA4Mzc1OWViN2IwMTY1NCIsInN1YiI6IjYyN2MyN2MwOTRkOGE4MDA2ODFkZGVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fKaekGxApYTotNzX7N_Bu-m5DOLQqCNUqYWCOotCRzE`,
          },
        });
        return data;
      } else {
        const { data } = await axios.get(`${url}${pageParam}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2M5YTRhMGIzNmJkMDg5NzA4Mzc1OWViN2IwMTY1NCIsInN1YiI6IjYyN2MyN2MwOTRkOGE4MDA2ODFkZGVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fKaekGxApYTotNzX7N_Bu-m5DOLQqCNUqYWCOotCRzE`,
          },
        });
        return data;
      }
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.page + 1;
      },
    }
  );
};

export default useInfiniteItems;
