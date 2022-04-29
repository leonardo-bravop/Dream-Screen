import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { sendLogoutRequest } from "../../state/user";
import "./Navbar.css";

const NavbarLinks = ({ opened, selected, setScrollDirection }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(sendLogoutRequest())
      .then((res) => res)
      .then(() => navigate("/"));
  };

  return (
    <>
      <div className="mediaNavDiv">
        <Link
          to="/media/movie"
          onClick={() => {
            console.log(`soy movies button`);
            opened.setValue(false);
            selected.setValue("movies")
            setScrollDirection("")
          }}
        >
          {selected.value==="movies"? <button className="selectedMediaNavButton">Movies</button> :  <button className="mediaNavButton">Movies</button>}
        </Link>
        <Link
          to="/media/tv"
          onClick={() => {
            opened.setValue(false);
            selected.setValue("tv-shows")
          }}
        >
          {selected.value==="tv-shows"? <button className="selectedMediaNavButton">TV Shows</button> :  <button className="mediaNavButton">TV Shows</button>}
        </Link>
        <Link
          to="/user/search"
          onClick={() => {
            opened.setValue(false);
            selected.setValue("users")
          }}
        >
          {selected.value==="users"? <button className="selectedMediaNavButton">Users</button> :  <button className="mediaNavButton">Users</button>}
        </Link>
        {user.id? (
           <Link
           to="/user/my-favorites"
           onClick={() => {
             opened.setValue(false);
             selected.setValue("my-favorites")
           }}
         >
          {selected.value==="my-favorites"? <button className="selectedMediaNavButton">My Favorites</button> :  <button className="mediaNavButton">My Favorites</button>}
         </Link>
        ) : null}
      </div>
      <div className="userButtons">
        {user.id ? (
          <>
            <Link
              to={`/user/profile`}
              onClick={() => {
                opened.setValue(false);
                selected.setValue("")
              }}
            >
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
                  style={{
                    color: "white",
                    fontSize: "1.3em",
                    height: "100%",
                  }}
                >
                  {user.nickName.length>8? user.nickName.substring(0,6)+"..." : user.nickName}
                </div>
              </div>
            </Link>

            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              onClick={() => {
                opened.setValue(false);
                selected.setValue("")
              }}
            >
              <button className="navButton" id="LoginButton">
                Login
              </button>
            </Link>
            <Link
              to={"/register"}
              onClick={() => {
                opened.setValue(false);
                selected.setValue("")
              }}
            >
              <button className="navButton">SignUp</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default NavbarLinks;
