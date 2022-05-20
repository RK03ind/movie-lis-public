/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect } from "react";
import usePostItems from "../../hooks/usePostItems";

import styles from "./styles/Signup.module.css";
import { AuthContext } from "../../context/AuthContext";
const Signup = () => {
  const navigate = useNavigate();
  const uidRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const signUpButtonRef = useRef();
  const authCtx = useContext(AuthContext);

  const signUpAPI = usePostItems("/api/user/signup", false);

  const postSignUpData = () => {
    const uid = uidRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!signUpAPI.isLoading) {
      if (
        email &&
        password &&
        uid &&
        email !== "" &&
        password !== "" &&
        uid !== ""
      ) {
        signUpButtonRef.current.innerHTML = "Signing up...";
        signUpAPI.mutate({
          uid: uid,
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
    if (signUpAPI.isSuccess) {
      signUpButtonRef.current.innerHTML = "Signup";
      window.alert("Signup Successfull");
      authCtx.setUserData(signUpAPI.data.data);
      localStorage.setItem("user-data", JSON.stringify(signUpAPI.data.data));
      navigate("/", { replace: true });
    }
  }, [signUpAPI.isSuccess]);

  useEffect(() => {
    if (signUpAPI.isError) {
      signUpButtonRef.current.innerHTML = "Signup";
      window.alert(signUpAPI.error.response.data.message);
      signUpAPI.reset();
    }
  }, [signUpAPI.isError]);

  return (
    <div className={styles.signIn}>
      <span className={styles.header}>Signup</span>
      <div>
        <label>User ID</label>
        <input type="text" ref={uidRef} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" ref={emailRef} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" ref={passwordRef} />
      </div>
      <button ref={signUpButtonRef} onClick={postSignUpData}>
        Signup
      </button>
      <span className={styles.message}>
        Already have an account?{" "}
        <span className={styles.toggle} onClick={() => navigate("/login")}>
          Login
        </span>
      </span>
    </div>
  );
};
export default Signup;
