import React, { useEffect, useState } from "react";
import {
  loginFailed,
  loginSuccess,
  loginPending,
} from "../../Redux/slices/loginSlice";
import Alert from "@mui/material/Alert";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { Axios } from "../../Axios";
import { useHistory } from "react-router-dom";
import AlertBar from "../../Alert";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Login() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/");
    }
  }, [history]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.login);
  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch(loginPending());
    try {
      let response = await Axios.post("/api/v1/auth/login", { email, password });
      if (response.data.status === "success") {
        dispatch(loginSuccess(response.data));
        window.localStorage.setItem("user", JSON.stringify(response.data.data));
        window.localStorage.setItem("token", JSON.stringify(response.data.token));
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error) {
      console.log(error.response);
      dispatch(loginFailed(error.response.data.message));
    }
  };

  return (
    <section id="login">
      <HelmetProvider>
        <Helmet>
          <title>Darul Hikma | Login</title>
        </Helmet>
      </HelmetProvider>
      {isAuth && (
        <AlertBar severity="success" message="Logged In successfully" />
      )}
      <div className="login">
        <div className="form">
          {isLoading && <LinearProgress />}
          <form className="login-form">
            <h1 className="">Login </h1>
            {error && <Alert severity="error">{error}</Alert>}
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
            <button to="#" onClick={submitLogin}>
              login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
