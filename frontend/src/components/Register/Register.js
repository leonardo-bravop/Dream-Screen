import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { sendSignUpRequest, sendLoginRequest } from "../../state/user";
import { useNavigate } from "react-router";
import Spinner from "../Spinner";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const email = useInput();
  const password = useInput();
  const nickname = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendSignUpRequest({
        email: email.value,
        password: password.value,
        nickName: nickname.value,
      })
    )
      .then((data) => {
        if (data.payload) {
          dispatch(
            sendLoginRequest({ email: email.value, password: password.value })
          ).then(() => {
            setLoading(false);
            navigate("/");
          });
          setLoading(true);
        } else {
          alert(`User already exists. Please use another email.`);
        }
      })
      .catch((error) => console.log(`ERROR ES:`, error));
    setLoading(true);
  };

  return (
    <>
      {!user.id ? (
        <div
          className="flexColumnAligned userForm"
          style={{ marginTop: "50px" }}
        >
          <img
            style={{ width: "100px", marginTop: "20px" }}
            src="/register.png"
          />
          <span
            style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "20px" }}
          >
            Create your account
          </span>
          <form className="flexColumnAligned" onSubmit={handleSubmit}>
            <label htmlFor="email" className="inputLabel">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...email}
              className="inputText"
            ></input>
            <label htmlFor="password" className="inputLabel">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...password}
              className="inputText"
            ></input>
            <label htmlFor="nickname" className="inputLabel">
              Nickname
            </label>
            <input
              type="text"
              name="nickname"
              {...nickname}
              className="inputText"
            ></input>
            <button type="submit" className="navButton" id="registerButton">
              Sign up
            </button>
          </form>
          {loading && <Spinner />}
          {user.error && <p style={{ color: "red" }}>Invalid values</p>}
        </div>
      ) : null}
    </>
  );
};

export default Register;
