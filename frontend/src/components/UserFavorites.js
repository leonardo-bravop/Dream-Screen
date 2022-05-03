import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route, Routes, useMatch, useNavigate } from "react-router";
import FavoritesCard from "../commons/FavoritesCard/FavoritesCard";
import "./UserFavorites.css";
import { useEffect, useState } from "react";

const UserFavorites = () => {
  let favoriteMovies = useSelector((state) =>
    state.user.favoriteMovies.split(" ")
  );
  favoriteMovies.pop();
  //   favoriteMovies = favoriteMovies.slice(0, 6);

  let favoriteTv = useSelector((state) => state.user.favoriteTv.split(" "));
  favoriteTv.pop();
  //   favoriteTv = favoriteTv.slice(0, 6);

  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const statesArray = ["movies", "tv_Shows"];

  const matchState = useMatch("/user/my-favorites/:state");

  const state = matchState?.params.state;

  useEffect(() => {
    setSelected(state);
    console.log(`state es`, state);
    if (state !== "movies" && state !== "tv_Shows") {
      navigate("movies");
    }
  }, [state]);

  return (
    <div>
      <h2 className="fav-title">Your Movies and TV Shows Collection</h2>
      <div className="favorites-tagnav">
        {statesArray.map((state) => {
          return (
            <Link to={state} onClick={() => setSelected(state)}>
              <div className="tagnav-div">
                <button
                  className={`tagnav-button ${
                    selected === state ? "active-tagnav" : null
                  }`}
                >
                  {state[0].toUpperCase() +
                    state
                      .slice(1, state.length)
                      .split("_")
                      .join(" ")
                      .toUpperCase()}
                </button>
                {selected === state && (
                  <img src="/vector.svg" className="tagnav-line" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div
       className="favs-container"
      >
        <Routes>
          <Route
            path="movies"
            element={favoriteMovies.map((movieId) => {
              return <FavoritesCard mediaId={movieId} mediaType={"movie"} />;
            })}
          ></Route>
          <Route
            path="tv_Shows"
            element={favoriteTv.map((movieId) => {
              return <FavoritesCard mediaId={movieId} mediaType={"tv"} />;
            })}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default UserFavorites;
