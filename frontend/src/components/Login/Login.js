import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router";
import { sendLoginRequest } from "../../state/user";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../Spinner";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLoginRequest({ email: email.value, password: password.value }))
      .then((data) => {
        if (data.payload) navigate(`/`);
        setLoading(false);
      })
      .catch((err) => alert(`Invalid email or password \nPlease try again.`));
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
      {user.error && <p style={{ color: "red" }}>Invalid Credentials</p>}
    </div>
  );
};

export default Login;
