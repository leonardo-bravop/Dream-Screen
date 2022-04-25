import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";
import { sendLoginRequest } from "../state/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLoginRequest({ email: email.value, password: password.value }))
      .then((data) => {
        console.log(data)
        navigate(`/`);
      })
      .catch((err) => alert(`Invalid email or password \nPlease try again.`));
  };

  return (
    <div className="flexColumnAligned" style={{ marginTop: "50px" }}>
      <img style={{ width: "100px" }} src="/login.png" />
      <span
        style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "20px" }}
      >
        Welcome back!
      </span>
      <form className="flexColumnAligned" onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" {...email}></input>
        <label htmlFor="name">Password</label>
        <input type="password" name="password" {...password}></input>
        <button type="submit" className="navButton" id="loginButton">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;