import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useGetItems = (
  url,
  isJWTTokenRequired = false,
  isBearerTokenRequired = false,
  key = "getItems"
) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return useQuery(
    key,
    async () => {
      if (!isJWTTokenRequired && !isBearerTokenRequired) {
        const { data } = await axios.get(url);
        return data;
      } else if (isJWTTokenRequired) {
        const { data } = await axios.get(url, {
          headers: {
            "x-auth-token": authCtx.userData.token,
          },
        });
        return data;
      } else {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer //TMDB Bearer Token`,
          },
        });
        return data;
      }
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onError: (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          authCtx.setUserData(null);
          localStorage.setItem("user-data", null);
          navigate("/login");
        }
      },
    }
  );
};

export default useGetItems;
