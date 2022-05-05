import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { sendSignUpRequest, sendLoginRequest } from "../../state/user";
import { useNavigate } from "react-router";
import Spinner from "../Spinner/Spinner";
import { useEffect, useState } from "react";
import "./Register.css";

const Register = () => {
  const email = useInput();
  const password = useInput();
  const nickname = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  useEffect(() => {
    setRegisterError(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterError(false)

    if (!validateString(nickname.value)) return;
    if (!validateEmail(email.value)) return;

    dispatch(
      sendSignUpRequest({
        email: email.value,
        password: password.value,
        nickName: nickname.value,
      })
    )
      .then((data) => {
        console.log(`data es`, data);
        //data.error is undefined
        if (data.error) {
          setLoading(false);
          console.log('antes de set register error a true');
          setRegisterError(true);
          console.log('fin de setloading false');
        }
        if (data.payload) {
          console.log(`entre`);
          dispatch(
            sendLoginRequest({ email: email.value, password: password.value })
          ).then((res) => {
            setLoading(false);
            navigate("/");
          });
          setLoading(true);
        } else {
          // alert(`User already exists. Please use another email.`);
        }
      })
      .catch((error) => console.log(`ERROR:`, error));
    setLoading(true);
    console.log('fin de useeffect');
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("Please enter a valid email address");
    return false;
  };

  const validateString = (str) => {
    if (/^([a-zA-Z0-9_'.-]){0,20}$/.test(str)) {
      return true;
    }
    alert("[2-20] characters: letters, numbers and _ - ' . are allowed");
    return false;
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
              placeholder="awesome@email.com"
            ></input>
            <label htmlFor="password" className="inputLabel">
              Password
            </label>
            <input
              type="password"
              name="password"
              minLength={3}
              maxLength={15}
              {...password}
              placeholder="8-15 characters"
              className="inputText"
            ></input>
            <label htmlFor="nickname" className="inputLabel">
              Nickname
            </label>
            <input
              type="text"
              name="nickname"
              minLength={2}
              maxLength={20}
              {...nickname}
              className="inputText"
              placeholder="2-20 characters"
            ></input>
            <button type="submit" className="navButton" id="registerButton">
              Sign up
            </button>
          </form>
          {loading && <Spinner size={"3em"} />}
          {registerError && <p style={{ color: "red" }}>Invalid values</p>}
        </div>
      ) : null}
    </>
  );
};

export default Register;
