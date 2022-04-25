import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sendLogoutRequest } from "../state/user";
import "./Navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(sendLogoutRequest())
      .then((res) => res)
      .then(() => navigate("/"));
  };

  return (
    <nav className="navbar">
      <div className="logoDiv">
        <Link to={"/"}>
          <img src={"/tmdbLogo2.png"} style={{ height: "50px" }} />{" "}
        </Link>
        <Link to="/">
          <span className="topTitle">The Mooovie Database</span>
        </Link>
        <div className="mediaNavButtonsDiv">
          <Link to="/media/movie">
            <button className="mediaNavButton">Movies</button>
          </Link>
          <Link to="/media/tv">
            <button className="mediaNavButton">TV Shows</button>
          </Link>
          <Link to="/user/search">
            <button className="mediaNavButton">Users</button>
          </Link>
        </div>
      </div>
      <div className="userButtons">
        {user.id ? (
          <>
            <Link to={`/user/profile/${user.id}`}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <img
                  src="/login.png"
                  style={{ height: "48px", margin: "0 20px" }}
                />
                <div
                  style={{ color: "white", fontSize: "1.3em", height: "100%" }}
                >
                  {user.nickName}
                </div>
              </div>
            </Link>

            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button
                className="navButton"
                style={{ backgroundColor: "inherit", color: "white" }}
              >
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="navButton">SignUp</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
