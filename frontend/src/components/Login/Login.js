import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router";
import { sendLoginRequest } from "../../state/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLoginError(false);
    if (user.id) {
      navigate("/");}
  }, [user.id]);

  const handleLoginSubmit = (e) => {
    setLoginError(false);
    e.preventDefault();
    dispatch(sendLoginRequest({ email: email.value, password: password.value }))
      .then((data) => {
        if (data.error) setLoginError(true);
        if (data.payload) navigate(`/`);
        setLoading(false);
      })
      .catch((error) => console.log(`ERROR:`, error));
    setLoading(true);
  };

  return (
    <div className="flexColumnAligned userForm" style={{ marginTop: "50px" }}>
      <img style={{ width: "100px", marginTop: "20px" }} src="/login.png" />
      <span
        style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "20px" }}
      >
        Welcome back!
      </span>
      <form className="flexColumnAligned" onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className="inputLabel">
          Email
        </label>
        <input
          type="email"
          name="email"
          {...email}
          className="inputText"
        ></input>
        <label htmlFor="name" className="inputLabel">
          Password
        </label>
        <input
          type="password"
          name="password"
          {...password}
          className="inputText"
        ></input>
        <button type="submit" className="navButton" id="loginButton">
          Login
        </button>
      </form>
      {loading && <Spinner size={"3em"} />}
      {loginError && <p style={{ color: "red" }}>Email or password invalid</p>}
    </div>
  );
};

export default Login;
