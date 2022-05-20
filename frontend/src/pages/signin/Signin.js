/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect } from "react";
import usePostItems from "../../hooks/usePostItems";

import styles from "./styles/Signin.module.css";
import { AuthContext } from "../../context/AuthContext";
const Signin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginButtonRef = useRef();
  const authCtx = useContext(AuthContext);

  const signInAPI = usePostItems("/api/user/login", false);

  const postLoginData = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!signInAPI.isLoading) {
      if (email && password && email !== "" && password !== "") {
        loginButtonRef.current.innerHTML = "Logging in...";
        signInAPI.mutate({
          email: email,
          password: password,
        });
        passwordRef.current.value = null;
      } else {
        window.alert("Fill up all the fields");
      }
    }
  };

  useEffect(() => {
    if (signInAPI.isSuccess) {
      loginButtonRef.current.innerHTML = "Login";
      window.alert("Login Successfull");
      authCtx.setUserData(signInAPI.data.data);
      localStorage.setItem("user-data", JSON.stringify(signInAPI.data.data));
      navigate("/", { replace: true });
    }
  }, [signInAPI.isSuccess]);

  useEffect(() => {
    if (signInAPI.isError) {
      loginButtonRef.current.innerHTML = "Login";
      window.alert(signInAPI.error.response.data.message);
      signInAPI.reset();
    }
  }, [signInAPI.isError]);

  return (
    <div className={styles.signIn}>
      <span className={styles.header}>Login</span>
      <div>
        <label>Email</label>
        <input type="email" ref={emailRef} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" ref={passwordRef} />
      </div>
      <button ref={loginButtonRef} onClick={postLoginData}>
        Login
      </button>
      <span className={styles.message}>
        Don't have an account yet?{" "}
        <span className={styles.toggle} onClick={() => navigate("/register")}>
          Signup
        </span>
      </span>
    </div>
  );
};
export default Signin;
