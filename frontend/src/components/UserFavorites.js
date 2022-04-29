import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route, Routes, useMatch, useNavigate } from "react-router";
import FavoritesCard from "../commons/FavoritesCard";
import "./Movies/Movies.css";
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
      <h2 style={{textAlign: "center"}}>Favorites</h2>
      <div className="movies-tagnav">
        {statesArray.map((state) => {
          return (
            <Link to={state} onClick={() => setSelected(state)}>
              <div className="tagnav-div">
                <button className="tagnav-button">
                  {state[0].toUpperCase() +
                    state.slice(1, state.length).split("_").join(" ")}
                </button>
                {selected === state && (
                  <img src="/line.svg" className="tagnav-line" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 15%",
        }}
      >
        <Routes>
          <Route
            path="movies"
            element={favoriteMovies.map((movieId) => {
              return <FavoritesCard movieId={movieId} mediaType={"movie"} />;
            })}
          ></Route>
          <Route
            path="tv_Shows"
            element={favoriteTv.map((movieId) => {
              return <FavoritesCard movieId={movieId} mediaType={"tv"} />;
            })}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default UserFavorites;
